import { Model, Schema, Types, model } from "mongoose";
import { ORDER_STATUS, ORDER_STATUS_VALUES } from "../helpers/constants";

export interface IOrderItem {
  productId?: Types.ObjectId | string;
  title: string;
  description: string;
  img: string;
  price: number;
  quantity: number;
}

export interface IShippingDetails {
  name: string;
  cellphone: string;
  location: string;
  address: string;
}

export interface IOrder {
  user: Types.ObjectId;
  items: IOrderItem[];
  price: number;
  shippingCost: number;
  total: number;
  status: string;
  shippingDetails: IShippingDetails;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  img: {
    type: String,
    required: [true, "La imagen es obligatoria"],
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  quantity: {
    type: Number,
    required: [true, "La cantidad es obligatoria"],
    min: 1,
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: [
        (val: IOrderItem[]) => val.length > 0,
        "La orden no tiene productos",
      ],
    },
    price: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ORDER_STATUS_VALUES,
      default: ORDER_STATUS.pending,
    },
    shippingDetails: {
      name: { type: String, required: [true, "El nombre es obligatorio"] },
      cellphone: {
        type: String,
        required: [true, "El celular es obligatorio"],
      },
      location: {
        type: String,
        required: [true, "La localidad es obligatoria"],
      },
      address: {
        type: String,
        required: [true, "La dirección es obligatoria"],
      },
    },
  },
  { timestamps: true }
);

OrderSchema.methods.toJSON = function () {
  const { __v, ...order } = this.toObject();
  return order;
};

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
