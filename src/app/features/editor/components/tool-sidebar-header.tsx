interface ToolSideBarProps{
title:string,
description?:string    
}

export const ToolSideBarHeader = ({
    title,
    description
}:ToolSideBarProps) => {
  return (
    <div className="p-4 border-b w-full space-y-1 h-[68px]">
        <p className="text-sm font-medium">
            {title}
        </p>
           {
            description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )
           }
        </div>
  )
}