"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PrivateLayout from "./private-layout";
import PublicLayout from "./public-layout";
import { get } from "@/utils/httpMethod";
// import PortfolioLayout from "@/app/portfolio/_components/portfolio-layout";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user,setUser] = useState([]);
  useEffect(() =>{
    getUser()
  },[])

  const getUser = async() => {
    const url = '/user/1'

    const response = await get(url);
    if (response.success) {
      console.log(response,"MASDOAS");
      
    }
  }

  if (pathname.startsWith("/account")) {
    return <PrivateLayout>{children}</PrivateLayout>;
  }
  else{
    return <PublicLayout>{children}</PublicLayout>; 
  }

  // if (pathname.startsWith("/portfolio")) {
  //   return {children}
  // }
}

export default LayoutProvider;