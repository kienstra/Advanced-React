import styled from 'styled-components';
import { useUser } from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px sold var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({cartItem}) {
  const { product } = cartItem;
  if (!product) {
    return null;
  }

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)}
          </em>
          &nbsp;each
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  if (!user) {
    return <p>Cannot view cart when not signed in</p>
  }

  return (
    <CartStyles open>
      <header>
        <Supreme>{user.name}'s cart</Supreme>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
}
