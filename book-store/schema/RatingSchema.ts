import { z } from "zod";
export const createRatingSchema = z.object({
  book_id: z.number(),
  author_id: z.number(),
  // rating: z.float64(),
  rating: z
    .number()
    .min(0, "Rating must be greater than 0")
    .max(10, "Rating must be less than or equal to 10"),
});

export type CreateRating = z.infer<typeof createRatingSchema>;
