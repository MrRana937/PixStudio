import { Hono } from "hono";
import {z} from "zod"
import {zValidator} from "@hono/zod-validator"

const app= new Hono()

app.get('/',(c)=>{
    return c.json({user:"get"})

})

app.get('/:name',zValidator("param",z.object({
    name:z.number()
})),(c)=>{

    const params=c.req.valid("param");
    return c.json({username:params.name})
})

export default app