import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className='container mx-auto p-4'>
      <section className='flex flex-col'>
        <h1 className='text-2xl font-bold'>About Me</h1>
        
        <div className='flex flex-col text-center gap-2'>
          <img 
            src="/ribermudez.jpg"
            alt="Ricardo Bermudez"
            className='rounded-full w-32 h-32 object-cover m-auto'
          />
          <h2 className='font-mediem text-xl'>Ricardo Bermudez</h2>
          <p className='bg-gray-600 font-italic'>Web Developer | React Enthusiast | Coffee Lover</p>
        </div>
        
        <div>
          <h3 className='text-md'>Biography</h3>
          <p className='text-sm py-2'>
            Hello! I'm a passionate web developer with 7+ years of experience in building
            modern web applications. I specialize in React and TypeScript, and I love
            creating intuitive user interfaces that solve real-world problems.
          </p>
        </div>
        
        <div>
        <h3 className='text-md'>Skills</h3>
          <section className='flex wrap p-0 my-2'>
            {['React', 'TypeScript', 'HTML/CSS', 'Node.js', 'Git'].map((skill) => (
              <li 
              className='text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-full mr-2 mb-2'
                key={skill} 
              >
                {skill}
              </li>
            ))}
          </section>
        </div>
        
        <div>
          <h3 className='text-md mb-2'>Get in Touch</h3>
          <p>Email: ribermudez@petalmail.com</p>
          <a href="https://www.linkedin.com/in/ricardotellez7/" className='text-blue-500'>LinkedIn: ricardotellez7</a>
          <a href="https://github.com/ricardober93" className='text-blue-500'>GitHub: ricardober93</a>
        </div>
      </section>
    </div>
  )
}
