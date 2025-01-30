import { Curriculum } from "@server/models/Curruculum";

// components/PreviewCV.tsx
export const PreviewCV = ({ formData }: { formData : Curriculum }) => {
    return (
      <div className="w-1/2 p-6 bg-gray-50 dark:bg-zinc-700 rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{formData.name}</h1>
          <div className="mt-2">
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
            <p>{formData.city}</p>
          </div>
        </div>
  
        {/* Educación */}
        {formData.education.length > 0 && (
          <Section title="Educación">
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{edu.institution}</h3>
                <p>{edu.degree}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </Section>
        )}
  
        {/* Experiencia */}
        {formData.experience.length > 0 && (
          <Section title="Experiencia">
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{exp.company}</h3>
                <p>{exp.position}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </Section>
        )}
  
        {/* Habilidades */}
        {formData.skills.length > 0 && (
          <Section title="Habilidades">
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    )
  }
  
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold border-b-2 border-amber-400 pb-2 mb-4">{title}</h2>
      {children}
    </div>
  )