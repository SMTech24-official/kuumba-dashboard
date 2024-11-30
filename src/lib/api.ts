export type OrderItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
  };
  
  export type Order = {
    id: string;
    customerName: string;
    email: string;
    date: string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
    total: number;
    shippingAddress: string;
    items: OrderItem[];
  };
  
  export async function getOrderDetails(id: string): Promise<Order> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Mock data
    return {
      id,
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      date: '2023-11-30',
      status: 'Processing',
      total: 239.97,
      shippingAddress: '123 Main St, Anytown, AN 12345',
      items: [
        { id: '1', name: 'Widget A', quantity: 2, price: 49.99 },
        { id: '2', name: 'Gadget B', quantity: 1, price: 139.99 },
      ],
    };
  }
  
  