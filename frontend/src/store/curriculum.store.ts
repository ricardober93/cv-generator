import { Education } from "@server/models/Education";
import { Experience } from "@server/models/Experencie";
import { Store } from "@tanstack/store";

export const store = new Store({
    name: "",
    email: "",
    phone: "",
    city: "",
    education: [] as Education[],
    experience: [] as Experience[],
    skills: [] as string[],
  });
  