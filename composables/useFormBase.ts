import { useMutation } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

interface Options {
  validationSchema: any
  initialValues: any
  apiRepository: any
  updateMethod: string
  createMethod: string
  redirect: string
  action: 'create' | 'update'
  title: string
}

export default function useFormBase(options: Options) {
  const route = useRoute()
  const id = route.params.id

  const { toast } = useToast()

  const { handleSubmit, setErrors } = useForm({
    validationSchema: options.validationSchema,
    initialValues: options.initialValues,
  })

  const { isPending, mutate } = useMutation({
    mutationFn: (body: any) => options.action === 'create' ? options.apiRepository[options.createMethod](body) : options.apiRepository[options.updateMethod](id, body),
    onError(error) {
      const err = useApiError(error)
      setErrors(err.bag)
    },
    onSuccess() {
      toast({
        title: `${options.title} successfully ${options.action === 'create' ? 'created' : 'updated'}`,
      })

      navigateTo(options.redirect)
    },
  })

  const onSubmit = handleSubmit((values) => {
    mutate(values)
  })

  return {
    handleSubmit,
    setErrors,
    isPending,
    mutate,
    onSubmit,
  }
}
