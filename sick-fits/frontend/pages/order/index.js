import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      items {
        id
        name
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function OrderPage() {
  const { query } = useRouter();
  const orderId = query.id;
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: orderId },
  });

  if (loading) {
    return null;
  }

  return error ? (
    <p>There was an error: {error.message}</p>
  ) : (
    <div>
      <h2>Success!</h2>
      <p>Thanks for your purchase!</p>
      Here is your order:
      <ul>
        {data?.Order.items.map((item) => (
          <li key={item.id}>
            {item.name} ({item.quantity})
            <img
              width="100"
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
