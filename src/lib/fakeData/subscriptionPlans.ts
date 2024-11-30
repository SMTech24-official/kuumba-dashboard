import monthlyPlans from "@/assets/monthlyPlans.png";
import yearlyPlans from "@/assets/yearly.png";
import { SubscriptionPlan } from "../types/type";

export const SubscriptionsPlan : SubscriptionPlan[] = [
    {
      type: "monthly",
      name: "Monthly Plan",
      price: "$20 per month",
      description: "Monthly subscription with all features",
      features: [
        "Real Reviews from Verified Readers",
        "Earn and Use BuzzPoints",
        "Personalized Author Dashboard",
        "Flexible Review Options",
        "Referral Rewards Program",
        "Customer Support",
        "Reviewer Recognition Program",
        "Exclusive Resources for Authors",
      ],
      button: {
        label: "Downgrade",
        variant: "outline",
        style: "justify-between text-[#8B4C84] border-[#8B4C84]",
      },
      image: monthlyPlans.src,
    },
    {
      type: "yearly",
      name: "Yearly Plan",
      price: "$200 per year (get 2 months free)",
      description: "Yearly subscription with all features",
      features: [
        "Real Reviews from Verified Readers",
        "Earn and Use BuzzPoints",
        "Personalized Author Dashboard",
        "Flexible Review Options",
        "Referral Rewards Program",
        "Customer Support",
        "Reviewer Recognition Program",
        "Exclusive Resources for Authors",
      ],
      button: {
        label: "Selected",
        variant: "solid",
        style: "justify-between bg-[#8B4C84] hover:bg-[#8B4C84]/90",
      },
      image: yearlyPlans.src,
    },
  ];
  