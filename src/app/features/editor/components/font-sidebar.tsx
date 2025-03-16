'use client'

import { cn } from '@/lib/utils'
import { ActiveTool, Editor, FONT_FAMILY} from '../types'
import { ToolSideBarHeader } from '@/app/features/editor/components/tool-sidebar-header'
import { ToolSideBarClose } from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { fonts } from '../types'

interface FontSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const FontSideBar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {

    const fontFamily = editor?.getActiveFontFamily() ||FONT_FAMILY

  const onClose = () => {
    onChangeActiveTool('select')
  }


  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[360px] border-r z-[40]',
        activeTool === 'font' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title="Font" description="add font to your text" />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {
          fonts.map((font)=>{
            return (
              <Button
                variant="secondary"
                size="lg"
                key={font}
                className={cn(
                  'w-full h-16 justify-start text-left text-base p-2 border-2',
                  fontFamily === font && 'border-2 border-blue-400'
                )}
                style={{
                  fontFamily: font,
                }}
                onClick={() => {
                  editor?.changeFontFamily(font)
                }}
              >
                {font}
              </Button>
            )
          })
          }
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}
