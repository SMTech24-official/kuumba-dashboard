import BreadCrumb from '@/components/common/breadCrumb/BreadCrumb';
import MemberDetailsComponent from '@/components/MemberDetailsComponent/MemberDetailsComponent';
import React from 'react';




const MemberDetailsPage = () => {
    return (
        <div className='dashboard-containers'>
            <BreadCrumb/>
            <MemberDetailsComponent />
        </div>
    );
};

export default MemberDetailsPage;