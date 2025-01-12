import { z } from "zod";

    export const querySchema = z
      .object({
        searchTerm: z.string({ message: "Search term must be a string" }).optional(),
        limit: z
          .preprocess(
            (val) => (val !== undefined && val !== null ? Number(val) : undefined),
            z.number({ message: "Limit must be a number" }).int().positive().optional().default(10)
          ),
        page: z
          .preprocess(
            (val) => (val !== undefined && val !== null ? Number(val) : undefined),
            z.number({ message: "Page must be a number" }).int().positive().optional().default(1)
          ),
        sort: z.string().optional().default("createdAt"),
        fields: z.string().optional(),
      })
      .passthrough();
