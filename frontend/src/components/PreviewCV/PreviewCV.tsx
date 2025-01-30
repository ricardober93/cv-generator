import { Curriculum } from "@server/models/Curruculum";

// components/PreviewCV.tsx
export const PreviewCV = ({ formData }: { formData : Curriculum }) => {
    return (
   <section className="w-full flex-1 col-span-2 bg-gray-200 rounded-lg  p-6">
        <div className="h-full p-6 bg-gray-50 shadow dark:bg-zinc-700 rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{formData.name ? formData.name : "Nombre completo"}</h1>
          <div className="mt-2">
            <p>{formData.email ? formData.email : "example@mail.com"}</p>
            <p>{formData.phone ? formData.phone : "xxx-xxx-xxx"}</p>
            <p>{formData.city ? formData.city : "ciudad" }</p>
          </div>
        </div>

         {/* Experiencia */}
         <Section title="Experiencia">
        {formData.experience.length > 0 && (
            formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{exp.company}</h3>
                <p>{exp.position}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="mt-2">{exp.description}</p>
                </div>
              ))
            )}
            </Section>
            
  
        {/* Educación */}
        <Section title="Educación">
        {formData.education.length > 0 && (
            formData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{edu.institution}</h3>
                <p>{edu.degree}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))
          )}
          </Section>
  
       
  
        {/* Habilidades */}
        <Section title="Habilidades">
        {formData.skills.length > 0 && (
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
        )}
        </Section>
      </div>
   </section>
    )
  }
  
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold border-b-2 border-amber-400 pb-2 mb-4">{title}</h2>
      {children}
    </div>
  )