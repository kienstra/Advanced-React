import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import useForm from '../lib/useForm';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signUp, { data, error }] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await signUp().catch((error) => console.log(error));
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign up for an account</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.createUser ? (
          <>
            <p>Signed up with {data.createUser.email}</p>
            <p>Please sign in</p>
          </>
        ) : (
          <>
            <label htmlFor="name">
              name
              <input
                type="name"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>
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
            <label htmlFor="password">
              password
              <input
                type="password"
                name="password"
                autoComplete="password"
                placeholder="Your password"
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Sign Up!</button>
          </>
        )}
      </fieldset>
    </Form>
  );
}
