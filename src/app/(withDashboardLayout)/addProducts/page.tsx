import AddBooks from '@/components/Dashboard/pages/addBooks/AddBooks';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Add Books  ',
}


const page = () => {
    return (
        <div className='dashboard-containers'>
            <AddBooks/>
        </div>
    );
};

export default page;