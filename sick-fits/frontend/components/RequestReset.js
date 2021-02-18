import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import useForm from '../lib/useForm';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signUp, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await signUp().catch((error) => console.log(error));
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a password reset</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null ? (
          <p>Success! Check your email for a link.</p>
        ) : null}
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset password</button>
      </fieldset>
    </Form>
  );
}
