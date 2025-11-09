const resolveId = (item = {}) => {
  const { id, _id } = item;
  const candidate = id ?? _id;
  return candidate ? String(candidate) : "";
};

export const addItemToCart = (cartItems = [], product = {}) => {
  const normalizedId = resolveId(product);

  if (!normalizedId) {
    return cartItems;
  }

  const productInCart = cartItems.find(
    (item) => resolveId(item) === normalizedId
  );

  if (productInCart) {
    return cartItems.map((item) =>
      resolveId(item) === normalizedId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...product, id: normalizedId, quantity: 1 }];
};

export const removeItemFromCart = (cartItems = [], rawId) => {
  const normalizedId = rawId ? String(rawId) : "";
  const productToRemove = cartItems.find(
    (item) => resolveId(item) === normalizedId
  );

  if (!productToRemove) {
    return cartItems;
  }

  if (productToRemove.quantity > 1) {
    return cartItems.map((item) =>
      resolveId(item) === normalizedId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }

  return cartItems.filter((item) => resolveId(item) !== normalizedId);
};
