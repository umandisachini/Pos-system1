"use client";
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { fetchFromApi } from "@/utils/brandApi";
import { useState, useEffect } from "react";
  
  const fetchBrandData = async () => {
    try {
      const data = await fetchFromApi('brands');
      //console.log('Fetched data:', data);
      return data.map((brand: any) => ({
        brandId: brand.brandId,
        brandName: brand.brandName,
        contact: brand.brandContact,
        email: brand.brandAgentEmail,
      }));
    } catch (error) {
      console.error("Error fetching users data:", error);
      return [];
    }
  }
  
  export function BrandtList() {
    const [brandData, setBrandData] = useState([]);

    useEffect(() => {
      const getData = async () => {
        const data = await fetchBrandData();
        setBrandData(data);
      };

      getData();
    }, []);

    return (
      <Table>
        <TableCaption>A list of excisting Brands</TableCaption>
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="w-[250px] text-white">Brand Name</TableHead>
            <TableHead className="text-white w-[250px]">Email</TableHead>
            <TableHead className="text-white w-[250px]">Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {brandData.map((brand, index) => (
          <TableRow key={index}>
            <TableCell>{brand.brandName}</TableCell>
            <TableCell>{brand.email}</TableCell>
            <TableCell>{brand.contact}</TableCell>
          </TableRow>
        ))}
      </TableBody>
        
      </Table>
    )
  }
  