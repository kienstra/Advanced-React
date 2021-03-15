import { useRouter } from 'next/router';
import PleaseSignIn from '../components/PleaseSignIn';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage() {
  const { query } = useRouter();

  return (
    <div>
      <PleaseSignIn>
        <UpdateProduct id={query.id} />
      </PleaseSignIn>
    </div>
  );
}
