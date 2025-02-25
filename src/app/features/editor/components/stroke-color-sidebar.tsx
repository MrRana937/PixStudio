'use client'

import { cn } from '@/lib/utils'
import { ActiveTool, Editor, FILL_COLOR, STROKE_COLOR } from '../types'
import { ToolSideBarHeader } from '@/app/features/editor/components/tool-sidebar-header'
import { ToolSideBarClose } from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ColorPicker } from '@/app/features/editor/components/color-picker'

interface StrokeColorSideBarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const StrokeColorSideBar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeColorSideBarProps) => {
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR

  const onClose = () => {
    onChangeActiveTool('select')
  }

  const onChange = (value: string) => {
    // console.log("here in onchange",value);
    editor?.changeStrokeColor(value)
  }

  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[360px] border-r z-[40]',
        activeTool === 'stroke-color' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader
        title="Border Color"
        description="Add border colors to your shapes"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}
