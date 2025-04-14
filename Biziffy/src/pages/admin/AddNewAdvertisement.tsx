import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export interface AdvertisementData {
  title: string;
  type: string;
  businessCategory: string;
  subCategory: string;
  childCategory: string;
  redirectUrl: string;
  status: "Active" | "Inactive";
  image: File | null;
}

const AddNewAdvertisement: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AdvertisementData>({
    title: "",
    type: "",
    businessCategory: "",
    subCategory: "",
    childCategory: "",
    redirectUrl: "",
    status: "Inactive",
    image: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({ ...prevData, image: e.target.files![0] }));
    }
  };

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("type", formData.type);
    formPayload.append("businessCategory", formData.businessCategory);
    formPayload.append("subCategory", formData.subCategory);
    formPayload.append("childCategory", formData.childCategory);
    formPayload.append("redirectUrl", formData.redirectUrl);
    formPayload.append("status", formData.status);
    if (formData.image) {
      formPayload.append("image", formData.image);
    }


    await axios.post(
      "http://localhost:5000/api/admin/listings/create", // ✅ FIXED route
      formPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    navigate("/admin/advertisements");
  } catch (error) {
    console.error("Error uploading advertisement:", error);
    alert("Error uploading advertisement");
  }
};

  return (
    <AdminLayout title="Add New Advertisement">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Add New Advertisement</h1>
        <Link to="/admin/advertisements">
          <Button className="bg-blue-500 hover:bg-blue-600">
            All Advertisements
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-md border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter advertisement title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                name="type"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Type</option>
                <option value="Listing detail center">Listing detail center</option>
                <option value="Listing detail Right">Listing detail Right</option>
                <option value="Listing Bottom">Listing Bottom</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessCategory">Business Category *</Label>
              <select
                id="businessCategory"
                name="businessCategory"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.businessCategory}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Advertising & Marketing">Advertising & Marketing</option>
                <option value="Gifting">Gifting</option>
                <option value="Daily Home Needs">Daily Home Needs</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subCategory">Sub Category</Label>
              <select
                id="subCategory"
                name="subCategory"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.subCategory}
                onChange={handleInputChange}
              >
                <option value="">Select Sub Category</option>
                <option value="Advertising & PR Agencies">Advertising & PR Agencies</option>
              </select>
            </div>


            <div className="space-y-2">
              <Label htmlFor="redirectUrl">Redirect URL</Label>
              <Input
                id="redirectUrl"
                name="redirectUrl"
                placeholder="https://example.com"
                value={formData.redirectUrl}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Advertisement Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <input
                    type="file"
                    id="imageUpload"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-gray-200 hover:bg-gray-300"
                    onClick={() =>
                      document.getElementById("imageUpload")?.click()
                    }
                  >
                    Upload Image
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6">
            Submit Advertisement
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddNewAdvertisement;
