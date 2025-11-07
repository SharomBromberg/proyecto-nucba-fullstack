import User from "../models/users";
import Product from "../models/products";

export const emailAvailable = async (email = ""): Promise<void> => {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("El email es obligatorio");
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser && existingUser.verified) {
    throw new Error(`El correo ${normalizedEmail} ya está registrado`);
  }

  if (existingUser && !existingUser.verified) {
    throw new Error(
      "El usuario ya está registrado, revisa tu correo para validar la cuenta"
    );
  }
};

export const productIdExists = async (id: string): Promise<void> => {
  if (!id) return;

  const product = await Product.findById(id);

  if (!product) {
    throw new Error("El producto indicado no existe");
  }
};
