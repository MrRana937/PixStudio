"use client"

import type { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface ShapeToolProps
{
onClick:()=>void,
icon:LucideIcon|IconType,
iconClassName?:string    
}


export const ShapeTool=({
onClick,
icon:Icon,
iconClassName
}:ShapeToolProps)=>{

    return (
        <button 
        onClick={()=>onClick}
        className="aspect-square rounded-md p-4 border"
        >
        <Icon className={cn("h-full w-full ",iconClassName)}/>
        </button>
    )

}