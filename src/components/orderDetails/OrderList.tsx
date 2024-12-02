'use client';

import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Item, Order } from '@/lib/types/type';
import { useGetOrderQuery } from '@/redux/features/order/orderApi';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import MyLoading from '../ui/MyLoading';

export function OrderList() {
    const { data: OrderData, isLoading } = useGetOrderQuery(undefined)
    const [search, setSearch] = useState('');


    const filteredOrders = OrderData?.data.filter((order: Order) =>
        order.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase()) ||  order.user.lastName.toLowerCase().includes(search.toLowerCase())
    );

    const calculateTotalPrice = (items: Item[]): number => {
        return items.reduce((total, item) => {
            // Multiply price by quantity and add to total
            return total + item.price * item.quantity;
        }, 0);
    };
    if (isLoading) {
        return <div><MyLoading /></div>
    }

    return (
        <div className="space-y-4">
            <Input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
            />

            {/* Desktop view */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders?.map((order: Order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.user.firstName} {order.user.lastName}</TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell><span>{order.status}</span></TableCell>
                                <TableCell>${calculateTotalPrice(order.items)}</TableCell>
                                <TableCell>
                                    <Button radius='sm' className="bg-primary text-white" type="submit">
                                        <Link href={`/orders/${order.userId}`}>View Details</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile view */}
            <div className="md:hidden space-y-4">
                {filteredOrders?.map((order: Order) => (
                    <div key={order.id} className='space-y-2 shadow-lg p-4'>
                        <div>
                            <p><strong>Order Id:</strong> {order.id}</p>
                        </div>
                        <div className='space-y-2'>
                            <p><strong>Customer:</strong> {order.user.firstName} {order.user.lastName}</p>
                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> <span>{order.status}</span></p>
                            <p><strong>Total:</strong> ${calculateTotalPrice(order.items)}</p>
                            <Button radius='sm' className="bg-primary text-white" type="submit">
                                <Link href={`/orders/${order.userId}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

