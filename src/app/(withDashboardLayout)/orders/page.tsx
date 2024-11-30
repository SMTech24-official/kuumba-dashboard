import { OrderList } from "@/components/orderDetails/OrderList";

export default function OrderListPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <OrderList />
    </div>
  );
}

