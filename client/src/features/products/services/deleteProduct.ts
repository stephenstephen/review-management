import { gql } from 'graphql-request';
import graphqlClient from '@/lib/graphqlClient';

const DELETE_PRODUCT_MUTATION = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id)
  }
`;

export const deleteProduct = async (id: string): Promise<void> => {
  await graphqlClient.request(DELETE_PRODUCT_MUTATION, { id: parseInt(id) });
};