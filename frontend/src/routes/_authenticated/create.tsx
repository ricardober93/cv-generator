import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { createCurriculum } from "../../api/manager";
import { CreateCurriculumValidationSchema } from "@server/models/Curruculum";
import { useState } from "react";
import { Experience } from "@server/models/Experencie";
import { Education } from "@server/models/Education";

export const Route = createFileRoute("/_authenticated/create")({
  component: Create,
});



function Create() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  //const navigate = useNavigate();

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      education: [] as Education[],
      experience: [] as Experience[],
      skills: [] as string[],
    },
    defaultState: {
     values:{
      education: educations,
      experience: experiences,
      skills: [],
     }
    },
    onSubmit: async ({ value }) => {
      // const response = await createCurriculum({
      //   name: value.name,
      //   email: value.email,
      //   phone: value.phone,
      //   address: value.address,
      //   education: value.education,
      //   experience: value.experience,
      //   skills: value.skills,
      // });

      console.log(value);

      // navigate({ to: "/" });
    },
  });
  return (
    <section className="flex h-dvh gap-4 p-6">
      <form
        className="w-1/2 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
        <div className="flex flex-col gap-2">
          <form.Field
            name="name"
            validators={{
              onChange: CreateCurriculumValidationSchema.shape.name,
            }}
            children={(field) => (
              <label
                htmlFor="name"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2">
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="name"
                />
                {field.state.meta.isTouched ? <em>{field.state.meta.errors}</em> : null}

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Name</span>
              </label>
            )}
          />
        </div>

        <div>
          <form.Field
            name="email"
            validators={{
              onChange: CreateCurriculumValidationSchema.shape.email,
            }}
            children={(field) => (
              <label
                htmlFor="email"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2">
                <input
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="email"
                />
                {field.state.meta.isTouched ? <em className="text-red-500">{field.state.meta.errors}</em> : null}

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Email</span>
              </label>
            )}
          />
        </div>
        <div>
          <form.Field
            name="phone"
            validators={{
              onChange: CreateCurriculumValidationSchema.shape.phone,
            }}
            children={(field) => (
              <label
                htmlFor="phone"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2">
                <input
                  type="tel"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="phone"
                />
                {field.state.meta.isTouched ? <em className="text-red-500">{field.state.meta.errors}</em> : null}

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Phone</span>
              </label>
            )}
          />
        </div>
        <div>
          <form.Field
            name="city"
            validators={{
              onChange: CreateCurriculumValidationSchema.shape.city,
            }}
            children={(field) => (
              <label
                htmlFor="phone"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2">
                <input
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="city"
                />
                {field.state.meta.isTouched ? <em className="text-red-500">{field.state.meta.errors}</em> : null}

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">City</span>
              </label>
            )}
          />
        </div>
        
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
            className="inline-block rounded border border-amber-500 px-12 py-3 text-sm font-medium text-amber-600 hover:bg-amber-500 hover:text-white focus:outline-none focus:ring active:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-gray-300"
              type="submit"
              disabled={!canSubmit}>
              {isSubmitting ? "..." : "Crear Nota"}
            </button>
          )}
        />
      </form>
    </section>
  );
}
