import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Fruits" },
];

interface FormValues {
  name: string;
  image: FileList | null;
  banner: FileList | null;
  category: string;
  status: string;
}

const AddNewSubcategory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      image: null,
      banner: null,
      category: "",
      status: "active",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      form.setValue("image", e.target.files as FileList);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
      form.setValue("banner", e.target.files as FileList);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("status", data.status);
    if (data.image && data.image[0]) formData.append("image", data.image[0]);
    if (data.banner && data.banner[0]) formData.append("banner", data.banner[0]);

    try {
      await axios.post("http://localhost:5000/api/admin/subcategory/create", formData);

      toast({
        title: "Subcategory Created",
        description: `Subcategory "${data.name}" has been created successfully.`,
      });

      form.reset();
      setImagePreview(null);
      setBannerPreview(null);
      navigate("/admin/subcategories");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to create subcategory.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Add New Subcategory">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormItem>
              <FormLabel>Subcategory Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
              </FormControl>
              {imagePreview && (
                <img src={imagePreview} alt="Image Preview" className="mt-2 h-24 rounded-md" />
              )}
            </FormItem>

            {/* Banner Upload */}
            <FormItem>
              <FormLabel>Subcategory Banner</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handleBannerChange} />
              </FormControl>
              {bannerPreview && (
                <img src={bannerPreview} alt="Banner Preview" className="mt-2 h-24 rounded-md" />
              )}
            </FormItem>

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create Subcategory</Button>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddNewSubcategory;
