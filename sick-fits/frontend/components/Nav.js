import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Rrders</Link>
          <Link href="/account">Account</Link>
        </>
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}
    </NavStyles>
  );
}
