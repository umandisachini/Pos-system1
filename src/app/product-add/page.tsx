"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/navBar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProduct } from "@/utils/productapi";
import { fetchBrands } from "@/utils/brandApi";

// Define the Brand interface
interface Brand {
  brandName: string;
}

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product Name must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be selected.",
  }),
  stock: z.string().min(1, {
    message: "Stocks must be a positive number.",
  }),
  price: z.string().min(1, {
    message: "Price must be a positive number.",
  }),
}).refine((data) => parseFloat(data.price) > 0, {
  message: "Price must be a positive value",
  path: ["price"],
}).refine((data) => parseInt(data.stock, 10) > 0, {
  message: "Stocks must be a positive value",
  path: ["stock"],
});

const ProductAddForm: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      brand: "",
      stock: "",
      price: "",
    },
  });

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const fetchedBrands: Brand[] = await fetchBrands();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrandData();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await createProduct(values);
      form.reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="flex items-start justify-start gap-2 rounded-[8px]">
      <div>
        <NavBar />
      </div>
      <div className="min-h-screen flex-col items-center justify-between p-24">
        <Form {...form}>
          <h3 className="text-2xl font-bold pb-4">Add New Item</h3>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl className="pr-4">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.brandName} value={brand.brandName}>
                            {brand.brandName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="Stock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Button without onClick handler, relying on form submission */}
            <Button type="submit">Save New Product</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductAddForm;
