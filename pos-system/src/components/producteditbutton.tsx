import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchProductById, updateProduct } from "@/utils/productapi";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchBrands } from "@/utils/brandApi";

interface EditProductButtonProps {
  productId: string;
}

const fetchProductDataById = async (productId: string) => {
  try {
    const data = await fetchProductById(productId);
    const transformedData = {
      productId: data._id,
      productName: data.productName,
      price: data.price,
      stock: data.stock,
      brand: data.brand,
    };
    return transformedData;
  } catch (error) {
    console.error("Error fetching product's data:", error);
    return null;
  }
};

export function ProductEditbutton({ productId }: EditProductButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [productData, setProductData] = useState({
    productId: '',
    productName: '',
    price: '',
    stock: '',
    brand: ''
  });
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const productData = await fetchProductDataById(productId);
      if (productData) {
        setProductData(productData);
      }
    };
    getData();
  }, [productId]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { id, value } = event.target;
    setProductData((prevState) => ({
      ...prevState,
      [id]: value, // Dynamically update the correct field
    }));
  };

  const handleBrandChange = (value: string) => {
    setProductData((prevState) => ({
      ...prevState,
      brand: value, // Update brand field
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const {brand,productName,price,stock} = productData;
      const data = {
        brand,
        productName,
        price: parseFloat(price),
        stock:parseInt(stock)
      }
      //console.log(data)
      await updateProduct(productId,data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving product changes:", error);
    }
    // Implement save functionality here
  };

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const fetchedBrands = await fetchBrands();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrandData();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product Details</DialogTitle>
          <DialogDescription>
            Make changes to product details here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">
              Product name
            </Label>
            <Input
              id="productName"
              value={productData.productName}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={productData.price}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              value={productData.stock}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">
              Brand
            </Label>
            <Select
              value={productData.brand}
              onValueChange={handleBrandChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.brandName} value={brand.brandName}>
                    {brand.brandName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
