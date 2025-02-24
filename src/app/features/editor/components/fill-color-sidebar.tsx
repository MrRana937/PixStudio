'use client'

import { cn } from '@/lib/utils'
import { ActiveTool, Editor, FILL_COLOR } from '../types'
import { ToolSideBarHeader } from '@/app/features/editor/components/tool-sidebar-header'
import { ToolSideBarClose } from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ColorPicker } from '@/app/features/editor/components/color-picker'

interface FillColorSideBarProps {
  editor: Editor |undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const FillColorSideBar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorSideBarProps) => {

  const value= editor?.getActiveFillColor() || FILL_COLOR

    const onClose = () => {
    onChangeActiveTool('select')
  }

  const onChange=(value:string)=>{
    // console.log("here in onchange",value);
    editor?.changeFillColor(value);
  }

  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[360px] border-r z-[40]',
        activeTool === 'fill' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader
        title="Fill Color"
        description="Add colors to your shapes"
      />
      <ScrollArea>
        <div className='p-4 space-y-6'>
           <ColorPicker
           value={value}
           onChange={onChange}
           />
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}
