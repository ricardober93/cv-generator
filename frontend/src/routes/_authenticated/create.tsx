import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
//import { createCurriculum } from "../../api/manager";
import { Curriculum } from "@server/models/Curruculum";
import { ChangeEvent, useState } from "react";
import { Experience } from "@server/models/Experencie";
import { PreviewCV } from "@components/PreviewCV/PreviewCV";
import { useStore } from "@tanstack/react-store";
import { store } from "@/store/curriculum.store";
import { ExperienceModal } from "@/components/ExperencieModal/ExperienceModal";

export const Route = createFileRoute("/_authenticated/create")({
  component: Create,
});

function Create() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const state = useStore(store, (state) => state);

  //const navigate = useNavigate();

  const handleExperienceSubmit = (experience: Experience) => {
    const idx = state.experience.findIndex((_, index) => index === editingIndex);

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

  const openModalExperience = (index?: number) => {
    setEditingIndex(index ?? null);
    setIsModalOpen(true);
  };

  const closeModalExperience = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const updateStateInputs = (e: ChangeEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    console.log(name);

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
    console.log(oldState);
    console.log(newState);

    store.setState((state) => {
      return {
        ...state,
        experience: [...newState],
      };
    });
  };

  return (
    <section className="grid grid-cols-3 justify-center h-full gap-4 px-2 py-4 mx-auto">
      <div className="py-4">
        <h2 className="text-2xl font-bold text-left text-pretty dark:text-gray-50"> Ingresa tu informacion para la hoja de vida </h2>
        <section className=" flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="relative block rounded-md border  bg-white dark:bg-gray-800 border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2">
              <input
                name="name"
                onChange={(e) => updateStateInputs(e)}
                className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="name"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs bg-white dark:bg-gray-800 dark:text-gray-50 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Name</span>
            </label>
          </div>

          <div>
            <label
              htmlFor="email"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2">
              <input
                name="email"
                onChange={(e) => updateStateInputs(e)}
                className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="email"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs dark:text-gray-50 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Email</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2">
              <input
                name="phone"
                onChange={(e) => updateStateInputs(e)}
                className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="phone"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs dark:text-gray-50 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Phone</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="city"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 px-3 py-2">
              <input
                name="city"
                onChange={(e) => updateStateInputs(e)}
                className="w-[70%] peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="city"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs dark:text-gray-50 text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">City</span>
            </label>
          </div>

          {/* Sección de Experiencias */}
          <div className="space-y-4 mt-2 border-t border-gray-400">
            <div className="flex justify-between items-center pt-2">
              <h2 className="text-2xl font-bold">Experiencias Laborales</h2>
              <button
                type="button"
                onClick={() => openModalExperience()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                + Agregar Experiencia
              </button>
            </div>

            {state.experience.map((exp: Experience, index: number) => (
              <div
                key={index}
                className="border p-4 rounded-lg">
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
                      className="text-blue-600 hover:text-blue-800">
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteExperience(exp.company)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded">
                      Eliminar
                    </button>
                  </div>
                </div>
                {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>

          <div className="space-y-4 mt-2 border-t border-gray-400">
            <div className="flex justify-between items-center pt-2">
              <h2 className="text-2xl font-bold">Educacion</h2>
              <button
                type="button"
                onClick={() => openModalExperience()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                + Agregar Educacion
              </button>
            </div>
          </div>


          <div className="space-y-4 mt-2 border-t border-gray-400">
            <div className="flex justify-between items-center pt-2">
              <h2 className="text-2xl font-bold">Habilidades</h2>
              <button
                type="button"
                onClick={() => openModalExperience()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                + Agregar Habilidades
              </button>
            </div>
          </div>

          <button
            className="inline-block rounded border border-amber-500 px-12 py-3 text-sm font-medium text-amber-600 hover:bg-amber-500 hover:text-white focus:outline-none focus:ring active:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-gray-300"
            type="button">
            Actualizar
          </button>
        </section>

        {/* Modal para Experiencias */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <ExperienceModal
                initialData={editingIndex !== null ? state.experience[editingIndex] : undefined}
                onSubmit={handleExperienceSubmit}
                onClose={closeModalExperience}
              />
            </div>
          </div>
        )}
      </div>

      <PreviewCV formData={state as Curriculum} />
    </section>
  );
}
