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
import { deleteProduct } from "@/utils/productapi";
import { deleteUser } from "@/utils/Userapi";
import { toast } from 'react-toastify';


interface ProductDeleteButtonProps {
  productId: string;
}
export function ProductDeleteButton({productId}:ProductDeleteButtonProps) {
  const handleDelete = async () => {
      // Add your delete logic here
      try {
        //console.log(productId)
        await deleteProduct(productId);
        toast.success('Product successfull')
      } catch (error) {
        toast.error('Error deleting product.');
        console.error('Error deleting product:', error);
      }
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
