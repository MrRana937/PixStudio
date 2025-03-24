import {fabric} from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";

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


  export const fonts = [
    'Arial',
    'Arial Black',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
    'Palatino',
    'Bookman',
    'Comic Sans MS',
    'Impact',
    'Lucida Sans Unicode',
    'Geneva',
    'Lucida Console',
  ]



  export const selectiondDependentTools=  ["fill" ,"font","filter","opacity","remoe-bg","stroke-color","stroke-width"];

  
  export const FILL_COLOR="rgba(0,0,0,1)"
  export const STROKE_COLOR = "rgba(0,0,0,1)"
  export const STROKE_WIDTH =2
  export const STROKE_DASH_ARRAY=[];
  export const FONT_FAMILY="Arial";
  export const FONT_SIZE=32
  export const FONT_WEIGHT=400

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



 export const TEXT_OPTIONS = {
   type:"textbox",
   left: 100,
   top: 100,
   fill: FILL_COLOR,
   fontFamily:FONT_FAMILY,
   fontSize:FONT_SIZE,
   angle: 0,
 }

  export interface EditorHookProps{
    clearSelectionCallback?:()=>void
  }

  export interface Editor {
    changeFontSize:(value:number)=>void, 
    getActiveFontSize:()=>number
    getActiveTextAlign: () => string
    changeTextAlign: (value: string) => void
    getActiveFontLinethrough: () => boolean
    getActiveFontUnderline: () => boolean
    changeFontLinethrough: (value: boolean) => void
    changeFontUnderline: (value: boolean) => void
    changeFontStyle: (value: string) => void
    getActiveFontStyle: () => string
    changeFontWeight: (value: number) => void
    getActiveFontWeight: () => number
    changeFontFamily: (value: string) => void
    getActiveFontFamily: () => string
    addText: (value: string, options?: ITextboxOptions) => void
    getActiveOpacity: () => void
    changeOpacity: (value: number) => void
    bringForward: () => void
    sendBackward: () => void
    changeFillColor: (value: string) => void
    changeStrokeWidth: (value: number) => void
    changeStrokeColor: (value: string) => void
    changeStrokeDashArray: (value: number[]) => void
    addCircle: () => void
    addSoftRectangle: () => void
    addRectangle: () => void
    addTriangle: () => void
    addInverseTriangle: () => void
    addDiamond: () => void
    canvas: fabric.Canvas
    getActiveFillColor: () => string
    getActiveStrokeColor: () => string
    getActiveStrokeWidth: () => number
    getActiveStrokeDashArray: () => number[]
    selectedObjects: fabric.Object[]
  }


  export type BuildEditorProps = {
    canvas: fabric.Canvas
    fillColor: string
    strokeColor: string
    strokeWidth: number
    setFillColor: (value: string) => void
    setStrokeColor: (value: string) => void
    setStrokeWidth: (value: number) => void
    selectedObjects: fabric.Object[]
    strokeDashArray: number[]
    setStrokeDashArray: (value: number[]) => void
    opacity:number,
    setOpacity:(value:number)=>void
    fontFamily:string,
    setFontFamily:(value:string)=>void
  }