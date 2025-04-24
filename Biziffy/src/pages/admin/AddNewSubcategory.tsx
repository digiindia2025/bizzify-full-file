import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormValues {
  name: string;
  image: FileList | null;
  banner: FileList | null;
  status: string;
}

const AddNewSubcategory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [mainSubCategories, setMainSubCategories] = useState([
    { name: "", banner: null as File | null },
  ]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      image: null,
      banner: null,
      status: "active",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "image") {
          setImagePreview(reader.result as string);
          form.setValue("image", e.target.files as FileList);
        } else {
          setBannerPreview(reader.result as string);
          form.setValue("banner", e.target.files as FileList);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMainSubChange = (
    index: number,
    field: "name" | "banner",
    value: string | File | null
  ) => {
    const updated = [...mainSubCategories];
    updated[index][field] = value;
    setMainSubCategories(updated);
  };

  const addMainSubCategory = () => {
    setMainSubCategories([...mainSubCategories, { name: "", banner: null }]);
  };

  const removeMainSubCategory = (index: number) => {
    const updated = [...mainSubCategories];
    updated.splice(index, 1);
    setMainSubCategories(updated);
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedCategory) {
      toast({ title: "Please select a category." });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("status", data.status);
    formData.append("category", selectedCategory);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    if (data.banner && data.banner[0]) {
      formData.append("banner", data.banner[0]);
    }

    mainSubCategories.forEach((sub, index) => {
      formData.append(`mainSubCategories[${index}][name]`, sub.name);
      if (sub.banner) {
        formData.append(`mainSubCategories[${index}][banner]`, sub.banner);
      }
    });

    try {
      await axios.post("http://localhost:5000/api/admin/subcategories", formData);
      toast({ title: "Subcategory created successfully." });
      navigate("/admin/subcategories");
    } catch (error) {
      console.error("Error creating subcategory:", error.response?.data || error.message);
      toast({
        title: "Failed to create subcategory.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Add New Subcategory">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Category Dropdown */}
            <FormItem>
              <FormLabel>Select Category</FormLabel>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select a category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <FormDescription>Choose the category for this subcategory.</FormDescription>
            </FormItem>

            {/* Subcategory Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter subcategory name" {...field} />
                  </FormControl>
                  <FormDescription>This name will be displayed to users.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subcategory Image */}
            <FormItem>
              <FormLabel>Subcategory Image</FormLabel>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "image")}
                  className="max-w-xs"
                />
                {imagePreview && (
                  <div className="h-16 w-16 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <FormDescription>Image for subcategory thumbnail.</FormDescription>
            </FormItem>

            {/* Subcategory Banner */}
            <FormItem>
              <FormLabel>Subcategory Banner</FormLabel>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "banner")}
                  className="max-w-xs"
                />
                {bannerPreview && (
                  <div className="h-16 w-16 relative">
                    <img
                      src={bannerPreview}
                      alt="Banner Preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <FormDescription>Banner image for subcategory page/header.</FormDescription>
            </FormItem>

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select {...field} className="border p-2 rounded-md w-full">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </FormControl>
                  <FormDescription>Set subcategory status.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Main Subcategories */}
            <div className="space-y-4">
              <FormLabel>Main Subcategories</FormLabel>
              {mainSubCategories.map((sub, index) => (
                <div key={index} className="border p-4 rounded-md space-y-2">
                  <Input
                    placeholder="Main Subcategory Name"
                    value={sub.name}
                    onChange={(e) =>
                      handleMainSubChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleMainSubChange(
                        index,
                        "banner",
                        e.target.files?.[0] ?? null
                      )
                    }
                  />
                  {mainSubCategories.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMainSubCategory(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addMainSubCategory}>
                + Add Main Subcategory
              </Button>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" asChild>
                <Link to="/admin/subcategories">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Create Subcategory
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddNewSubcategory;
