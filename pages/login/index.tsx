import Image from 'next/image'

import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'

interface Login {
  email: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo válido')
    .required('El correo es requerido'),
  password: yup
    .string()
    .min(8, 'Debe contener al menos 8 caracteres')
    .required('La contraseña es requerida')
})

export default function Login() {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

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
                (
                  values: Login,
                  {setSubmitting}: FormikHelpers<Login>
                ) => {
                  console.log(values)
                  setSubmitting(false)
                  setMessage('Inicio de sesión exitoso')
                  setSubmitted(true)
              }}
              validationSchema={LoginSchema}>
                {({errors, touched, isSubmitting}) => (
                  <Form className='space-y-4 md:space-y-6'>
                    <div 
                      hidden={!submitted} 
                      className="bg-green-200 border-l-4 border-green-400 p-3" 
                      role="alert">
                      <p className='font-bold text-green-700'>{message}</p>
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
                      <ErrorMessage name='email'/>
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
                        placeholder="superSecret"
                        className='bg-slate-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-200 focus:border-slate-200 block w-full p-2.5'/>
                      <ErrorMessage name='password'/>
                    </div>
                    <button
                      type='submit'
                      className='w-full text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-900 font-medium font-bold rounded-lg text-sm px-5 py-2.5 text-center'
                      disabled={isSubmitting}>
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