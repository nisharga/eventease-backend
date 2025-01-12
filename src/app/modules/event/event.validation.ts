import { z } from "zod";
 
const eventValidationSchema = z.object({
    body: z.object({
      name: z
        .string({ invalid_type_error: "Name must be a string" })
        .min(2, { message: "Name must be at least 2 characters" }),
      date: z
        .string()
        .min(2, { message: "Date must be at least 2 characters" }),
      location: z
        .string()
        .min(2, { message: "Location must be at least 2 characters" }),
      maxAttendees: z
        .number({ invalid_type_error: "Max attendees must be a number" })
        .min(5, { message: "Max attendees must be at least 5" })
        .max(25, { message: "Max attendees must be no more than 25" }),
      createdBy: z
        .string()
        .min(2, { message: "Organizer Name must be at least 2 characters" }),
      organizerEmail: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email address'),
    }).optional(),
  });

 
  export const EventValidations = {
    eventValidationSchema
  };  
