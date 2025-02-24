import { useEffect } from "react"
import {fabric} from "fabric"

export interface useCanvasEventsProps{
    canvas: fabric.Canvas| null,
    setSelectedObjects:(objects:fabric.Object[])=>void,
    clearSelectionCallback?:()=>void
}


export const useCanvasEvents = ({
canvas,
setSelectedObjects,
clearSelectionCallback
}: useCanvasEventsProps) => {


useEffect(()=>{

    // console.log("effect triggerd");
if(canvas)
{
 canvas.on('selection:created',(e)=>{
    // console.log("created");
    setSelectedObjects(e.selected||[])
 })

 canvas.on('selection:updated',(e)=>{
        // console.log('updated')
    setSelectedObjects(e.selected||[])
 })

 canvas.on('selection:cleared',()=>{
        console.log('cleared')
        clearSelectionCallback?.();
    setSelectedObjects([]);
 })

return ()=>{
    if(canvas)
    {
        canvas.off("selection-created");
         canvas.off('selection-updated')
          canvas.off('selection-cleared')
    }
}


}

},[canvas,setSelectedObjects,clearSelectionCallback])

}