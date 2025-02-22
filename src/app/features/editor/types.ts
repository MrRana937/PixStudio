import {fabric} from "fabric";

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

  
  export const FILL_COLOR="rgba('0,0,0,1')"
  export const STROKE_COLOR = "rgba('0,0,0,1')"
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
    fillColor:string,
    strokeColor:string,
    strokeWidth:number
  }


  export type BuildEditorProps = {
    canvas: fabric.Canvas
    fillColor: string
    strokeColor: string
    strokeWidth: number
    setFillColor: (value: string) => void
    setStrokeColor: (value: string) => void
    setStrokeWidth: (value: number) => void
  }