"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
} from "@/components/ui/table";
import { Button } from "./ui/button";

interface BillItem {
    productname: string;
    count: number;
    price: number;
}

interface BillPageListProps {
    billItems: BillItem[];
    total: number;
    handleRemove: (product: { productname: string, price: number }) => void;
}

export default function BillPageList({ billItems = [], total = 0, handleRemove }: BillPageListProps) {
    return (
        <Table>
            <TableBody>
                {billItems.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.productname}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>${(item.price).toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.count * item.price).toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex p-2 gap-2">
                                <Button
                                    variant="outline"
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={() => handleRemove({ productname: item.productname, price: item.price })}
                                >
                                    -
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell colSpan={3} className="text-right">${total.toFixed(2)}</TableCell>
                </TableRow>
                <TableFooter />
            </TableBody>
        </Table>
    );
}
