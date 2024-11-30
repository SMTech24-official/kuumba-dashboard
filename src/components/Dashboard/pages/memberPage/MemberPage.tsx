"use client"
import TotalMembers from '@/components/AdminDashboard/TotalMembers/TotalMembers';
// import { Metadata } from 'next';
import MyLoading from '@/components/ui/MyLoading';
import { useGetAllMembersQuery } from '@/redux/features/member/memberApi';

// export const metadata: Metadata = {
//   title: 'Members Details',
// }


const MemberPage = () => {
  const { data: memberData, isLoading: isMemberLoading } = useGetAllMembersQuery(undefined);
  console.log(memberData?.data);
  if (isMemberLoading) {
    return <MyLoading />;
  }
  return (
    <div>
      <TotalMembers items={memberData?.data} title="Total members" />  
    </div>
  );
};

export default MemberPage;
