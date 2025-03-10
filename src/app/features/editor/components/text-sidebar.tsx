'use client'

import { cn } from '@/lib/utils'
import { ActiveTool, Editor} from '../types'
import { ToolSideBarHeader } from '@/app/features/editor/components/tool-sidebar-header'
import { ToolSideBarClose } from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

interface TextSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const TextSideBar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {

  const onClose = () => {
    onChangeActiveTool('select')
  }


  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[360px] border-r z-[40]',
        activeTool === 'text' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title="Text" description="add text to your canvas" />
      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Button
            className="w-full "
            onClick={() => {
              editor?.addText('hello')
            }}
          >
            Add Textbox
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full h-14 "
            onClick={() => {
              editor?.addText('Heading', {
                fontWeight: 700,
                fontSize: 80,
              })
            }}
          >
            <span className="text-2xl font-bold"> Add Heading</span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full h-14 "
            onClick={() => {
              editor?.addText('Subheading', {
                fontWeight: 400,
                fontSize: 44,
              })
            }}
          >
            <span className="text-xl font-medium"> Add Subheading</span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full h-14 "
            onClick={() => {
              editor?.addText('Paragraph', {
                fontSize: 32,
              })
            }}
          >
           Add Paragraph
          </Button>
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}
