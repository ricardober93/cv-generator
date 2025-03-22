import { Curriculum } from "@server/models/Curruculum";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas-pro';

// components/PreviewCV.tsx
export const PreviewCV = ({ formData }: { formData : Curriculum }) => {
    const handleDownload = async () => {
        const element = document.querySelector('.preview-cv') as HTMLElement;
        if (element) {
            const canvas = await html2canvas(element, { scale: 2, useCORS: true});
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            pdf.save('cv.pdf');
        }
    };

  return (
      
    <section className="w-full flex-1 col-span-2 bg-gray-200 rounded-lg p-6 relative">
        <button 
            onClick={handleDownload}
            className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-10"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Download CV</span>
        </button>

        <div className="h-full p-6 bg-gray-50 shadow dark:bg-zinc-700 rounded-lg preview-cv">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold">{formData.name ? formData.name : "Nombre completo"}</h1>
          <div className="mt-2">
            <p>{formData.email ? formData.email : "example@mail.com"}</p>
            <p>{formData.phone ? formData.phone : "xxx-xxx-xxx"}</p>
            <p>{formData.city ? formData.city : "ciudad" }</p>
          </div>
        </div>
          <Section title="Perfil">
            { formData.profile ? formData.profile : "ciudad"    }
          </Section>

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
