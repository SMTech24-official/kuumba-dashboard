// ... previous code for Order and OrderItem types

import { Order } from "./api";

export type OrderSummary = {
  id: string;
  customerName: string;
  date: string;
  status: Order["status"];
  total: number;
};

export type PaginatedOrders = {
  orders: OrderSummary[];
  totalOrders: number;
  totalPages: number;
};

export async function getAllOrders(
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<PaginatedOrders> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data
  const allOrders: OrderSummary[] = Array.from({ length: 50 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    customerName: `Customer ${i + 1}`,
    date: new Date(Date.now() - Math.random() * 10000000000)
      .toISOString()
      .split("T")[0],
    status: ["Pending", "Processing", "Shipped", "Delivered"][
      Math.floor(Math.random() * 4)
    ] as Order["status"],
    total: Math.round(Math.random() * 1000 * 100) / 100,
  }));

  // Filter orders based on search term
  const filteredOrders = allOrders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * limit,
    page * limit
  );

  return {
    orders: paginatedOrders,
    totalOrders: filteredOrders.length,
    totalPages: Math.ceil(filteredOrders.length / limit),
  };
}

// ... previous getOrderDetails function
