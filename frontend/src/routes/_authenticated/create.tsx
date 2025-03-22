import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Curriculum } from "@server/models/Curruculum";
import { ChangeEvent, useState } from "react";
import { Experience } from "@server/models/Experencie";
import { PreviewCV } from "@components/PreviewCV/PreviewCV";
import { useStore } from "@tanstack/react-store";
import { store } from "@/store/curriculum.store";
import { ExperienceModal } from "@/components/ExperencieModal/ExperienceModal";
import { EducationModal } from "@/components/EducationModal/EducationModal";
import { Education } from "@server/models/Education";
import { SkillModal } from "@/components/SkillsModal/SkillsModal";
import { LuTrash } from "react-icons/lu";
import { createCurriculum } from "@/api/manager";

export const Route = createFileRoute("/_authenticated/create")({
  component: Create,
  beforeLoad: async () => {
    store.setState(() => ({
      name: "",
      email: "",
      phone: "",
      profile: "",
      city: "",
      education: [] as Education[],
      experience: [] as Experience[],
      skills: [] as string[],
    }))
  },
});

function Create() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEducationOpen, setEducationModal] = useState(false);
  const [isSkillOpen, setSkillOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const state = useStore(store, (state) => state);

  const handleExperienceSubmit = (experience: Experience) => {
    const idx = state.experience.findIndex(
      (_, index) => index === editingIndex
    );

    if (idx !== -1) {
      const newExperiences = [...state.experience];
      newExperiences[idx] = experience;

      store.setState((state) => {
        return {
          ...state,
          experience: newExperiences,
        };
      });
    } else {
      store.setState((state) => {
        return {
          ...state,
          experience: [...state.experience, experience],
        };
      });
    }

    closeModalExperience();
  };

  const handleEducationSubmit = (education: Education) => {
    const idx = state.education.findIndex((_, index) => index === editingIndex);

    if (idx !== -1) {
      const newExperiences = [...state.education];
      newExperiences[idx] = education;

      store.setState((state) => {
        return {
          ...state,
          education: newExperiences,
        };
      });
    } else {
      store.setState((state) => {
        return {
          ...state,
          education: [...state.education, education],
        };
      });
    }

    closeModalEducation();
  };

  const handleSkillSubmit = ({ skill }: { skill: string }) => {
    const idx = state.skills.findIndex((s) => s === skill);

    if (idx !== -1) {
      const newSkill = [...state.skills];
      newSkill[idx] = skill;

      store.setState((state) => {
        return {
          ...state,
          skills: newSkill,
        };
      });
    } else {
      store.setState((state) => {
        return {
          ...state,
          skills: [...state.skills, skill],
        };
      });
    }

    closeModalSkills();
  };

  const openModalExperience = (index?: number) => {
    setEditingIndex(index ?? null);
    setIsModalOpen(true);
  };

  const openModalEducation = (index?: number) => {
    setEditingIndex(index ?? null);
    setEducationModal(true);
  };

  const openModalSkills = (index?: number) => {
    setEditingIndex(index ?? null);
    setSkillOpen(true);
  };

  const closeModalExperience = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const closeModalEducation = () => {
    setEducationModal(false);
    setEditingIndex(null);
  };

  const closeModalSkills = () => {
    setSkillOpen(false);
    setEditingIndex(null);
  };

  const updateStateInputs = (e: ChangeEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    store.setState((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const deleteExperience = (company: string) => {
    const oldState = state.experience;
    const newState = oldState.filter((exp) => exp.company !== company);

    store.setState((state) => {
      return {
        ...state,
        experience: [...newState],
      };
    });
  };

  const deleteEducation = (degree: string) => {
    const oldState = state.education;
    const newState = oldState.filter((exp) => exp.degree !== degree);

    store.setState((state) => {
      return {
        ...state,
        education: [...newState],
      };
    });
  };

  const deleteSkill = (skill: string) => {
    const newState = state.skills.filter((s) => s !== skill);
    store.setState((state) => {
      return {
        ...state,
        skills: [...newState],
      };
    });
  };

  const handleSaveCV = async () => {
    console.log(state);
    setIsLoading(true);
    await createCurriculum({
      name: state.name,
      email: state.email,
      phone: state.phone,
      profile: state.profile,
      city: state.city,
      education: state.education,
      experience: state.experience,
      skills: state.skills,
    });

    setIsLoading(false);

    navigate({
      to: "/",
    });
  };

  return (
    <section className="grid grid-cols-3 justify-center h-full gap-4 px-2 py-4 mx-auto">
  <div className="py-4 max-h-full overflow-scroll ">
        <h2 className="text-2xl font-bold text-left text-pretty dark:text-gray-50">
          {" "}
          Ingresa tu informacion para la hoja de vida{" "}
        </h2>
        <section className=" flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="relative block rounded-md border  bg-white dark:bg-gray-800 border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2"
            >
              <input
                name="name"
                onChange={(e) => updateStateInputs(e)}
                className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="name"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs bg-white dark:bg-gray-800 dark:text-gray-50 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Name
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="email"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2"
            >
              <input
                name="email"
                onChange={(e) => updateStateInputs(e)}
                className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="email"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs dark:text-gray-50 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Email
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2"
            >
              <input
                name="phone"
                onChange={(e) => updateStateInputs(e)}
                className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="phone"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs dark:text-gray-50 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Phone
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="city"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2"
            >
              <input
                name="city"
                onChange={(e) => updateStateInputs(e)}
                className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="city"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs dark:text-gray-50 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                City
              </span>
            </label>
          </div>

          <div>
            <span className="pointer-events-none  p-0.5 text-xs dark:text-gray-50 text-gray-700 transition-all ">
              Profile
            </span>
            <label
              htmlFor="profile"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2"
            >
              <textarea
                name="profile"
                onChange={(e) => updateStateInputs(e)}
                className="w-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="profile"
                rows={4}
              />
            </label>
          </div>

          {/* Sección de Experiencias */}
          <div className="space-y-4 mt-2 border-t border-gray-400">
            <div className="flex justify-between items-center pt-2">
              <h2 className="text-2xl font-bold">Experiencias Laborales</h2>
              <button
                type="button"
                onClick={() => openModalExperience()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
              >
                + Agregar Experiencia
              </button>
            </div>

            {state.experience.map((exp: Experience, index: number) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.company}</h3>
                    <p className="text-gray-600">{exp.position}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openModalExperience(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEducation(exp.company)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Sección de Education */}
          <div className="space-y-4 mt-2 border-t border-gray-400">
            <div className="flex justify-between items-center pt-2">
              <h2 className="text-2xl font-bold">Educacion</h2>
              <button
                type="button"
                onClick={() => openModalEducation()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
              >
                + Agregar Educacion
              </button>
            </div>

            {state.education.map((exp: Education, index: number) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.degree}</h3>
                    <p className="text-gray-600">{exp.institution}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openModalEducation(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteExperience(exp.degree)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 mt-2 border-t border-gray-400">
            <div className="flex justify-between items-center pt-2">
              <h2 className="text-2xl font-bold">Habilidades</h2>
              <button
                type="button"
                onClick={() => openModalSkills()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
              >
                + Agregar Habilidades
              </button>
            </div>

            <div className="flex items-center gap-1 p-4 rounded-lg">
              {state.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="flex items-center justify-center gap-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-100 px-3 py-1 rounded-full text-sm"
                >
                  <span
                    className="px-2 py-1 cursor-pointer"
                    onClick={() => openModalSkills(index)}
                  >
                    {skill}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteSkill(skill)}
                    className="text-red-600 hover:text-red-800 px-2 py-1 rounded cursor-pointer"
                  >
                    <LuTrash className="w-3 h-3 " />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            className="inline-block rounded border border-amber-500 px-12 py-3 text-sm font-medium text-amber-600 hover:bg-amber-500 hover:text-white focus:outline-none focus:ring active:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-gray-300"
            type="button"
            disabled={isLoading}
            onClick={handleSaveCV}
          >
            Actualizar
          </button>
        </section>
        {/* Modal para Experiencias */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <ExperienceModal
                initialData={
                  editingIndex !== null
                    ? state.experience[editingIndex]
                    : undefined
                }
                onSubmit={handleExperienceSubmit}
                onClose={closeModalExperience}
              />
            </div>
          </div>
        )}

        {/* Modal para Education */}
        {isEducationOpen && (
          <div className="fixed inset-0  z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <EducationModal
                initialData={
                  editingIndex !== null
                    ? state.education[editingIndex]
                    : undefined
                }
                onSubmit={handleEducationSubmit}
                onClose={closeModalEducation}
              />
            </div>
          </div>
        )}

        {isSkillOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <SkillModal
                initialData={
                  editingIndex !== null
                    ? { skill: state.skills[editingIndex] }
                    : undefined
                }
                onSubmit={handleSkillSubmit}
                onClose={closeModalSkills}
              />
            </div>
          </div>
        )}
      </div>

      <PreviewCV formData={state as Curriculum} />
    </section>
  );
}
