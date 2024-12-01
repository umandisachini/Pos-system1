"use client"
import React, { useState } from "react";
import NavBar from "@/components/navBar";
import {
    TableHeader,
    TableRow,
    TableHead,
    TableFooter,
    TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import BillPageProduct from "@/components/billpageproduct";
import BillPageList from "@/components/billpagelist";
import { Button } from "@/components/ui/button";
import { createBill } from "@/utils/billapi";

export default function BillPage() {
    const [billItems, setBillItems] = useState<Array<{ productname: string, count: number, price: number }>>([]);
    const [total, setTotal] = useState(0);

    const handleAdd = (product: { productname: string, price: number }) => {
        setBillItems(prev => {
            const existingItem = prev.find(item => item.productname === product.productname);
            if (existingItem) {
                return prev.map(item =>
                    item.productname === product.productname
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            } else {
                return [...prev, { productname: product.productname, count: 1, price: product.price }];
            }
        });
        setTotal(prev => prev + product.price);
    };

    const handleRemove = (product: { productname: string, price: number }) => {
        setBillItems(prev => {
            const existingItem = prev.find(item => item.productname === product.productname);
            if (existingItem && existingItem.count > 1) {
                return prev.map(item =>
                    item.productname === product.productname
                        ? { ...item, count: item.count - 1 }
                        : item
                );
            } else {
                return prev.filter(item => item.productname !== product.productname);
            }
        });
        setTotal(prev => prev - product.price);
    };

    const handlePayment = async () => {
    const items = billItems.map(item => ({
        productID: item.productname,
        unitPrice: item.price,
        quantity: item.count,
        total: item.price * item.count,
    }));
    const bill = {
        billDate: new Date(),
        billTotal: total,
        items: items, // Remove the extra array wrapping the items property
    };
      const addTODB = await createBill(bill);
      if (addTODB) {
          setBillItems([]);
          setTotal(0);
      }
    }

    return (
        <div className="flex">
            <div>
                <NavBar />
            </div>
            <div>
            <h3 className="text-4xl font-bold pl-7 pt-4">Make Invoice</h3>
            <div className="flex">
                <div className="gap-2 p-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Item</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead className="text-right">Stocks</TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <ScrollArea className="h-[600px]">
                        <BillPageProduct handleAdd={handleAdd} />
                    </ScrollArea>
                </div>
                <div className="p-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <ScrollArea className="h-[500px]">
                        <BillPageList billItems={billItems} total={total} handleRemove={handleRemove} />
                    </ScrollArea>

                    <TableFooter>
                        <TableRow>
                            <TableCell className="text-right">
                                <Button onClick={handlePayment}>Make Payment</Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </div>
            </div>
            </div>
        </div>
    );
}
