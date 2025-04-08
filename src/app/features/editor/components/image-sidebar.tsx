'use client'

import { cn } from '@/lib/utils'
import { ActiveTool, Editor, FONT_FAMILY} from '../types'
import { ToolSideBarHeader } from '@/app/features/editor/components/tool-sidebar-header'
import { ToolSideBarClose } from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetImages } from '../../images/api/use-get-images'
import { AlertTriangle, Loader } from 'lucide-react'

interface ImageSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {


  const {data,isLoading,isError}= useGetImages();

  const onClose = () => {
    onChangeActiveTool('select')
  }


  return (
    <aside
      className={cn(
        'bg-white relative flex flex-col h-full w-[360px] border-r z-[40]',
        activeTool === 'images' ? 'visible' : 'hidden'
      )}
    >
      <ToolSideBarHeader title="Font" description="add Images to canvas" />
      {
        isLoading&&(
        <div className='flex items-center justify-center flex-1'>
          <Loader className='size-4 text-muted-foreground animate-spin'/>

        </div>
        )
      }
       {
        isError&&(
        <div className='flex flex-col gap-y-4 items-center justify-center flex-1'>
          <AlertTriangle className='size-4 text-muted-foreground'/>
          <p className='text-muted-foreground text-xs'>failed to fetch images</p>

        </div>
        )
      }
      
      
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
        </div>
      </ScrollArea>

      <ToolSideBarClose onClick={onClose} />
    </aside>
  )
}
