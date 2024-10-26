import { z } from "zod";

export const createFantasyTeamSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters." }),
  league: z.string(),
  season: z.string(),
});
