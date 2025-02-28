'use client'

import { cn } from '@/lib/utils'
import { ActiveTool, Editor, FILL_COLOR, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH } from '../types'
import { ToolSideBarHeader } from '@/app/features/editor/components/tool-sidebar-header'
import { ToolSideBarClose } from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ColorPicker } from '@/app/features/editor/components/color-picker'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface StrokeWidthSideBarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const StrokeWidthSideBar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSideBarProps) => {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH
  const strokeType =editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY

  const onClose = () => {
    onChangeActiveTool('select')
  }

  const onChangeStrokeWidth = (value: number) => {
    // console.log("here in onchange",value);
    editor?.changeStrokeWidth(value)
  }

  const onChangeStrokeType=(value:number[])=>
  {
     editor?.changeStrokeDashArray(value);
  }

  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[360px] border-r z-[40]',
        activeTool === 'stroke-width' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader
        title="Strike Options"
        description="Add border width to your shapes"
      />
      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">Stroke Width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">Stroke Type</Label>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              'w-full h-16 justify-start text-left py-2 px-4',
              JSON.stringify(strokeType) === `[]` && 'border-2 border-blue-400'
            )}
            onClick={() => onChangeStrokeType([])}
          >
            <div className="w-full border-black rounded-full border-4" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              'w-full h-16 justify-start text-left py-2 px-4',
              strokeType.join(',') === `5,5` && 'border-2 border-blue-400'
            )}
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}
