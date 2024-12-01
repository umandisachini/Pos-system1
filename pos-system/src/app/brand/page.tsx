import { BrandAddForm } from "@/components/addBrandForm";
import { BrandtList } from "@/components/brandDetail";
import NavBar from "@/components/navBar";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const BrandPage: React.FC = () =>{
    return(
        <div className="flex items-start justify-start gap-2 rounded-[8px]">
            <div>
                <NavBar/>
            </div>
            <div className="flex gap-4 p-8">

            <Tabs defaultValue="1" className="w-screen/2">
                <TabsList>
                    <TabsTrigger value="1">Brand Details</TabsTrigger>
                    <TabsTrigger value="2">New Brands</TabsTrigger>
                </TabsList>
                    <TabsContent value="1">
                        <BrandtList/>
                    </TabsContent>
                    <TabsContent value="2">
                        <div className="flex gap-10">
                            <BrandAddForm />
                        </div>

                    </TabsContent>
            </Tabs>

            {/* <div></div>
             */}
            </div>
        </div>
    )
}

export default BrandPage;
