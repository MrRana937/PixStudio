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
    editor:any,
    activeTool:ActiveTool,
    onChangeActiveTool:(tool:ActiveTool)=>void
}


export const ShapeSideBar = ({
editor,
activeTool,
onChangeActiveTool
}:ShapeSideBarProps) => {


const onClose=()=>{
onChangeActiveTool("select");
}

  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[360px] border-r z-[40]',
        activeTool === 'shapes' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />
          <ShapeTool
            onClick={() => editor?.addSoftRectangle()}
            icon={FaSquare}
          />
          <ShapeTool
            onClick={() => editor?.addRectangle()}
            icon={FaSquareFull}
          />
          <ShapeTool onClick={() => editor?.addTriangle()} icon={IoTriangle} />
          <ShapeTool
            onClick={() => editor?.addInverseTriangle()}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />
          <ShapeTool
            onClick={() => editor?.addDiamond()}
            icon={FaDiamond}
          />
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}