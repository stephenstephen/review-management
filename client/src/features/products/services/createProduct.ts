import { gql } from 'graphql-request';
import graphqlClient from '@/lib/graphqlClient';
import { CreateProductInput, Product } from '@/features/products/types/product';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      description
      price
      image
      averageRating
      createdAt
      updatedAt
    }
  }
`;

export const createProduct = async (input: CreateProductInput) => {
  const response = await graphqlClient.request<{ createProduct: Product }>(CREATE_PRODUCT_MUTATION, {
    createProductInput: input
  });
  return response.createProduct;
};
