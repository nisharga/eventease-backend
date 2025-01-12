import { z } from "zod";


const userLoginValidation = z.object({
  body: z.object({
    name: z.string()
    
  }),
})