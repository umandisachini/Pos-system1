"use client"
import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table"; // Adjust imports as needed

// Define the type for brand data
interface Brand {
  brandName: string;
  email: string;
  contact: string;
}

const BrandDetail: React.FC = () => {
  const [brandData, setBrandData] = useState<Brand[]>([]);

  // Simulate fetching brand data
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        // Replace with actual API call or data fetching logic
        const response = await fetch("/api/brands");
        const data = await response.json();
        setBrandData(data);
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };

    fetchBrandData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Brand Name</th>
          <th>Email</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        {brandData.map((brand, index) => (
          <TableRow key={index}>
            <TableCell>{brand.brandName}</TableCell>
            <TableCell>{brand.email}</TableCell>
            <TableCell>{brand.contact}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
  );
};

export default BrandDetail;
