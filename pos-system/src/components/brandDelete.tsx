import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteBrand } from "@/utils/brandApi";
import { toast } from 'react-toastify';


interface BrnadDeleteButtonprops{
  brandId: string;
  onDelete: () => void;
}

export function BrandDeleteButton({brandId,onDelete}:BrnadDeleteButtonprops) {
  const handleDelete = async() => {
    try {
      //console.log(brandId);
      await deleteBrand(brandId)
      toast.success('Data successfully deleted!');
      onDelete();
    } catch (error) {
      toast.error("Error Deleting the data");
      console.error("Error deleting data:", error);
    }
      // Add your delete logic here

    };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-red-600 hover:bg-red-500">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete  data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
