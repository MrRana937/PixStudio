"use client"

import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "../types";
import { rgbaObjectToString } from "../utils";

interface ColorPickerProps{
value:string,
onChange:(value:string)=>void
}


export const ColorPicker=({value,onChange}:ColorPickerProps)=>{

    return <div className="w-full space-y-4">
          <ChromePicker
          color={value}
          onChange={(color)=>{
            const formattedColor = rgbaObjectToString(color.rgb)
            onChange(formattedColor)
          }}
          className="rounded-lg border"
          />
          <CirclePicker
          color={value}
          onChangeComplete={(color)=>{
            const formattedColor=rgbaObjectToString(color.rgb);
            onChange(formattedColor);
          }}
          colors={colors}
          />
    </div>
}