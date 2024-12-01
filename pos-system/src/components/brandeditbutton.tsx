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
import { fetchBrandById, updateBrand } from "@/utils/brandApi"
import { useEffect, useState } from "react"

interface EditBrandDataButtonProp {
  brandId: string;
}

const fetchBrandDataById = async (brandId: string) => {
  try {
    const data = await fetchBrandById(brandId);
    const transformedData = {
      brandId: data._id,
      brandName: data.brandName,
      contact: data.brandContact,
      email: data.brandAgentEmail,
    };
    return transformedData;
  } catch (error) {
    console.error("Error fetching brand's data:", error);
    return null;
  }
}

export function BrandEditButton({ brandId }: EditBrandDataButtonProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [brandData, setBrandData] = useState({
    brandId: '',
    brandName: '',
    contact: '',
    email: ''
  });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBrandDataById(brandId);
      if (data) {
        setBrandData(data);
      }
    };
    getData();
  }, [brandId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBrandData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const { brandName, contact, email } = brandData;

      // Prepare the updates object
      const updates = {
        brandName,
        brandContact: contact,
        brandAgentEmail: email,
      };

      // Call the updateBrand function with the brand ID and updates
      const response = await updateBrand(brandId, updates);
      setIsOpen(false);
      // Ensure the response is a valid object
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating brand:', errorData);
        // Optionally, display an error message to the user
      } else {
        const data = await response.json();
       // console.log('Brand updated successfully:', data);
        // Optionally, update your UI or state to reflect the changes
      }

    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // Optionally, display a general error message to the user
    }

  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to Brand details here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brandName" className="text-right">
              Brand Name
            </Label>
            <Input
              id="brandName"
              value={brandData.brandName}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={brandData.email}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact" className="text-right">
              Contact
            </Label>
            <Input
              id="contact"
              value={brandData.contact}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
