import { z } from "zod";
 
const AttendeeValidationSchema = z.object({
    body: z.object({
      eventId: z
        .string({ invalid_type_error: "eventName must be a string" })
        .min(2, { message: "eventName must be at least 2 characters" }),
        attendeeName: z
        .string()
        .min(2, { message: "AttendeeName must be at least 2 characters" }),
        attendeePhone: z
        .string()
        .min(2, { message: "Attendee Phone must be at least 2 characters" }), 
        attendeeEmail: z.string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        }).email('Invalid email address').optional(),
    }),
  });

 
  export const AttendeeValidation = {
    AttendeeValidationSchema
  };  
