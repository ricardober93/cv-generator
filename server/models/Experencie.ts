import { z } from "zod";

export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }

  export const ExperienceValidationSchema = z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  });