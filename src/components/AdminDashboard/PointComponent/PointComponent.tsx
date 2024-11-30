/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import coins from "@/assets/coins.png";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyLoading from "@/components/ui/MyLoading";
import { useGetAllPointsQuery, useUpdatePointMutation } from "@/redux/features/point/pointApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { isNonEmptyArray } from "@/utils/isNonEmptyArray";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { z } from "zod";

type BuzzPoint = {
  _id: string;
  type: string;
  points: number;
};



const validationSchema = z.object({
  points: z
    .any({
      required_error: "Points are required",
    })
});

const BuzzPointComponent = () => {
  const {data: buzzPointData, isLoading} = useGetAllPointsQuery(undefined)
  const [updatePointMutation] = useUpdatePointMutation()

  const handleSubmit = async (formData: BuzzPoint, id: string) => {
    console.log(formData);
    // Pass the ID of the BuzzPoint item to update the points
    await handleAsyncWithToast(
      async () => {
        return updatePointMutation({ id, points: formData.points }); // Send updated points and associated id
      },
      "Updating points...",
      "Update successful!",
      "Update failed. Please try again.",
      false,
      null
    );
  };

  if (isLoading) {
    return <MyLoading/>
  }
  return (
    <div>
      <div className="border-b-1  p-4">Coins</div>
      <div className="  flex items-center justify-center w-full">
        <div className=" w-full bg-white shadow-lg rounded-lg">
          <div className="">
            <table className="max-w-6xl w-full border-collapse ">
              <thead>
                <tr className=" text-sm text-gray-600">
                  <th className=" px-4 py-4 text-left">Book Type</th>
                  <th className=" px-4 py-4 text-center">BuzzPoints</th>
                </tr>
              </thead>
              <tbody>
                {isNonEmptyArray(buzzPointData?.data) &&  buzzPointData?.data?.map((item : BuzzPoint, index: number) => (
                  <tr key={index}>
                    <td className=" px-4 py-3 text-sm text-gray-700">
                      {item?.type}
                    </td>
                    <td className=" px-4 py-3 text-center  font-medium text-gray-700">
                      <MyFormWrapper
                        key={index}
                        className={"flex justify-center gap-4"}
                        onSubmit={(data) => handleSubmit(data, item._id)}
                        resolver={zodResolver(validationSchema)}
                      >
                        <div className="w-full max-w-28 relative">
                          <MyFormInput
                            label=""
                            labelClassName="mb-1 text-xs font-medium"
                            inputClassName="pe-10"
                            type="number"
                            name={"points"}
                            placeHolder="Point"
                            value={item?.points}
                          />
                          <Image
                            src={coins}
                            alt="icon of coins earned by reding"
                            className="max-w-6 max-h-6 absolute top-2 right-2"
                          />
                        </div>
                        <div>
                          <Tooltip content="Update">
                            <Button
                              className={`w-fit mx-auto py-3 rounded-lg bg-primary text-white text-base font-normal leading-6 mb-5`}
                              type="submit"
                            >
                          Update
                            </Button>
                          </Tooltip>
                        </div>
                      </MyFormWrapper>
                      {/* </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuzzPointComponent;
