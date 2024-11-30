import avatar from "@/assets/avatar.svg";
import { User } from "@/lib/types/type";
import { isNonEmptyArray } from "@/utils/isNonEmptyArray";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface MemberProps {
  items: User[]; // books prop should be an array of Book
}

const MemberTable = ({ items }: MemberProps) => {
  console.log(items);
  return (
    <div className="overflow-y-scroll">
      <table className="w-full table-auto border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="text-base font-normal border-b-1">
            <th className="py-4 text-base font-normal">Member name</th>
            <th className="py-4 text-base font-normal">Joined at</th>
            <th className="py-4 text-base font-normal">Details</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {isNonEmptyArray(items) && items?.map((item) => (
            <tr key={item.id} className={` hover:bg-gray-100`}>
              <td className="px-4 py-4 text-center lg:max-w-28">
                <div className="flex gap-2 items-center">
                  {item?.profilePic ? (
                    <Image
                      src={item?.profilePic}
                      alt={item?.firstName}
                      width={60}
                      height={90}
                      className="rounded"
                    />
                  ) : (
                    <Image
                      src={avatar}
                      alt={item.firstName}
                      width={60}
                      height={90}
                      className="rounded"
                    />
                  )}
                  <p className="mt-2 text-base font-normal">{item.firstName} {item.lastName}</p>
                </div>
              </td>
              <td className="px-4 py-4 text-center text-base font-normal">
                {new Date(item?.createdAt || Date.now()).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </td>
              <td className="px-4 py-4 text-center">
                <Link href={`/members-details/${item?.id}`}>
                  <Button radius="sm" className="bg-primary text-white">
                    View
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
