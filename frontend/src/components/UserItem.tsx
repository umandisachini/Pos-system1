'use client'
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react";

export default function UserItem() {
    return(
        <div className="flex items-start justify-start gap-2 rounded-[8px] p-4 ">
            <div className="avatar rounded-full w-10 h-10 bg-slate-600
             text-white font-[700] flex items-center justify-center"><User className="w-5 h-5"></User> </div>
            <div>
            {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
                <p className="text-white text-[16px]">Kamal</p>
                <p className="text-gray text-[12px]">Admin</p>
            </div>
        </div>
    );
}