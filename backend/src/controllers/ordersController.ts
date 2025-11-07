import { Response } from "express";
import Order from "../models/orders";
import { ORDER_STATUS } from "../helpers/constants";
import { AuthRequest } from "../middlewares/validateJWT";

interface RawOrderItem {
  productId?: string;
  _id?: string;
  id?: string;
  title: string;
  desc?: string;
  description?: string;
  img: string;
  price: number;
  quantity: number;
}

export const createOrder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { items = [], shippingDetails, shippingCost = 0 } = req.body;

  if (!req.uid) {
    res.status(401).json({ msg: "No se pudo identificar al usuario" });
    return;
  }

  if (!Array.isArray(items) || !items.length) {
    res.status(400).json({ msg: "Debes enviar al menos un producto" });
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

  const finalShipping = Number(shippingCost) || 0;
  const total = subtotal + finalShipping;

  const newOrder = new Order({
    user: req.uid,
    items: formattedItems,
    price: subtotal,
    shippingCost: finalShipping,
    total,
    shippingDetails,
    status: ORDER_STATUS.pending,
  });

  await newOrder.save();

  res.status(201).json({ data: newOrder, msg: "Orden creada con éxito" });
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

  res.json({ data: orders, msg: "Órdenes obtenidas con éxito" });
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
