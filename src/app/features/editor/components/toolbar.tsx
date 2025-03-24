"use client"

import { Hint } from "@/components/customui/hint"
import { ActiveTool, Editor, FONT_WEIGHT } from "../types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BsBorderWidth } from "react-icons/bs"
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDown } from "lucide-react"
import {RxTransparencyGrid} from "react-icons/rx"
import { isTextType } from "../utils"
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa6"
import { useState } from "react"
import { FontSizeInput } from "./fontsizeinput"

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

  const selectedObject = editor?.selectedObjects.at(-1)
  const isText = isTextType(selectedObject?.type)
  
 const initialFontFamily = editor?.getActiveFontFamily()
 const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT
 const initialFillColor = editor?.getActiveFillColor()
 const initialStrokeColor = editor?.getActiveStrokeColor()
 const inititalFontStyle=editor?.getActiveFontStyle()
 const initialFontLinethrough=editor?.getActiveFontLinethrough()
 const initialFontUnderliine=editor?.getActiveFontUnderline()
 const initialTextAlign=editor?.getActiveTextAlign()


 const [properites,setProperties]= useState({
  fontWeight:initialFontWeight,
  fillColor:initialFillColor,
  strokeColor:initialStrokeColor,
  fontFamily:initialFontFamily,
  fontStyle:inititalFontStyle,
  fontLinethrough:initialFontLinethrough,
  fontUnderline:initialFontUnderliine,
  textAlign:initialTextAlign
 })


 
 const toogleLinethrough = () => {
   if (!selectedObject) return

   let newValue = properites.fontLinethrough?false:true
   editor?.changeFontLinethrough(newValue)
   setProperties((current) => ({ ...current, fontLinethrough: newValue }))
 }

  const toogleUnderline = () => {
    if (!selectedObject) return

    let newValue = properites.fontUnderline ? false : true
    editor?.changeFontUnderline(newValue)
    setProperties((current) => ({ ...current, fontUnderline: newValue }))
  }

 const toogleBold=()=>{
  
  if(!selectedObject)
    return;

  let newValue= properites.fontWeight>500?500:700
  editor?.changeFontWeight(newValue);
  setProperties((current)=>({...current,fontWeight:newValue}))
 }

  const toogleItalic = () => {

    if (!selectedObject) return

    const isItalic= properites.fontStyle==="italic"
    let newValue = isItalic?"normal":"italic";
    editor?.changeFontStyle(newValue)
    setProperties((current) => ({ ...current, fontStyle: newValue }))
  }


  const changeTextAlign=(value:string)=>{
   
    if(!selectedObject)
      return 

    editor?.changeTextAlign(value);
    setProperties((curr)=>(
      {...curr,textAlign:value}))
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
                    typeof properites.fillColor === 'string'
                      ? properites.fillColor
                      : 'black',
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
                      typeof properites.strokeColor === 'string'
                        ? properites.strokeColor
                        : 'black',
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
                <div className="max-w-[100px] truncate">
                  {properites.fontFamily}
                </div>
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
                className={cn(properites.fontWeight > 500 && 'bg-gray-100')}
              >
                <FaBold className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        {isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="italic" side="bottom" sideoffset={5}>
              <Button
                onClick={toogleItalic}
                size="icon"
                variant="ghost"
                className={cn(
                  properites.fontStyle === 'italic' && 'bg-gray-100'
                )}
              >
                <FaItalic className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        {isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="underline" side="bottom" sideoffset={5}>
              <Button
                onClick={toogleUnderline}
                size="icon"
                variant="ghost"
                className={cn(properites.fontUnderline && 'bg-gray-100')}
              >
                <FaUnderline className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        {isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="linethrough" side="bottom" sideoffset={5}>
              <Button
                onClick={toogleLinethrough}
                size="icon"
                variant="ghost"
                className={cn(properites.fontLinethrough && 'bg-gray-100')}
              >
                <FaStrikethrough className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        {isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="align left" side="bottom" sideoffset={5}>
              <Button
                onClick={() => changeTextAlign('left')}
                size="icon"
                variant="ghost"
                className={cn(properites.textAlign === 'left' && 'bg-gray-100')}
              >
                <AlignLeft className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        {isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="align right" side="bottom" sideoffset={5}>
              <Button
                onClick={() => changeTextAlign('right')}
                size="icon"
                variant="ghost"
                className={cn(
                  properites.textAlign === 'right' && 'bg-gray-100'
                )}
              >
                <AlignRight className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        {isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="align center" side="bottom" sideoffset={5}>
              <Button
                onClick={() => changeTextAlign('center')}
                size="icon"
                variant="ghost"
                className={cn(
                  properites.textAlign == 'center' && 'bg-gray-100'
                )}
              >
                <AlignCenter className="size-4" />
              </Button>
            </Hint>
          </div>
        )}
        {isText && (
          <div className="flex items-center h-full justify-center">
          <FontSizeInput
          
          />
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