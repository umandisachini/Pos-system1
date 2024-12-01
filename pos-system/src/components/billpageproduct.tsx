"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchFromApi } from "@/utils/productapi";

const fetchProductData = async () => {
    try {
        const data = await fetchFromApi('products');
        return data.map((product: any) => ({
            productName: product.productName,
            productcount: product.stock,
            productprice: product.price,
            productbrand: product.brand,
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default function BillPageProduct({ handleAdd }: { handleAdd: (product: { productname: string, price: number }) => void }) {
    const [productdata, setProductData] = useState<Array<{ productName: string, productcount: number, productprice: number, productbrand: string }>>([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchProductData();
            setProductData(data);
        };
        getData();
    }, []);

    return (
        <div>
            <Table>
                <TableBody>
                    {productdata.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{product.productName}</TableCell>
                            <TableCell>{product.productbrand}</TableCell>
                            <TableCell>${(product.productprice).toFixed(2)}</TableCell>
                            <TableCell className="text-right">{product.productcount}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex p-2 gap-2">
                                    <Button
                                        variant="outline"
                                        className="bg-blue-500 hover:bg-blue-600"
                                        onClick={() => handleAdd({ productname: product.productName, price: product.productprice })}
                                    >
                                        +
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
