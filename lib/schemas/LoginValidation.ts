import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo válido')
    .required('El correo es requerido'),
  password: yup
    .string()
    .min(8, 'Debe contener al menos 8 caracteres')
    .required('La contraseña es requerida')
})