"use client";
import React from "react";
import { FaCheck } from "react-icons/fa";
import pricingCardImage from "@/assets/pricingCardImage.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const SubscriptionCard: React.FC = () => {
  const features: string[] = [
    "Real Reviews from Verified Readers",
    "Earn and Use BuzzPoints",
    "Personalized Author Dashboard",
    "Flexible Review Options",
    "Referral Rewards Program",
    "Customer Support",
    "Reviewer Recognition Program",
    "Exclusive Resources for Authors",
  ];

  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="rounded-2xl p-4 xs:p-7 bg-primary bg-opacity-[0.06] backdrop-blur-sm  overflow-hidden">
      <div className="px-4 py-5 rounded-2xl flex flex-col sm:flex-row gap-y-5 items-center  bg-primary-light">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src={pricingCardImage}
            height={200}
            width={200}
            alt="image"
            className="mb-10"
          />
          {user?.email ? (
            <></>
          ) : (
            <Link href={"/login"}>
              <Button className="bg-primary text-white">SUBSCRIBE</Button>
            </Link>
          )}
        </div>
        <div className="w-full">
          <h4 className="text-2xl font-bold mb-4">
            Unlimited Reviews for All Your Books
          </h4>
          <p className="text-xl font-extrabold mb-8">$20 per month</p>
          <div>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FaCheck className=" text-[#02BC7D] mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
