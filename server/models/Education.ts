import { z } from "zod";

export interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }
  export const EducationValidationSchema = z.object({
    institution: z.string(),
    degree: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  });