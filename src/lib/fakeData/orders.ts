export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  date: string;
  status: OrderStatus;
  total: number;
  shippingAddress: string;
  items: OrderItem[];
}

export const orders: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Alice Johnson",
    email: "alice@example.com",
    date: "2023-11-28",
    status: "Processing",
    total: 129.99,
    shippingAddress: "123 Main St, Anytown, AN 12345",
    items: [
      { id: "ITEM-1", name: "Widget A", quantity: 2, price: 49.99 },
      { id: "ITEM-2", name: "Gadget B", quantity: 1, price: 30.01 },
    ],
  },
  {
    id: "ORD-1002",
    customerName: "Bob Smith",
    email: "bob@example.com",
    date: "2023-11-29",
    status: "Shipped",
    total: 79.98,
    shippingAddress: "456 Elm St, Somewhere, SW 67890",
    items: [
      { id: "ITEM-3", name: "Gizmo C", quantity: 2, price: 39.99 },
    ],
  },
  {
    id: "ORD-1003",
    customerName: "Charlie Brown",
    email: "charlie@example.com",
    date: "2023-11-30",
    status: "Pending",
    total: 199.97,
    shippingAddress: "789 Oak Rd, Elsewhere, EL 13579",
    items: [
      { id: "ITEM-4", name: "Thingamajig D", quantity: 1, price: 149.99 },
      { id: "ITEM-5", name: "Doohickey E", quantity: 1, price: 49.98 },
    ],
  },
  // Add more dummy orders as needed
];

