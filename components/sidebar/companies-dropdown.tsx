import React from "react";
import Image from "next/image";
import profilePic from '../../public/logo.png'

export const CompaniesDropdown = () => {
  return (

        <div className="flex items-center gap-2">
         <Image   src={profilePic}  alt="logo" priority/>
        </div>
    
  );
};
