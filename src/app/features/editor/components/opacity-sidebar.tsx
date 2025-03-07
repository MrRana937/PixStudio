'use client'

import { cn } from '@/lib/utils'
import { ActiveTool, Editor} from '../types'
import { ToolSideBarHeader } from '@/app/features/editor/components/tool-sidebar-header'
import { ToolSideBarClose } from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'


interface OpacitySideBarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const OpacitySideBar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: OpacitySideBarProps) => {
  const opacityValue = editor?.getActiveOpacity() || 1

  console.log(opacityValue);

  const onClose = () => {
    onChangeActiveTool('select')
  }

  const onChange = (value: number) => {
    console.log("here in onchange",value);
    editor?.changeOpacity(value)
  }

  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[360px] border-r z-[40]',
        activeTool === 'opacity' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader
        title="Opacity"
        description="change theopacity of shape"
      />
      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Slider
            value={[opacityValue]}
            onValueChange={(values) => onChange(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}
