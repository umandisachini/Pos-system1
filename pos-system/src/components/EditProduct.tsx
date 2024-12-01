"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DeleteButton } from "./deletebutton";
import { fetchFromApi } from "@/utils/productapi";
import { useState, useEffect } from "react";
import { Editbutton } from "./EditButton";
import { ProductDeleteButton } from "./productdelete";
import { ProductEditbutton } from "./producteditbutton";

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
    const transformedData =  data.map((product: any) => ({
      productId: product._id,
      productName: product.productName,
      category: product.category,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
    }));

    console.log("Trasformed Data : ", transformedData)
    return transformedData;

  } catch (error) {
    console.error("Error fetching products data:", error);
    return [];
  }
}

export function  EditProduct() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const getData = async () => {
        const data = await fetchProductdata();
        //console.log('Fetched data:', data);
        setProducts(data);
      }
      getData();
    }, []); // Empty dependency array to run only on mount

    return (
        <Table className="pt-4">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Stocks</TableHead>
                    <TableHead className="text-right">Actions</TableHead> {/* Added header for actions */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>${(product.price).toFixed(2)}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell className="text-right">
                            <ProductDeleteButton productId = {product.productId}/>
                            <ProductEditbutton productId={product.productId}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
