"use client"
import Link from "next/link";
import Image from "next/image";

export const Logo=()=>{
return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
        src="/logo.svg"
        fill                //will fill the parent size=8  h-8 w-8  
        alt="image ai"
        className="shrink-0 hover:opacity-75"
        />
      </div>
    </Link>
)
}