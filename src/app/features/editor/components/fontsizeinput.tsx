import { Minus,Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export interface FontSizeInputProps{
value:number,
onChange:(value:number)=>void
}


export const FontSizeInput=({
    value,
    onChange
}:FontSizeInputProps)=>{
return (
<div className="flex items-center ">

<Button
variant="outline"
className="p-2 rounded-r-none border-r-0"
size="icon"
>
 <Minus
 className="size-4"
 />   
</Button>
<Input
className="w-[50px] h-8  focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
/>
<Button
variant="outline"
size="icon"
className="p-2 rounded-l-none rounded-l-0"
>
<Plus className="size-4"/>
</Button>
</div>
)
}