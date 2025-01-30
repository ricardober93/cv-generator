// components/InputField.tsx
import { FieldApi } from '@tanstack/react-form'
import { ZodTypeAny } from 'zod'

type InputFieldProps<TForm extends Record<string, unknown>> = {
  label: string
  name: keyof TForm | string
  type?: React.HTMLInputTypeAttribute
  field: FieldApi<TForm, any, any, any>
  validation?: ZodTypeAny
  className?: string
}

export const InputField = <TForm extends Record<string, unknown>>({
  label,
  name,
  type = 'text',
  field,
  className = ''
}: InputFieldProps<TForm>) => {
  return (
    <field.Field name={name} key={name as string}>
      {(field) => (
        <div className={`space-y-2 ${className}`}>
          <label htmlFor={name as string} className="block text-sm font-medium">
            {label}
          </label>
          <input
            type={type}
            id={name as string}
            name={name as string}
            value={field.state.value as string}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
          {field.state.meta.touchedErrors.length > 0 && (
            <em className="text-red-500 text-sm">
              {field.state.meta.touchedErrors.join(', ')}
            </em>
          )}
        </div>
      )}
    </field.Field>
  )
}