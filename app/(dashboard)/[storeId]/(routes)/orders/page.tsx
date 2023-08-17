import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import { BillboardClient } from './components/client';
import { BillboardColumn } from './components/columns';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        product: true,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formatedOrders: BillboardColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.storeId
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formatedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
