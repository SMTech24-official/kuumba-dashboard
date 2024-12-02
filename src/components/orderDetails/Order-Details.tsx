/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Item } from '@/lib/types/type';
import { useGetSingleOrderQuery } from '@/redux/features/order/orderApi';
import { useParams } from 'next/navigation';
import MyLoading from '../ui/MyLoading';

export function OrderDetails() {

  const params = useParams();
  const Id = params?.id as string;
  const { data: SingleOrder, isLoading } = useGetSingleOrderQuery(Id);

  console.log(SingleOrder?.data);

  if (isLoading) {
    return <div><MyLoading /></div>
  }

  const calculateTotalPrice = (items: Item[]): number => {
    return items.reduce((total, item) => {
      // Multiply price by quantity and add to total
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Order ID: {SingleOrder?.data[0].id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
              <p><strong>Name:</strong> {SingleOrder?.data[0]?.user?.firstName} {SingleOrder?.data[0]?.user?.lastName}</p>
              <p><strong>Email:</strong> {SingleOrder?.data[0]?.user?.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Information</h3>
              <p><strong>Date:</strong> {new Date(SingleOrder?.data[0].createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span>{SingleOrder?.data[0].status}</span></p>
              <p><strong>Total:</strong> ${calculateTotalPrice(SingleOrder?.data[0].items)}</p>
            </div>
          </div>
          <div className="mt-6"> 
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p>{SingleOrder?.data.shippingAddress}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SingleOrder?.data[0].items.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.title}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

