import {fabric} from "fabric";

import * as material from "material-colors"

export const colors = [
  material.red['500'],
  material.pink['500'],
  material.purple['500'],
  material.deepPurple['500'],
  material.indigo['500'],
  material.blue['500'],
  material.lightBlue['500'],
  material.cyan['500'],
  material.teal['500'],
  material.green['500'],
  material.lightGreen['500'],
  material.lime['500'],
  material.yellow['500'],
  material.amber['500'],
  material.orange['500'],
  material.deepOrange['500'],
  material.brown['500'],
  material.blueGrey['500'],
  'transparent',
]

export type ActiveTool =
  | 'select'
  | 'shapes'
  | 'text'
  | 'images'
  | 'draw'
  | 'fill'
  | 'stroke-color'
  | 'stroke-width'
  | 'font'
  | 'opacity'
  | 'filter'
  | 'settings'
  | 'ai'
  | 'remove-bg'
  | 'templates';


  export const selectiondDependentTools=  ["fill" ,"font","filter","opacity","remoe-bg","stroke-color","stroke-width"];

  
  export const FILL_COLOR="rgba(0,0,0,1)"
  export const STROKE_COLOR = "rgba(0,0,0,1)"
  export const STROKE_WIDTH =2

  export const CIRCLE_OPTIONS = {
    height: 400,
    width: 400,
    radius: 225,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth:STROKE_WIDTH
  }

  export const RECTANGLE_OPTIONS = {
    height: 400,
    width: 400,
    left:100,
    top:100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    angle:0
  }
 export const TRIANGLE_OPTIONS = {
   height: 400,
   width: 400,
   left: 100,
   top: 100,
   fill: FILL_COLOR,
   stroke: STROKE_COLOR,
   strokeWidth: STROKE_WIDTH,
   angle: 0,
 }
 export const DIAMOND_OPTIONS = {
   height: 600,
   width: 600,
   left: 100,
   top: 100,
   fill: FILL_COLOR,
   stroke: STROKE_COLOR,
   strokeWidth: STROKE_WIDTH,
   angle: 0,
 }

  export interface EditorHookProps{
    clearSelectionCallback?:()=>void
  }

  export interface Editor {
    changeFillColor: (value: string) => void
    changeStrokeWidth: (value: number) => void
    changeStrokeColor: (value: string) => void
    addCircle: () => void
    addSoftRectangle: () => void
    addRectangle: () => void
    addTriangle: () => void
    addInverseTriangle: () => void
    addDiamond: () => void
    canvas:fabric.Canvas,
    getActiveFillColor:()=>string,
    getActiveStrokeColor:()=>string,
    strokeWidth:number
    selectedObjects:fabric.Object[]
  }


  export type BuildEditorProps = {
    canvas: fabric.Canvas
    fillColor: string
    strokeColor: string
    strokeWidth: number
    setFillColor: (value: string) => void
    setStrokeColor: (value: string) => void
    setStrokeWidth: (value: number) => void
    selectedObjects:fabric.Object[]
  }