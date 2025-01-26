import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { createNote } from '../../api/manager'
import { CreateNoteValidationSchema } from '../../../../server/models/note'

export const Route = createFileRoute('/_authenticated/create')({
  component: Create,
})

function Create() {
  const navigate = useNavigate()

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: '',
      content: '',
    },
    onSubmit: async ({ value }) => {
      const response = await createNote(value.title, value.content)

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
            name="title"
            validators={{
              onChange: CreateNoteValidationSchema.shape.title,
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
            name="content"
            validators={{
              onChange: CreateNoteValidationSchema.shape.content,
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
