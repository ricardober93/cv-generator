import { z } from "zod";
import { EducationValidationSchema, type Education } from "./Education";
import { ExperienceValidationSchema, type Experience } from "./Experencie";

export interface Curriculum {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

// Zod schema for Note validation
export const CurriculumValidationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  education: z.array(z.lazy(() => EducationValidationSchema)),
  experience: z.array(z.lazy(() => ExperienceValidationSchema)),
  skills: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateCurriculumValidationSchema = CurriculumValidationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type CreatCurriculumInput = z.infer<typeof CreateCurriculumValidationSchema>;
