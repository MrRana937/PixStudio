"use client"

import { useEditor } from "../hooks/useEditor"
import { useEffect, useRef } from "react"
export default function Editor() {
    
    const { init } = useEditor()

      const canvasRef = useRef<HTMLCanvasElement>(null)
      const workspaceRef = useRef<HTMLDivElement>(null)

      
    useEffect(() => {
        init()
    }, [])

    return <div  ref={workspaceRef}>
        <canvas ref={canvasRef} />
    </div>
}