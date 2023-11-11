import { FormRenderProps } from 'react-final-form'

export const canStepNextInWizard = <FormValues, InitialFormValues>({
    invalid,
    hasValidationErrors,
    submitting,
    validating,
}: FormRenderProps<FormValues, InitialFormValues>): boolean => !(
        invalid
    || hasValidationErrors
    || submitting
    || validating
    )
