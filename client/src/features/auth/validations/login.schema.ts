import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string()
    .email("Email invalide")
    .required("Email requis"),
  password: yup.string()
    .min(6, "Au moins 6 caractères")
    .required("Mot de passe requis"),
});