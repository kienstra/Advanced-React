import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    name: 'Nice shoes',
    price: 12321,
    description: 'There are the best shoes',
  });

  return (
    <form>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        <input
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
