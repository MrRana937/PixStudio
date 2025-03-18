"use client"

import { Hint } from "@/components/customui/hint"
import { ActiveTool, Editor, FONT_WEIGHT } from "../types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BsBorderWidth } from "react-icons/bs"
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react"
import {RxTransparencyGrid} from "react-icons/rx"
import { isTextType } from "../utils"
import { FaBold } from "react-icons/fa6"

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
  const fontFamily=editor?.getActiveFontFamily();
  const fontWeight=editor?.getActiveFontWeight() || FONT_WEIGHT
  console.log(isText);
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


 const toogleBold=()=>{
  
  const selectedObject=editor?.selectedObjects.at(-1)
  if(!selectedObject)
    return;

  let newValue= fontWeight>500?500:700
  console.log('insdide tooglebold',fontWeight, newValue)
  editor?.changeFontWeight(newValue);
 }



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

        {isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="font" side="bottom" sideoffset={5}>
              <Button
                onClick={() => onChangeActiveTool('font')}
                size="icon"
                variant="ghost"
                className={cn(
                  'w-auto px-2 text-sm',
                  activeTool == 'font' && 'bg-muted'
                )}
              >
                <div className="max-w-[100px] truncate">{fontFamily}</div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </Hint>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="bold" side="bottom" sideoffset={5}>
              <Button
                onClick={toogleBold}
                size="icon"
                variant="ghost"
                className={cn(
                  fontWeight> 500 && "bg-gray-100"
                )}
              >
                <FaBold className="size-4"/>
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