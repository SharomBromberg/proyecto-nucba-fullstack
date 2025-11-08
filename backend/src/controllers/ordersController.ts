import { Response } from "express";
import Order from "../models/orders";
import User from "../models/users";
import { ORDER_STATUS } from "../helpers/constants";
import { AuthRequest } from "../middlewares/validateJWT";
import { sendOrderConfirmationEmail } from "../mailer/mailer";

interface RawOrderItem {
  productId?: string
  _id?: string
  id?: string
  title: string
  desc?: string
  description?: string
  img: string
  price: number
  quantity: number
}

const FREE_SHIPPING_THRESHOLD = 500000;
const SHIPPING_FEE = 20000;

const computeShippingCost = (subtotal: number): number =>
  subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

export const createOrder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { items = [], shippingDetails } = req.body;

  if (!req.uid) {
    res.status(401).json({ msg: "No se pudo identificar al usuario" });
    return;
  }

  if (!Array.isArray(items) || !items.length) {
    res.status(400).json({ msg: "Debes enviar al menos un producto" });
    return;
  }

  const user = await User.findById(req.uid);

  if (!user) {
    res.status(404).json({ msg: "El usuario no existe" });
    return;
  }

  if (!user.verified) {
    res
      .status(403)
      .json({ msg: "Debes verificar tu cuenta antes de generar una orden" });
    return;
  }

  const formattedItems = items.map((item: RawOrderItem) => ({
    productId: item.productId ?? item._id ?? item.id,
    title: item.title,
    description: item.desc ?? item.description ?? "",
    img: item.img,
    price: item.price,
    quantity: item.quantity,
  }));

  const subtotal = formattedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const appliedShippingCost = computeShippingCost(subtotal);
  const total = subtotal + appliedShippingCost;

  const newOrder = new Order({
    user: req.uid,
    items: formattedItems,
    price: subtotal,
    shippingCost: appliedShippingCost,
    total,
    shippingDetails,
    status: ORDER_STATUS.pending,
  });

  await newOrder.save();

  if (user.email) {
    try {
      await sendOrderConfirmationEmail(user.email, {
        orderId: newOrder.id,
        subtotal,
        shippingCost: appliedShippingCost,
        total,
        items: formattedItems.map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      });
    } catch (error) {
      console.error("No se pudo enviar el correo de confirmacion", error);
    }
  }

  res.status(201).json({ data: newOrder, msg: "Orden creada con exito" });
};

export const getOrders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.uid) {
    res.status(401).json({ msg: "No se pudo identificar al usuario" });
    return;
  }

  const orders = await Order.find({ user: req.uid }).sort({ createdAt: -1 });

  res.json({ data: orders, msg: "Ordenes obtenidas con exito" });
};

export const getOrderById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.uid) {
    res.status(401).json({ msg: "No se pudo identificar al usuario" });
    return;
  }

  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId, user: req.uid });

  if (!order) {
    res.status(404).json({ msg: "La orden no existe" });
    return;
  }

  res.json({ data: order, msg: "Orden encontrada" });
};
