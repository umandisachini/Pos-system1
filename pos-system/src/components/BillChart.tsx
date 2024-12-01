"use client"

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchFromApi } from "@/utils/productapi";

interface Product {
  productName: string;
  stock: number;
}

const fetchProductdata = async (): Promise<Product[]> => {
  try {
    const data = await fetchFromApi('products');
    return data.map((product: any) => ({
      productName: product.productName,
      stock: product.stock,
    }));
  } catch (error) {
    console.error("Error fetching products data:", error);
    return [];
  }
}

const chartConfig = {
  desktop: {
    label: "Stock remaining",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartComponent() {
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchProductdata();
      setProductData(data);
    };

    getData();
  }, []);

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <CardTitle>Stock Details</CardTitle>
        <CardDescription>Remaining stocks Details</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={productData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="productName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="stock" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
