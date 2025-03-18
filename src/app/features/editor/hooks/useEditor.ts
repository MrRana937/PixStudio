import React, { useCallback, useMemo, useState } from 'react'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useAutoResize } from './useAutoResize'
import { BuildEditorProps, CIRCLE_OPTIONS, DIAMOND_OPTIONS, Editor, EditorHookProps, FILL_COLOR, FONT_FAMILY, FONT_WEIGHT, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH, TEXT_OPTIONS, TRIANGLE_OPTIONS } from '@/app/features/editor/types'
import { useCanvasEvents } from './useCanvasEvents'
import { isTextType } from '@/app/features/editor/utils'

const buildEditor = ({
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
  opacity,
  setOpacity,
  fontFamily,
  setFontFamily
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === 'clip')
  }

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace()
    const workspaceCenter = workspace?.getCenterPoint()

    //@ts-ignore
    canvas._centerObject(object, workspaceCenter)

    // canvas.centerObject(object);
  }

  const addToCanvas = (object: fabric.Object) => {
    center(object)
    canvas.add(object)
    canvas.setActiveObject(object)
  }

  // console.log("inside");
  return {
    changeFontWeight: (value: number) => {

      canvas.getActiveObjects().forEach((object) => {
          if (isTextType(object.type))
            {
              //@ts-ignore
               object.set({ fontWeight: value })
            }
      })

      canvas.renderAll()
    },

    changeFontFamily: (value: string) => {
      setFontFamily(value)
      canvas.getActiveObjects().forEach((object) => {
        //@ts-ignore
        //funxtion exists
        object.set('fontFamily', value)
      })
      canvas.renderAll()
    },

    getActiveFontWeight: () => {
      const selectedObject = selectedObjects.at(-1)
      if (!selectedObject) return FONT_WEIGHT
      //@ts-ignore
      const value = selectedObject.get('fontWeight') || FONT_WEIGHT
      return value
    },

    getActiveFontFamily: () => {
      const selectedObject = selectedObjects.at(-1)
      if (!selectedObject) return fontFamily
      //@ts-ignore
      const value = selectedObject.get('fontFamily') || fontFamily
      return value
    },

    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      })
      addToCanvas(object)
    },
    getActiveOpacity: () => {
      // console.log("inside active opacity",opacity);
      const selectedObject = selectedObjects.at(-1)

      if (!selectedObject) return opacity

      const value = selectedObject.get('opacity') || opacity

      //currenlty gradients and patterns are not supported as our method rgbatostring is converting to strings
      return value
    },
    changeOpacity: (value: number) => {
      setOpacity(value)
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value })
      })

      canvas.renderAll()
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        object.bringForward()
      })
      canvas.renderAll()
    },
    sendBackward: () => {
      canvas.getActiveObjects().forEach((object) => {
        object.sendBackwards()
      })
      canvas.renderAll()

      const workSpace = getWorkspace()

      //the problem we are facing is when we do sendbackward shape move downbelow workspace
      //thats why we want the last one to be workspace in the layers of stack

      //  const canvas = new fabric.Canvas(canvasRef.current, {
      //    controlsAboveOverlay: true,
      //    preserveObjectStacking: true,
      //  })

      //here if you turn off the preserveobjecttaking then we got the that functinality the one we selectt
      //will come to top of stack what it just visually appears to be at top what in reality its not chaning
      //the position layer wise so we have use this manuall apppraoch
      workSpace?.sendToBack()
    },
    changeFillColor: (value: string) => {
      console.log('inside changefillcolor')
      console.log(value)
      setFillColor(value)
      canvas.getActiveObjects().forEach((object) => {
        console.log('inside foreach', object)
        console.log(value)
        object.set({ fill: value })
      })

      canvas.renderAll()
    },

    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value)
      canvas
        .getActiveObjects()
        .forEach((object) => object.set({ strokeWidth: value }))
      canvas.renderAll()
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value)
      canvas
        .getActiveObjects()
        .forEach((object) => object.set({ strokeDashArray: value }))
      canvas.renderAll()
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
      canvas.renderAll()
    },

    addCircle: () => {
      console.log('adding a cicle')

      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: (selectedObjects[0]?.get('fill') as string) ?? fillColor,
        strokeWidth: selectedObjects[0]?.get('strokeWidth') ?? strokeWidth,
        stroke: (selectedObjects[0]?.get('stroke') as string) ?? strokeColor,
      })

      addToCanvas(object)
    },

    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10,
        fill: (selectedObjects[0]?.get('fill') as string) ?? fillColor,
        strokeWidth: selectedObjects[0]?.get('strokeWidth') ?? strokeWidth,
        stroke: (selectedObjects[0]?.get('stroke') as string) ?? strokeColor,
      })
      addToCanvas(object)
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: (selectedObjects[0]?.get('fill') as string) ?? fillColor,
        strokeWidth: selectedObjects[0]?.get('strokeWidth') ?? strokeWidth,
        stroke: (selectedObjects[0]?.get('stroke') as string) ?? strokeColor,
      })
      addToCanvas(object)
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: (selectedObjects[0]?.get('fill') as string) ?? fillColor,
        strokeWidth: selectedObjects[0]?.get('strokeWidth') ?? strokeWidth,
        stroke: (selectedObjects[0]?.get('stroke') as string) ?? strokeColor,
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
          fill: (selectedObjects[0]?.get('fill') as string) ?? fillColor,
          strokeWidth: selectedObjects[0]?.get('strokeWidth') ?? strokeWidth,
          stroke: (selectedObjects[0]?.get('stroke') as string) ?? strokeColor,
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
          fill: (selectedObjects[0]?.get('fill') as string) ?? fillColor,
          strokeWidth: selectedObjects[0]?.get('strokeWidth') ?? strokeWidth,
          stroke: (selectedObjects[0]?.get('stroke') as string) ?? strokeColor,
        }
      )
      addToCanvas(object)
    },
    canvas,
    getActiveFillColor: () => {
      const selectedObject = selectedObjects.at(-1)

      if (!selectedObject) return fillColor

      const value = selectedObject.get('fill') || fillColor

      //currenlty gradients and patterns are not supported as our method rgbatostring is converting to strings
      return value as string
    },

    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects.at(-1)

      if (!selectedObject) return strokeColor

      const value = selectedObject.get('stroke') || strokeColor

      //currenlty gradients and patterns are not supported as our method rgbatostring is converting to strings
      return value as string
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects.at(-1)

      if (!selectedObject) return strokeWidth

      const value = selectedObject.get('strokeWidth') || strokeWidth

      return value
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects.at(-1)

      if (!selectedObject) return strokeDashArray

      const value = selectedObject.get('strokeDashArray') || strokeDashArray

      return value
    },
    selectedObjects,
  }
}

export const useEditor = ({clearSelectionCallback}:EditorHookProps) => {

        const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
        const [container, setContainer] = useState<HTMLDivElement | null>(null)
        const [selectedObjects,setSelectedObjects] =useState<fabric.Object[]>([]);
        const [fillColor,setFillColor] =useState<string>(FILL_COLOR);
        const [strokeColor,setStrokeColor]=useState<string>(STROKE_COLOR);
        const [strokeWidth,setStrokeWidth]=useState<number>(STROKE_WIDTH);
        const [strokeDashArray,setStrokeDashArray] =useState<number[]>(STROKE_DASH_ARRAY);
        const [opacity,setOpacity]=useState<number>(1);
        const [fontFamily,setFontFamily]= useState<string>(FONT_FAMILY)

    useAutoResize({canvas,container});

    useCanvasEvents({
        canvas,
        setSelectedObjects,
        clearSelectionCallback
    });

    const editor = useMemo(() => {
      if (canvas) {
        console.log("here inside memo");
        return buildEditor({
          canvas,
          fillColor,
          strokeColor,
          strokeWidth,
          setFillColor,
          setStrokeColor,
          setStrokeWidth,
          selectedObjects,
          strokeDashArray,
          setStrokeDashArray,
          opacity,
          setOpacity,
          fontFamily,
          setFontFamily
        })
      }
      return undefined
    }, [canvas, fillColor, strokeColor, strokeWidth,selectedObjects,strokeDashArray,opacity])

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


