import { Hono } from "hono";
import {z} from "zod"
import {zValidator} from "@hono/zod-validator"

const app= new Hono()
.get('/',(c)=>{
    return c.json({user:"get"})

})
.get('/:name',zValidator("param",z.object({
    name:z.number()
})),(c)=>{

    const params=c.req.valid("param");

    if(true)
        {
           return  c.json({error:"something went wrong "},401)
        }
        
    return c.json({username:params.name})
})


export default app