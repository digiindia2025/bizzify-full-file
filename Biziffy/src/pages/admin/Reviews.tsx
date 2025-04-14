import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";

type Review = {
  _id: string;
  userName: string;
  title?: string;
  email: string;
  rating: number;
  content: string;
  date: string;
};

const Reviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data);
      } catch (err) {
        toast({
          title: "Error fetching reviews",
          description: "Please check backend connection.",
        });
      }
    };
    fetchReviews();
  }, [toast]);

  const handleApprove = (id: string) => {
    if (!approvedIds.includes(id)) {
      setApprovedIds([...approvedIds, id]);
      toast({
        title: "Review Approved",
        description: `Review with ID: ${id} has been approved successfully.`,
      });
    }
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (confirmDelete) {
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast({
        title: "Review Deleted",
        description: `Review with ID: ${id} has been deleted.`,
      });
    }
  };

  const handleApproveAll = () => {
    const allIds = filteredReviews.map((r) => r._id);
    setApprovedIds([...new Set([...approvedIds, ...allIds])]);
    toast({
      title: "All Reviews Approved",
      description: "All reviews have been approved successfully.",
    });
  };

  const handleExportCSV = () => {
    const headers = ["User Name", "Title", "Email", "Rating", "Content", "Date"];
    const rows = filteredReviews.map((r) => [
      r.userName,
      r.title || "-",
      r.email,
      r.rating,
      r.content,
      r.date,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "reviews.csv";
    a.click();
  };

  const filteredReviews = reviews.filter((r) =>
    Object.values(r).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (page: number) => setCurrentPage(page);

  const renderPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <AdminLayout title="All Reviews">
      <div className="mb-6 flex justify-between items-center">
        <Input
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64"
        />
        <div className="flex gap-2">
          <Button onClick={handleExportCSV} className="bg-green-500 hover:bg-green-600">
            Export to CSV
          </Button>
          <Button onClick={handleApproveAll} className="bg-blue-600 hover:bg-blue-700">
            Approve All Reviews
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["SR. NO.", "USER NAME", "TITLE", "EMAIL", "RATING", "CONTENT", "DATE", "ACTIONS"].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentReviews.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No reviews found.
                </td>
              </tr>
            ) : (
              currentReviews.map((review, index) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-6 py-4 text-sm">{review.userName}</td>
                  <td className="px-6 py-4 text-sm">{review.title || "-"}</td>
                  <td className="px-6 py-4 text-sm">{review.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      <span className={`font-medium ${
                        review.rating >= 4 ? "text-green-600" :
                        review.rating >= 3 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {review.rating.toFixed(1)}
                      </span>
                      <div className="ml-2 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{review.content}</td>
                  <td className="px-6 py-4 text-sm">{review.date}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    {approvedIds.includes(review._id) ? (
                      <Button disabled className="bg-green-600 text-white cursor-not-allowed">
                        Approved
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleApprove(review._id)}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Approve
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="py-4 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {renderPageNumbers().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </AdminLayout>
  );
};

export default Reviews;
