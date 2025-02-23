"use client"

import { fabric } from "fabric"
import { useEditor } from "../hooks/useEditor"
import { useCallback, useEffect, useRef, useState } from "react"
import {Navbar} from '@/app/features/editor/components/navbar';
import { Sidebar } from "@/app/features/editor/components/sidebar";
import { Toolbar } from '@/app/features/editor/components/toolbar'
import { Footer } from '@/app/features/editor/components/footer'
import { ActiveTool } from "../types";
import { ShapeSideBar } from "./shape-sidebar";

export default function Editor() {

  const [activeTool,setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback((tool: ActiveTool) => {
    if (tool == activeTool) {
      return setActiveTool('select')
    }

    if (tool == 'draw') {
      //todo enable draw mode
    }
    if (activeTool == 'draw') {
      //disable draw mode7
    }

   setActiveTool(tool)
  }, [activeTool])

    const { init,editor } = useEditor()

      const canvasRef = useRef(null)
      const containerRef = useRef<HTMLDivElement>(null)
      
      
     useEffect(() => {
      // console.log("effect triggerd");
       const canvas = new fabric.Canvas(canvasRef.current, {
         controlsAboveOverlay: true,
         preserveObjectStacking: true,
       })

       init({
         initialCanvas: canvas,
         initialContainer: containerRef.current!,
       })

       return () => {
         canvas.dispose()
       }
     }, [init])

     console.log("editor renderd");
    return (
      <div className="h-full flex flex-col">
        <Navbar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
          <Sidebar
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
          <ShapeSideBar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
          <main className=" bg-muted flex-1 overflow-auto relative flex flex-col">
            <Toolbar
              editor={editor}
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
              //why key becuase everytime active object changes toolbar will be rerenderd so new key for react for reconciliation
              key={JSON.stringify(editor?.canvas.getActiveObject())}
            />
            <div
              className="flex-1 h-[calc(100%-124px)] bg-muted"
              ref={containerRef}
            >
              <canvas ref={canvasRef} />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    )
}