"use client"

import { Logo } from "@/app/features/editor/components/logo"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, Ghost, MousePointerClick, Redo2, Undo2 } from 'lucide-react'
import { CiFileOn } from 'react-icons/ci'
import { Hint } from "@/components/customui/hint"
import { ActiveTool } from "@/app/features/editor/types"
import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from "@/components/ui/separator"
import { BsCloudCheck } from "react-icons/bs"
import { useState } from "react"

interface NavbarProps{
  activeTool:ActiveTool,
  onChangeActiveTool:(tool:ActiveTool)=> void
}



export const Navbar = ({
  activeTool,
  onChangeActiveTool
}:NavbarProps) => {

  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="flex w-full h-full items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => {}} // todo : add funcioanltiy
            >
              <CiFileOn className="!size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  open a json file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom" sideoffset={10}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onChangeActiveTool("select")}
            className={cn(
             activeTool==="select"&&"bg-gray-100" 
            )} 
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideoffset={10}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {}} //todo click
            className="" //add dynamic class later
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideoffset={10}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {}} //todo click
            className="" //add dynamic class later
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />

        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div className="text=xs text-muted-foreground">Saved</div>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {}} // todo : add funcioanltiy
              >
                <CiFileOn className="!size-8" />
                <div>
                  <p>Json</p>
                  <p className="text-xs text-muted-foreground">
                    save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {}} // todo : add funcioanltiy
              >
                <CiFileOn className="!size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">best for</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {}} // todo : add funcioanltiy
              >
                <CiFileOn className="!size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {}} // todo : add funcioanltiy
              >
                <CiFileOn className="!size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        {/* 
        user menu to be added
        */}
        </div>
      </div>
    </nav>
  )
}
