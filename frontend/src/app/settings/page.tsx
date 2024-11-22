"use client"
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/EditUserData";
import { BrandDataEdit } from "@/components/EditBrand";
import { EditProduct } from "@/components/EditProduct";
import { EditBill } from "@/components/EditBill";
import NavBar from "@/components/navBar";

export const Settings: React.FC = () => {
  return (
    <div className="flex w-full h-full">
      <div>
        <NavBar />
      </div>
      <div className="p-4">
      <Tabs defaultValue="1">
        <TabsList>
          <TabsTrigger value="1">Edit Users</TabsTrigger>
          <TabsTrigger value="2">Edit Brands</TabsTrigger>
          <TabsTrigger value="3">Edit Products</TabsTrigger>
          <TabsTrigger value="4">Bill Changes</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <h1 className="text-2xl font-bold p-4">Profile Changes</h1>
          <DataTable />
        </TabsContent>
        <TabsContent value="2">
          <h1 className="text-2xl font-bold p-4">Brand Detail Changes</h1>
          <BrandDataEdit />
        </TabsContent>
        <TabsContent value="3">
          <h1 className="text-2xl font-bold p-4">Product Changes</h1>
          <EditProduct />
        </TabsContent>
        <TabsContent value="4">
          <h1 className="text-2xl font-bold p-4">Bill Changes</h1>
          <EditBill />
        </TabsContent>
      </Tabs>
    </div>
    </div>
  );
};

export default Settings;
