import React, { useCallback, useState } from 'react'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { init } from 'next/dist/compiled/webpack/webpack'
import { useAutoResize } from './useAutoResize'

export const useEditor = () => {

        const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
        const [container, setContainer] = useState<HTMLDivElement | null>(null)

    useAutoResize({canvas,container});

    const init = useCallback( ({
        initialCanvas,
        initialContainer
    }:{
     initialCanvas:fabric.Canvas,
     initialContainer:HTMLDivElement   
    }) => {

    fabric.Object.prototype.set({
        cornerColor:"#FFF",
        cornerStyle:"circle",
        borderColor:'#3b82f6',
        borderScaleFactor:1.5,
        transparentCorners:false,
        borderOpacityWhenMoving:1,
        cornerStrokeColor:'#3b82f6'
    })

    const initialWorkspace= new fabric.Rect({
     width:900,
     height:1000,
     name:"clip",
     fill:"white",
     selectable:false,
     hasControls:false,
     shadow:new fabric.Shadow({
        color:"rgba(0,0,0,0.8)",
        blur:5
     })   
    })    

     initialCanvas.setWidth(initialContainer.offsetWidth);
     initialCanvas.setHeight(initialContainer.offsetHeight);
      
    initialCanvas.add(initialWorkspace);
    initialCanvas.centerObject(initialWorkspace) ;
    initialCanvas.clipPath=initialWorkspace;
    
    setCanvas(initialCanvas);
    setContainer(initialContainer);


    const test = new fabric.Rect({
        height:100,
        width:100,
        fill:"black"
    })

    initialCanvas.add(test);
    initialCanvas.centerObject(test);


    },[])

    return {
        init
    }   
}


