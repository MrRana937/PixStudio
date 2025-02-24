import { RGBColor } from "react-color";

export function isTextType(type:string|undefined){
 
    //for all thes we have to differnt options for example 
    //inside changestrokecolor if the selected object is acutally a text we cannot change stroke becuase 
  //text dont have stroke we to use fill in that case 
    return type==="text" || type==="i-text" ||type==="textbox";
} 

export function rgbaObjectToString(rgba:RGBColor| "transparent"){
 if(rgba=="transparent")
  return `rgba(0,0,0,0)`;

 const alpha = rgba.a===undefined?1:rgba.a;

 return  `rgba(${rgba.r},${rgba.g},${rgba.b},${alpha})`
}
