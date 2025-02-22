import React, { useCallback, useMemo, useState } from 'react'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useAutoResize } from './useAutoResize'
import { BuildEditorProps, CIRCLE_OPTIONS, DIAMOND_OPTIONS, Editor, FILL_COLOR, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_WIDTH, TRIANGLE_OPTIONS } from '@/app/features/editor/types'
import { useCanvasEvents } from './useCanvasEvents'
import { isTextType } from '@/app/features/editor/utils'

const buildEditor =({
canvas,
fillColor,
strokeColor,
strokeWidth,
setFillColor,
setStrokeColor,
setStrokeWidth
}:BuildEditorProps):Editor=>{

const getWorkspace=()=>{
  return canvas
      .getObjects()
      .find((object) => object.name === 'clip')
}

const center=(object:fabric.Object)=>{
const workspace = getWorkspace();
const workspaceCenter=workspace?.getCenterPoint();

//@ts-ignore
canvas._centerObject(object,workspaceCenter);

// canvas.centerObject(object);


}


const addToCanvas=(object:fabric.Object)=>
{
center(object);
canvas.add(object);
canvas.setActiveObject(object);
}

    console.log("inside");
return {
  changeFillColor: (value: string) => {
    setFillColor(value)
    canvas.getActiveObjects().forEach((object) => object.set({ fill: value }))
  },

  changeStrokeWidth: (value: number) => {
    setStrokeWidth(value)
    canvas
      .getActiveObjects()
      .forEach((object) => object.set({ strokeWidth: value }))
  },
  changeStrokeColor: (value: string) => {
    setStrokeColor(value)
    canvas.getActiveObjects().forEach((object) => {
      if (isTextType(object.type)) {
        object.set({ fill: value })
        return
      }
      object.set({ stroke: value })
    })
  },

  addCircle: () => {
    console.log('adding a cicle')

    const object = new fabric.Circle({
      ...CIRCLE_OPTIONS,
    })

    addToCanvas(object)
  },

  addSoftRectangle: () => {
    const object = new fabric.Rect({
      ...RECTANGLE_OPTIONS,
      rx: 10,
      ry: 10,
    })
    addToCanvas(object)
  },
  addRectangle: () => {
    const object = new fabric.Rect({
      ...RECTANGLE_OPTIONS,
    })
    addToCanvas(object)
  },
  addTriangle: () => {
    const object = new fabric.Triangle({
      ...TRIANGLE_OPTIONS,
    })
    addToCanvas(object)
  },

  //the original shape rotator moves downward what we want
  //default postion of shape this works what that rotator moves downward for shape
  //   addInverseTriangle: () => {
  //     const object = new fabric.Triangle({
  //       ...TRIANGLE_OPTIONS,
  //       angle:180
  //     })
  //     addToCanvas(object)
  //   },

  addInverseTriangle: () => {
    const height = TRIANGLE_OPTIONS.height
    const width = TRIANGLE_OPTIONS.width
    const object = new fabric.Polygon(
      [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width / 2, y: height },
      ],
      {
        ...TRIANGLE_OPTIONS,
      }
    )
    addToCanvas(object)
  },

  addDiamond: () => {
    const height = DIAMOND_OPTIONS.height
    const width = DIAMOND_OPTIONS.width
    const object = new fabric.Polygon(
      [
        { x: width / 2, y: 0 },
        { x: width, y: height / 2 },
        { x: width / 2, y: height },
        { x: 0, y: height / 2 },
      ],
      {
        ...DIAMOND_OPTIONS,
      }
    )
    addToCanvas(object)
  },
  
  fillColor,
  strokeColor,
  strokeWidth,
}



}

export const useEditor = () => {

        const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
        const [container, setContainer] = useState<HTMLDivElement | null>(null)
        const [selectedObjects,setSelectedObjects] =useState<fabric.Object[]>([]);
        const [fillColor,setFillColor] =useState<string>(FILL_COLOR);
        const [strokeColor,setStrokeColor]=useState<string>(STROKE_COLOR);
        const [strokeWidth,setStrokeWidth]=useState<number>(STROKE_WIDTH);

    useAutoResize({canvas,container});

    useCanvasEvents({
        canvas,
        setSelectedObjects
    });

    const editor = useMemo(() => {
      if (canvas) {
        // console.log("here");
        return buildEditor({
          canvas,
          fillColor,
          strokeColor,
          strokeWidth,
          setFillColor,
          setStrokeColor,
          setStrokeWidth,
        })
      }
      return undefined
    }, [canvas, fillColor, strokeColor, strokeWidth])

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


    // const test = new fabric.Rect({
    //     height:100,
    //     width:100,
    //     fill:"black"
    // })

    // initialCanvas.add(test);
    // initialCanvas.centerObject(test);


    },[])

    return {
        init,
        editor
    }   
}


