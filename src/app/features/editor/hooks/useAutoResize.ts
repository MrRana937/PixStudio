import { useCallback, useEffect } from "react"
import { fabric } from "fabric"
interface useAutoResizeProps{
canvas:fabric.Canvas|null,
container:HTMLDivElement|null
}


export const useAutoResize = ({canvas,container}:useAutoResizeProps) => {
  
   
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return

    const width = container.offsetWidth
    const height = container.offsetHeight

    canvas.setWidth(width)
    canvas.setHeight(height)

    const center = canvas.getCenter()

    const zoomRatio = 0.85
    const localWorkspace = canvas
      .getObjects()
      .find((object) => object.name === 'clip')

    // @ts-ignore
    const scale = fabric.util.findScaleToFit(localWorkspace, {
      width: width,
      height: height,
    })

    const zoom = zoomRatio * scale

    canvas.setViewportTransform(fabric.iMatrix.concat())
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom)

    if (!localWorkspace) return

    const workspaceCenter = localWorkspace.getCenterPoint()
    const viewportTransform = canvas.viewportTransform

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return
    }

    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0]

    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3]

    canvas.setViewportTransform(viewportTransform)

    localWorkspace.clone((cloned: fabric.Rect) => {
      canvas.clipPath = cloned
      canvas.requestRenderAll()
    })
  }, [canvas, container])



    //detects the resizing of our container div whenever its size changes on the screens 
    useEffect(() => {
        // console.log("Effect running with:", { canvas, container });
        
        if (!canvas || !container) {
            // console.log("Skipping effect - dependencies not ready");
            return;
        }

        // console.log("Setting up ResizeObserver");
        let resizeObserver: ResizeObserver | null = null;

        resizeObserver = new ResizeObserver(() => {
            // console.log("resizing");
            autoZoom();
        });

        resizeObserver.observe(container);

        return () => {
            // console.log("Cleaning up ResizeObserver");
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        }
    }, [canvas, container,autoZoom])

}
