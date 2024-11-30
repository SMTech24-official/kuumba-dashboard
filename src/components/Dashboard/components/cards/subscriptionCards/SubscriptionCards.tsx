"use client"
import { SubscriptionPlan } from '@/lib/types/type';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const SubscriptionCards = ({ plans, plan }: { plans: string, plan: SubscriptionPlan }) => {
    const router = useRouter()

    return (
        <div
            className={`border rounded-lg p-6 space-y-6 flex flex-col items-center ${plans == plan.type ? "border border-primary" : ""}`}
        >
            <div className="flex items-center gap-4 flex-col">
                <div className={` p-2 rounded-lg`}>
                    <Image
                        src={plan.image}
                        alt={`${plan.type} Icon`}
                        width={100}
                        height={100}
                        className="w-14 h-14"
                    />
                </div>
                <div>
                    <h3 className="text-xl">{plan.name}</h3>
                </div>
            </div>
            <button 
            // onClick={() => handleCheckout()}
            // onClick={() => router.push("/payment")}
            onClick={() => router.push("https://buy.stripe.com/test_8wMdSB47a9l8cO4aEF")}
             className={`p-3 border rounded-md text-[18px] ${plans == plan.type ? "bg-primary text-white" : "border border-primary text-primary"} flex items-center justify-center gap-3`}>
                {plan.button.label}
                <IoIosArrowForward />
            </button>
            <div className="space-y-4">
                <div className="font-bold">Plan Includes</div>
                <ul className=" grid lg:grid-cols-1 grid-cols-1 md:grid-cols-2 gap-2">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-500 shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SubscriptionCards;