import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function FormContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {children}
    </div>
  )
}

type FormInputProps = {
  label: string,
  description: string,
  errors: string[] | undefined
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export function FormInput({ label, inputProps, description, errors }: FormInputProps) {
  return (
    <>
      <Label htmlFor="name" className="text-right pt-2 text-sm font-medium">{label}</Label>
      <div className="col-span-3">
        <Input
          {...inputProps}
        />
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <p className="text-xs text-red-400">{errors}</p>
      </div>
    </>
  )
}

type FormDateProps = {
  label: string,
  description: string,
  errors: string[] | undefined
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export function FormDate({ label, description, errors, inputProps }: FormDateProps) {
  return (
    <>
      <Label htmlFor="name" className="text-right pt-2 text-sm font-medium">{label}</Label>
      <div className="col-span-3">
        <Input type="datetime-local" {...inputProps} />
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <p className="text-xs text-red-400">{errors}</p>
      </div>
    </>
  )
}

type FormTextAreaProps = {
  label: string,
  description: string,
  errors: string[] | undefined,
  inputProps?: React.InputHTMLAttributes<HTMLTextAreaElement>
}

export function FormTextArea({ label, inputProps, description, errors }: FormTextAreaProps) {
  return (
    <>
      <Label htmlFor="name" className="text-right pt-2 text-sm font-medium">{label}</Label>
      <div className="col-span-3">
        <Textarea
          {...inputProps}
        />
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <p className="text-sm text-red-400">{errors}</p>
      </div>
    </>
  )
}

