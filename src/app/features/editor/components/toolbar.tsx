"use client"

import { Hint } from "@/components/customui/hint"
import { ActiveTool, Editor } from "../types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ToolBarProps{
    editor:Editor|undefined
    activeTool:ActiveTool
    onChangeActiveTool:(tool:ActiveTool)=>void
}

export const Toolbar=({
    editor,
    activeTool,
    onChangeActiveTool
}:ToolBarProps)=>{

  const selectedObject=editor?.canvas.getActiveObject();

  const getProperty=(property:any)=>{
    if(!selectedObject)
        return null;
    return selectedObject.get(property);
  }

  const fillColor= getProperty("fill");

    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
        <div className="flex items-center h-full justify-center">
          <Hint label="color" side="bottom" sideoffset={5} >
            <Button 
             onClick={()=>onChangeActiveTool("fill")}
             size="icon"
             variant="ghost"
             className={cn(
             activeTool=="fill" && "bg-muted"
             )}
            >
            <div
            className="rounded-sm size-4 border"
            style={
             {
              backgroundColor: typeof fillColor==="string"? fillColor:"black"  
             }   
            }
            />
            </Button>

            </Hint>
        </div>
      </div>
    )
}