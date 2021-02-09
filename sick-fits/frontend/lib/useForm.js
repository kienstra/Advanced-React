import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setForm] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      value[0] = e.target.files;
    }

    setForm({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setForm(initial);
  }

  function clearForm() {
    const blankState = Object.keys(inputs).reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: undefined,
      }),
      {}
    );

    setForm(blankState);
  }

  return { clearForm, handleChange, inputs,  resetForm };
}
