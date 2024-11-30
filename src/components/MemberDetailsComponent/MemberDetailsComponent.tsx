'use client';

import avatar from '@/assets/avatar.svg';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetSingleMemberQuery, useUpdateSpecificUserMutation } from '@/redux/features/member/memberApi';
// import { Button } from "@nextui-org/react";
import { useAppDispatch } from '@/redux/hooks';
import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import MyLoading from '../ui/MyLoading';




const MemberDetailsComponent = () => {
  const params = useParams();
  const memberId = params?.memberId as string;
  const { data: memberData, isLoading: isMemberLoading } = useGetSingleMemberQuery(memberId);
  const [updateMember] = useUpdateSpecificUserMutation()

  const dispatch = useAppDispatch();
  const router = useRouter()

  console.log(memberData);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    try {
      e.preventDefault()

      const Alldata = new FormData(e.currentTarget);

      const data = Object.fromEntries(Alldata.entries());

      const otherData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        summary: data.summary,
        birthday: data.birthday,
        skills: [data.skills],
        phone: data.phone,
        address: data.address,
      }
      console.log(otherData);
      const finishRes = await handleAsyncWithToast(
        async () => {
          return updateMember({ data: otherData, id }); // Replace with your actual login function
        },
        "Updating User...", // Toast message for the start of the process
        "User update Completed!", // Toast message for success
        `Please Check Your Network Connection`, // Toast message for failure
        true,
        dispatch
      );
      if (finishRes?.data?.success) {
        router.push("/members-details")
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Some error happened")
    }


  }


  if (isMemberLoading) {
    return <MyLoading />;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <form onSubmit={(e) => handleSubmit(e, memberId)} className="space-y-6">
        <div className="text-center">
          <Image
            src={memberData?.data?.profilePic || avatar}
            height={200}
            width={200}
            alt="Profile"
            className="mx-auto rounded-full"
          />
          <h4 className="text-2xl font-semibold mt-4">
            {memberData?.data?.firstName} {memberData?.data?.lastName}
          </h4>
          <p className="text-sm text-muted-foreground">
            Member since:{' '}
            {new Date(memberData?.data?.createdAt || Date.now()).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={memberData?.data?.firstName}


            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={memberData?.data?.lastName}


            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={memberData?.data?.email}


            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={memberData?.data?.phone || ''}


            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              id="birthday"
              name="birthday"
              type="date"
              defaultValue={memberData?.data?.birthday ? new Date(memberData?.data?.birthday).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
            />

          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={memberData?.data?.address || ''}


            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            name="skills"
            defaultValue={memberData?.data?.skills || ''}


          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Input
            id="summary"
            name="summary"
            defaultValue={memberData?.data?.summary || ''}



          />
        </div>
        <Button type='submit' radius="sm" className="bg-primary text-white">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default MemberDetailsComponent;

