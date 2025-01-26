import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { createCurriculum } from '../../api/manager'
import { CreateCurriculumValidationSchema } from '@server/models/Curruculum'

export const Route = createFileRoute('/_authenticated/create')({
  component: Create,
})

function Create() {
  const navigate = useNavigate()

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      education: [],
      experience: [],
      skills: [],
    },
    onSubmit: async ({ value }) => {
      const response = await createCurriculum({
        name: value.name,
        email: value.email,
        phone: value.phone,
        address: value.address,
        education: value.education,
        experience: value.experience,
        skills: value.skills,
      })

      console.log(response)

      navigate({ to: '/' })
    },
  })
  return (
    <section className='flex flex-col gap-4 p-4'>
      <form
      className='flex flex-col gap-4'
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className='flex flex-col gap-2'>
          <form.Field
            name="name"
            validators={{
              onChange: CreateCurriculumValidationSchema.shape.name,
            }}
            children={(field) => (
              <div className='flex flex-col gap-2'>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Title"
                />
                {field.state.meta.isTouched ? (
                  <em>{field.state.meta.errors}</em>
                ) : null}
              </div>
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
              <div className='flex flex-col gap-2'>
                <textarea
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Content"
                />
                {field.state.meta.isTouched ? (
                  <em>{field.state.meta.errors}</em>
                ) : null}
              </div>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button className='' type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Crear Nota'}
            </button>
          )}
        />
      </form>
    </section>
  )
}
