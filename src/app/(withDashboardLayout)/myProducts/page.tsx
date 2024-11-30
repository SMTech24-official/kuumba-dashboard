import MyBooks from '@/components/Dashboard/pages/myBooks/MyBooks';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'My Books  ',
}


const page = () => {
    return (
        <div className='dashboard-containers'>
           <MyBooks/>
        </div>
    );
};

export default page;