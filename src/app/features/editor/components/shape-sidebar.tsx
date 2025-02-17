"use client"

import { cn } from "@/lib/utils"
import { ActiveTool } from "../types"
import { ToolSideBarHeader } from "@/app/features/editor/components/tool-sidebar-header"
import { ToolSideBarClose } from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShapeTool } from "./shape-tool"
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa"
import { IoTriangle } from "react-icons/io5"
import { FaDiamond } from "react-icons/fa6"

interface ShapeSideBarProps{
    activeTool:ActiveTool,
    onChangeActiveTool:(tool:ActiveTool)=>void
}


export const ShapeSideBar = ({
activeTool,
onChangeActiveTool
}:ShapeSideBarProps) => {

const onClose=()=>{
onChangeActiveTool("select");
}

  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[290px] border-r z-[40]',
        activeTool === 'shapes' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool onClick={() => {}} icon={FaCircle} />
          <ShapeTool onClick={() => {}} icon={FaSquare} />
          <ShapeTool onClick={() => {}} icon={FaSquareFull} />
          <ShapeTool onClick={() => {}} icon={IoTriangle} />
          <ShapeTool
            onClick={() => {}}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />
          <ShapeTool onClick={() => {}} icon={FaDiamond} />
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}