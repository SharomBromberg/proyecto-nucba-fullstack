import * as Yup from "yup";
import { regEmail } from "../utils/regExp";

export const checkoutValidationSchema = Yup.object({
  name: Yup.string().required("Campo requerido"),
  cellphone: Yup.string().required("Campo requerido"),
  location: Yup.string().required("Campo requerido"),
  address: Yup.string().required("Campo requerido"),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Campo requerido"),
  email: Yup.string()
    .matches(regEmail, "Email no valido")
    .required("Campo requerido"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo requerido"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(regEmail, 'Email no valido')
    .required('Campo requerido'),
})

export const verifyValidationSchema = Yup.object({
  email: Yup.string()
    .matches(regEmail, 'Email no valido')
    .required('Campo requerido'),
  code: Yup.string()
    .min(4, 'Mínimo 4 caracteres')
    .max(6, 'Máximo 6 caracteres')
    .required('Campo requerido'),
})
