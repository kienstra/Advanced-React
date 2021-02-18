export default function calcTotalPrice(cart) {
  return cart.reduce(
    (accumulator, cartItem) =>
      cartItem.product
        ? accumulator + cartItem.product.price * cartItem.quantity
        : accumulator,
    0
  );
}
