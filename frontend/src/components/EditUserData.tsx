"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Editbutton } from "./EditButton"
import { fetchFromApi } from "@/utils/Userapi";
import React, { useState, useEffect } from "react";
import { UserDeleteButton } from "./userdelete";
import { UserEditButton } from "./userEdit";

const fetchUserData = async () => {
  try {
    const data = await fetchFromApi('users');
    //console.log('Fetched data:', data); // Log the fetched data
    // Transform data to match the desired structure
    const transformedData = data.map((user: any) => ({
      userid: user._id, // Assuming _id is the correct field for the ID
      username: user.username,
      type: user.type // Ensure this matches the actual field in the response
    }));

    //console.log('Transformed data:', transformedData); // Log the transformed data
    return transformedData;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
};

  export function DataTable() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      const getData = async () => {
        const usersData = await fetchUserData();
        setUserData(usersData);
      };

      getData();
    }, []);

    return (
      <Table className="pt-4">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow >
            <TableHead>Username</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user,index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell className="font-medium">{user.type}</TableCell>
              <TableCell className="text-right">
                <UserDeleteButton userId={user.userid} />
                <UserEditButton userId={user.userid}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
