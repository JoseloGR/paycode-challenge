import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik'
import { setCookie } from 'cookies-next'

import { LoginForm } from '@/lib/interfaces/LoginInterface'
import { LoginSchema } from '@/lib/schemas/LoginValidation'
import { URL_BASE } from '@/lib/consts/api'


export default function Login() {
  const [message, setMessage] = useState('')
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className='flex flex-col items-center justify-center'>
              <Image
                src="/paycode.png"
                alt="PayCode Logo"
                className="w-auto h-10"
                width={100}
                height={24}
                priority
              />
            </div>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={
                async (
                  values: LoginForm,
                  {setSubmitting}: FormikHelpers<LoginForm>
                ) => {
                  setMessage('')
                  try {
                    const res = await fetch(
                      `${URL_BASE}/login`,
                      {
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(values)
                      }
                    )
                    setSubmitting(false)

                    if (res.ok) {
                      const data = await res.json()
                      setCookie('session', data['token'], {maxAge: 60 * 60})
                      router.push('/dashboard')
                    } else {
                      setMessage('Ingrese credenciales válidas')
                    }
                  } catch (err) {
                    setMessage('Ha ocurrido un error con el servicio. Intente de nuevo por favor')
                  }
              }}
              validationSchema={LoginSchema}>
                {({errors, touched, isSubmitting, isValid}) => (
                  <Form className='space-y-4 md:space-y-6'>
                    <div 
                      hidden={!message} 
                      className="bg-red-200 border-l-4 border-red-400 p-3" 
                      role="alert">
                      <p className='font-bold text-red-700'>{message}</p>
                    </div>
                    <div>
                      <label 
                        htmlFor='email'
                        className='block mb-2 text-sm font-medium text-gray-900'>
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        placeholder="correo@empresa.com"
                        className='bg-slate-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-200 focus:border-slate-200 block w-full p-2.5'/>
                      <ErrorMessage 
                        name='email' 
                        render={msg => <div className='text-red-500 text-sm pt-1'>{msg}</div>}/>
                    </div>
                    <div>
                      <label 
                        htmlFor='password'
                        className='block mb-2 text-sm font-medium text-gray-900'>
                        Password
                      </label>
                      <Field 
                        id="password"
                        name="password"
                        type="password"
                        placeholder="superSecret"
                        className='bg-slate-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-200 focus:border-slate-200 block w-full p-2.5'/>
                      <ErrorMessage 
                        name='password'
                        render={msg => <div className='text-red-500 text-sm pt-1'>{msg}</div>}/>
                    </div>
                    <button
                      type='submit'
                      className='w-full text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-900 font-medium font-bold rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-500'
                      disabled={isSubmitting || !isValid}>
                      Login
                    </button>
                  </Form>
                )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}