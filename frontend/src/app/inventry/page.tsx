"use client"
import React from "react";
import NavBar from "@/components/navBar"
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
import { fetchFromApi } from "@/utils/productapi";
import { useState, useEffect } from "react";

  interface Product {
    productId: string;
    productName: string;
    category: string;
    price: number;
    stock: number;
    brand: string;
}

const fetchProductdata = async (): Promise<Product[]> => {
  try {
    const data = await fetchFromApi('products');
   // console.log(data)
    return data.map((product: any) => ({
      productId: product.productId,
      productName: product.productName,
      category: product.category,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
    }));
  } catch (error) {
    console.error("Error fetching products data:", error);
    return [];
  }
}

const Inventry: React.FC = () =>{
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const getData = async () => {
        const data = await fetchProductdata();
        console.log('Fetched data:', data);
        setProducts(data);
      }
      getData();
    }, []);
    return (
      <div className="flex">
        <div>
          <NavBar />
        </div>
        <div className="p-20 min-w-screen min-h-screen">
          <h1  className="font-bold text-3xl p-4">Inventry</h1>
        <Table className="p-4 min-w-full">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="bg-black ">
          <TableRow>
              <TableHead className="w-[200px]">Product Name</TableHead>
              <TableHead className="w-[200px]">Price</TableHead>
              <TableHead className="w-[200px]">Brand</TableHead>
              <TableHead className="w-[200px]">Stocks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
                {products.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                    </TableRow>
                ))}
          </TableBody>
      </Table>
        </div>
      </div>
    )
  }


export default Inventry;
