import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@one-ui/styled-system/css'
import { HStack } from '@one-ui/styled-system/jsx'
import { ArrowLeft } from 'lucide-react'
import * as z from 'zod'

import { useForm } from '@redwoodjs/forms'
import { routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { Button } from '../ui/button'

import { Link } from '@/ui/anchor'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { Toaster, toast } from '@/ui/toaster'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please give a valid email address.',
  }),
})

export const ForgotPasswordForm = () => {
  // 0. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  // 1. Set focus to email field.
  const { setFocus } = form
  React.useEffect(() => {
    setFocus('email')
  }, [setFocus])

  // 2. Define a submit handler.
  const { forgotPassword } = useAuth()
  const onSubmit = async (data: { email: string }) => {
    await forgotPassword(data.email).then(() => {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      // For the security reasons, don't let user know whether the user exists or not.
      toast.success('A link to reset your password was sent to ' + data.email)
      form.reset({ email: '' })
    })
  }

  return (
    <>
      <Toaster />
      <Form
        onSubmit={onSubmit}
        formMethods={form}
        className={css({ spaceY: '8' })}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem w="full" fontWeight="thin">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" h="8" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <HStack
          justify="space-between"
          mt="lg"
          className={css({
            base: {
              flexDir: 'column-reverse',
            },
            sm: {
              flexDir: 'row',
            },
          })}
        >
          <Link
            to={routes.login()}
            display="flex"
            alignItems="center"
            fontSize="sm"
            textDecoration="none"
            flexDir="row"
          >
            <ArrowLeft
              className={css({ width: '3', height: '3', mr: '1.5' })}
            />
            Back to the login page
          </Link>
          <Button type="submit" h="8" px="3">
            Reset password
          </Button>
        </HStack>
      </Form>
    </>
  )
}
