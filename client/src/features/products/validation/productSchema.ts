import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('Nom requis'),
  description: yup.string().required('Description requise'),
  price: yup.number().positive('Prix invalide').required('Prix requis'),
  imageUrl: yup.string().url('URL invalide').required('Image requise'),
});

export type ProductSchema = yup.InferType<typeof productSchema>;
