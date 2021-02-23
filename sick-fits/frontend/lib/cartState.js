import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCartOpen() {
    setCartOpen(!cartOpen);
  }

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  return (
    <LocalStateProvider
      value={{
        cartOpen,
        toggleCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const context = useContext(LocalStateContext);
  if (context === null) {
    throw new Error(`Please calll useCart() from within <CartStateProvider>`);
  }

  return context;
}

export { CartStateProvider, useCart };
