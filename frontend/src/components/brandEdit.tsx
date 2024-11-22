import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchBrandById } from "@/utils/brandApi";
import { useEffect, useState } from "react";
import { date } from "zod";

interface branddetailProp{
  brandId:string;
}

const fetchBrandDatabyId = async (brandId:string) => {
  try {
    const data = await fetchBrandById(brandId);
   // console.log(date)
    const transformedData = {
      brandId: data._id,
      brandname: data.brandname,
      contact: data.brandtype,
      email: data.email,
    };
    return transformedData;
  } catch (error) {
    console.error("Error fetching user's data:", error);
    return null;
  }
}

export function BrandEditbutton({brandId}:branddetailProp) {
  const [brandData, setBrandData] = useState({
    brandId: '',
    brandname: '',
    contact: '',
    email: ''
  });

  useEffect(() => {
    const getData = async () => {
      const brandData = await fetchBrandDatabyId(brandId);
      if (brandData) {
        setBrandData(brandData);
      }
    };
    getData();
  }, [brandId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
