import NavBar from "@/components/navBar";
import React from "react";

export function Adminonly(){
    return(
        <div className="flex">
            <div>
                <NavBar/>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-between p-72">
                    <div>
                    <h1>
                        Welcome to 
                        <span style={{ color: 'green', fontSize:32 }}>
                            TechTrend
                        </span>
                    </h1>
                    <h1>
                        Sorry
                    </h1>
                    <h1>
                        <span style={{ color: 'red', fontSize:32}}>
                            Admin Only 
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
}