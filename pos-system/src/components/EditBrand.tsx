"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { DeleteButton } from "./deletebutton";
import { Editbutton } from "./EditButton";
import { fetchFromApi } from "@/utils/brandApi";
import { BrandDeleteButton } from "./brandDelete";
import { BrandEditButton } from "./brandeditbutton";

const fetchBrandData = async () => {
  try {
    const data = await fetchFromApi('brands');
    //console.log('Fetched data:', data);

    const transformedData = data.map((brand: any) => ({
      brandId: brand._id,
      brandName: brand.brandName,
      contact: brand.brandContact,
      email: brand.brandAgentEmail,
    }));
    //console.log("Transformed date : ", transformedData);
    return transformedData;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
}

export function BrandDataEdit() {
  const [brandData, setBrandData] = useState([]);
  const refreshData = async () => {
    const data = await fetchBrandData();
    setBrandData(data);
  };
  useEffect(() => {
    const getData = async () => {
      const data = await fetchBrandData();
      setBrandData(data);
    };

    getData();
    refreshData();
  }, []);

  return (
    <Table className="pt-4  max-w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Brand Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brandData.map((brand, index) => (
          <TableRow key={index}>
            <TableCell>{brand.brandName}</TableCell>
            <TableCell>{brand.contact}</TableCell>
            <TableCell>{brand.email}</TableCell>
            <TableCell className="text-right">
              <BrandDeleteButton brandId={brand.brandId} onDelete={refreshData}/>
              <BrandEditButton brandId={brand.brandId}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
