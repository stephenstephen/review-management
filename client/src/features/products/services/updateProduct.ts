import { gql } from 'graphql-request';
import graphqlClient from '@/lib/graphqlClient';
import { Product, UpdateProductInput } from '@/features/products/types/product';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: Int!, $updateProductInput: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $updateProductInput) {
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

export const updateProduct = async (id: string, input: UpdateProductInput): Promise<Product> => {
  const { updateProduct } = await graphqlClient.request<{ updateProduct: Product }>(
    UPDATE_PRODUCT_MUTATION,
    { id: parseInt(id), updateProductInput: input }
  );
  return updateProduct;
};
