"use client";
import React from "react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-t-4 border-b-4 border-black border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
