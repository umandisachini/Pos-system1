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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchUserById, updateUser } from "@/utils/Userapi"
import { useEffect, useState } from 'react'
import { z } from "zod";

interface UserEditButtonProps {
  userId: string;
}

const fetchUserDatabyId = async (userId: string) => {
  try {
    const data = await fetchUserById(userId);
    const transformedData = {
      userid: data._id,
      username: data.username,
      type: data.type,
      password: data.password // Initialize password field
    };
  //  console.log(transformedData)
    return transformedData;
  } catch (error) {
    console.error("Error fetching user's data:", error);
    return null;
  }
}

export function UserEditButton({ userId }: UserEditButtonProps) {
  const [userData, setUserData] = useState({
    userid: '',
    username: '',
    type: '',
    password: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const userData = await fetchUserDatabyId(userId);
      if (userData) {
        setUserData(userData);
      }
    };
    getData();
  }, [userId,key]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      type: value,
    }));
  };


  const handleSaveChanges = async () => {
    try {
      const { username, type } = userData;

      // Prepare the updates object
      const updates = {
        username: username,
        type: type,
      };
     // console.log(updates)
      await updateUser(userId, updates);
      setIsOpen(false);
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error updating user data:", error);
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
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={userData.username}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              value={userData.type}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
