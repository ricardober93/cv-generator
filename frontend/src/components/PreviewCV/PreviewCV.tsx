import { Curriculum } from "@server/models/Curruculum";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas-pro';
import { themes, useThemeStyles } from '@/hooks/useThemeStyles';

// components/PreviewCV.tsx
export const PreviewCV = ({ formData }: { formData : Curriculum }) => {
    const { setCurrentTheme, themeStyles } = useThemeStyles();
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
  
    
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className={`text-xl font-bold border-b-2 ${themeStyles.accent} pb-2 mb-4 ${themeStyles.headingFont}`}>{title}</h2>
    {children}
  </div>
)

  return (
      
    <section className="w-full flex-1  bg-gray-200 rounded-lg p-6 relative">
        <button 
            onClick={handleDownload}
            className="absolute top-4 left-16 transform -translate-x-1/2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-10"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>

        <div className={`absolute top-4 right-8 flex gap-2 z-20`}>
          {Object.keys(themes).map((theme) => (
            <button
              key={theme}
              onClick={() => setCurrentTheme(theme as keyof typeof themes)}
              className={`p-2 rounded-full shadow-lg transition-transform hover:scale-110 ${
                theme === 'default' ? 'bg-amber-500' :
                theme === 'modern' ? 'bg-blue-500' :
                theme === 'elegant' ? 'bg-emerald-500' :
                'bg-pink-500'
              } text-white`}
              title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" />
              </svg>
            </button>
          ))}
        </div>
        <div className={`h-full w-full p-6 ${themeStyles.background} shadow dark:bg-zinc-50 rounded-lg preview-cv ${themeStyles.fontFamily}`}>
        <div className="text-left mb-8">
          <h1 className={`text-3xl font-bold ${themeStyles.headingFont}`}>{formData.name ? formData.name : "Nombre completo"}</h1>
          <div className="mt-2">
            <p>{formData.email ? formData.email : "example@mail.com"}</p>
            <p>{formData.phone ? formData.phone : "xxx-xxx-xxx"}</p>
            <p>{formData.city ? formData.city : "ciudad" }</p>
          </div>
        </div>
          <Section title="Perfil">
            { formData.profile ? formData.profile : ""    }
          </Section>

         <Section title="Experiencia">
        {formData.experience.length > 0 && (
            formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className={`font-bold ${themeStyles.headingFont}`}>{exp.company}</h3>
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
                <h3 className={`font-bold ${themeStyles.headingFont}`}>{edu.institution}</h3>
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
                  className={`${themeStyles.skill} ${themeStyles.skillDark} px-3 py-1 rounded-full text-sm`}
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

