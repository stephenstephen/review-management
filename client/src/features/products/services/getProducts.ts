import apiClient from '@/lib/apiClient';
import { gql } from 'graphql-request';
import { Product } from '@/features/products/types/product';

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
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

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiClient.post<{ data: { products: Product[] } }>('/graphql', {
    query: PRODUCTS_QUERY
  });
  return response.data.data.products;
};
