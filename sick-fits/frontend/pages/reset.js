import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage() {
  const router = useRouter();

  if (!router?.query?.token) {
    return (
      <div>
        Sorry, must supply a token
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={router?.query?.token}/>
    </div>
  );
}
