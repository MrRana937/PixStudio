"use client"
import { Kanban, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SideBarItemProps{
icon:LucideIcon,
label:string,
isActive?:boolean,
onClick:()=> void
}



export const SideBarItem = ({
  icon: Icon, //alias for icon to Icon because React expects component names to start with capital letter
  label,
  isActive,
  onClick
}: SideBarItemProps) => {
  return ( 
     <Button
     variant="ghost"
     onClick={onClick}
     className={cn(
      "w-full h-full aspect-video p-3 py-4 flex flex-col gap-y-1 rounded-none",
      isActive && "bg-muted text-primary"
     )}
     >
      <Icon className="!size-5 stroke-2 shrink-0 "/>
      <span className=" text-xs">{label}</span>
     </Button>

  )
}

