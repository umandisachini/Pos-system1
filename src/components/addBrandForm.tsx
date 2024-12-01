"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrand } from "@/utils/brandApi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  brandName: z.string().min(2, {
    message: "Brand Name must be at least 2 characters.",
  }),
  brandAgentEmail: z.string().email({
    message: "Invalid Email",
  }),
  brandContact: z
    .string()
    .min(10, {
      message: "Contact number must be at least 10 digits.",
    })
    .max(15, {
      message: "Contact number must not exceed 15 digits.",
    }),
});

export function BrandAddForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      brandAgentEmail: "",
      brandContact: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { brandName, brandAgentEmail, brandContact } = values;

    const brandData = {
      brandName: brandName,
      brandAgentEmail: brandAgentEmail,
      brandContact: brandContact,
    };

    try {
      const response = await createBrand("createbrands", brandData);
      if (response.ok) {
        const result = await response.json();

      } else {
        throw new Error("Failed to add brand details");
      }
    } catch (error) {
      console.error("Error adding brand:", error);
      // Optionally, show an error message to the user
    }

    form.reset();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Brand</CardTitle>
        <CardDescription>Add New Brand Details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="brandname">Brand Name</Label>
              <Input
                id="brandname"
                placeholder="Brand Name"
                {...form.register("brandName")}
              />
              <p className="text-red-500">{form.formState.errors.brandName?.message}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                {...form.register("brandAgentEmail")}
              />
              <p className="text-red-500">{form.formState.errors.brandAgentEmail?.message}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                placeholder="Contact"
                {...form.register("brandContact")}
              />
              <p className="text-red-500">{form.formState.errors.brandContact?.message}</p>
            </div>
          </div>
          <CardFooter className="flex justify-between text-right pt-4">
            <Button type="submit">Add Details</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
