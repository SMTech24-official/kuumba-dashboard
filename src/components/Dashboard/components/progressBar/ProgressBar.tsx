import { Progress } from '@/components/ui/progress';
import React from 'react';

const ProgressBar = ({ value, max, middleValue }: { value: number, max: number, middleValue: number }) => {
    return (
        <div className=''>
            <div className='max-w-2xl relative mx-auto'>
                <div className='flex items-center'>
                    <Progress value={(value * (100 / max)) + 1} max={max} className=' text-primary' />
                    <div className='p-2 rounded-full bg-primary w-4 relative -translate-x-3'>

                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='mt-5'>
                        Current Referral {value}
                    </div>
                    <div className='flex flex-col gap-4 items-center absolute right-0 left-0 -top-3'>
                        <div className='border bg-primary h-9 w-1'>

                        </div>
                        {middleValue}
                    </div>
                    <div className='mt-5 relative -translate-x-3'>
                        {max}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;