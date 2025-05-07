import * as yup from 'yup';


export const productSchema = yup.object().shape({
  name: yup.string()
    .required('Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne doit pas dépasser 100 caractères'),
  description: yup.string()
    .required('La description est requise')
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(1000, 'La description ne doit pas dépasser 1000 caractères'),
  price: yup.number()
    .positive('Le prix doit être positif')
    .required('Le prix est requis'),
  image: yup.string().default(''),
});

export type ProductSchema = yup.InferType<typeof productSchema>;
