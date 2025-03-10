"use client"

import { Hint } from "@/components/customui/hint"
import { ActiveTool, Editor } from "../types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BsBorderWidth } from "react-icons/bs"
import { ArrowDown, ArrowUp } from "lucide-react"
import {RxTransparencyGrid} from "react-icons/rx"
import { isTextType } from "../utils"

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

  const selectedObject=editor?.selectedObjects.at(-1);
  const isText=isTextType(selectedObject?.type);

//   const getProperty=(property:any)=>{
//     if(!selectedObject)
//         return null;
//     return selectedObject.get(property);
//   }

//   const fillColor= getProperty("fill");

     const fillColor=editor?.getActiveFillColor();
     const strokeColor=editor?.getActiveStrokeColor();
//   console.log(typeof(fillColor),fillColor);

// console.log("fillcolro is",fillColor);
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
        <div className="flex items-center h-full justify-center">
          <Hint label="color" side="bottom" sideoffset={5}>
            <Button
              onClick={() => onChangeActiveTool('fill')}
              size="icon"
              variant="ghost"
              className={cn(activeTool == 'fill' && 'bg-muted')}
            >
              <div
                className="rounded-sm size-4 border"
                style={{
                  backgroundColor:
                    typeof fillColor === 'string' ? fillColor : 'black',
                }}
              />
            </Button>
          </Hint>
        </div>

        {!isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="border-color" side="bottom" sideoffset={5}>
              <Button
                onClick={() => onChangeActiveTool('stroke-color')}
                size="icon"
                variant="ghost"
                className={cn(activeTool == 'stroke-color' && 'bg-muted')}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{
                    borderColor:
                      typeof strokeColor === 'string' ? strokeColor : 'black',
                  }}
                />
              </Button>
            </Hint>
          </div>
        )}
        {!isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="stroke width" side="bottom" sideoffset={5}>
              <Button
                onClick={() => onChangeActiveTool('stroke-width')}
                size="icon"
                variant="ghost"
                className={cn(activeTool == 'stroke-width' && 'bg-muted')}
              >
                <BsBorderWidth className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        <div className="flex items-center h-full justify-center">
          <Hint label="bring forward" side="bottom" sideoffset={5}>
            <Button
              onClick={() => editor?.bringForward()}
              size="icon"
              variant="ghost"
            >
              <ArrowUp className="size-4" />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center h-full justify-center">
          <Hint label="send backward" side="bottom" sideoffset={5}>
            <Button
              onClick={() => editor?.sendBackward()}
              size="icon"
              variant="ghost"
            >
              <ArrowDown className="size-4" />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center h-full justify-center">
          <Hint label="opacity" side="bottom" sideoffset={5}>
            <Button
              onClick={() => onChangeActiveTool('opacity')}
              size="icon"
              variant="ghost"
              className={cn(activeTool == 'opacity' && 'bg-gray-100')}
            >
              <RxTransparencyGrid className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    )
}