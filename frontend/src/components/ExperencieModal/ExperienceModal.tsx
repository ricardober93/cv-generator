import { Experience } from "@server/models/Experencie";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

export function ExperienceModal({ initialData, onSubmit, onClose }: { initialData?: Experience; onSubmit: (data: Experience) => void; onClose: () => void }) {
    const form = useForm({
      validatorAdapter: zodValidator(),
      defaultValues: initialData || {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      onSubmit: async ({ value }) => {
        onSubmit(value);
      },
    });
  
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{initialData ? "Editar Experiencia" : "Nueva Experiencia"}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
  
        <form.Field name="company">
          {(field) => (
            <div>
              <label>Empresa</label>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 border rounded"
              />
              {field.state.meta.errors.length > 0 && <em className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</em>}
            </div>
          )}
        </form.Field>
  
        <form.Field name="position">
          {(field) => (
            <div>
              <label>Cargo</label>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 border rounded"
              />
              {field.state.meta.errors.length > 0 && <em className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</em>}
            </div>
          )}
        </form.Field>
  
        <div className="grid grid-cols-2 gap-4">
          <form.Field name="startDate">
            {(field) => (
              <div>
                <label>Fecha de inicio</label>
                <input
                  type="date"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {field.state.meta.errors.length > 0 && <em className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</em>}
              </div>
            )}
          </form.Field>
  
          <form.Field name="endDate">
            {(field) => (
              <div>
                <label>Fecha de fin</label>
                <input
                  type="date"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {field.state.meta.errors.length > 0 && <em className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</em>}
              </div>
            )}
          </form.Field>
        </div>
  
        <form.Field name="description">
          {(field) => (
            <div>
              <label>Descripción</label>
              <textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 border rounded h-24"
              />
            </div>
          )}
        </form.Field>
  
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {initialData ? "Guardar Cambios" : "Agregar Experiencia"}
          </button>
        </div>
      </form>
    );
  }
  