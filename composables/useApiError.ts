import { useToast } from '~/components/ui/toast'

export function useApiError(error: any) {
  const { toast } = useToast()
  const VALIDATION_ERROR_CODE = 422

  const isValidationError
        = error.response?.status === VALIDATION_ERROR_CODE

  const code = error.response?.status
  const bag: Record<string, string[]> = isValidationError
    ? error.response?._data.errors.reduce((acc: any, curr: any) => {
      acc[curr.path] = curr.msg
      return acc
    }, {})
    : error.response?._data.message || error.message

  if (error.response?._data.message) {
    toast({
      title: error.response?._data.message,
      description: 'There was a problem with your request.',
      variant: 'destructive',
    })
  }

  return {
    isValidationError,
    code,
    bag,
  }
}
