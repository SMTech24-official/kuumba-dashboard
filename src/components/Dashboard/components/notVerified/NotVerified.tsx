import notVerifiedIcon from '@/assets/notVerified.png'
import GradCircleWrapper from '@/components/common/grad-circleWrapper/GradCircleWrapper'
import Image from "next/image"
import Link from "next/link"

export default function NotVerified() {
    return (
        <GradCircleWrapper>
            <div className="flex flex-col justify-center items-center aspect-square gap-4">
                <div className="flex justify-center">
                    <div className="w-16 h-16">
                        <Image src={notVerifiedIcon} alt="not verified icon" />
                    </div>
                </div>
                <p className="text-[#8B4C84] text-xl max-w-md">
                    Please complete your profile first to
                    <br />
                    add books and see your progress
                </p>
                <Link href={"/dashboard/settings"}
                    className="bg-[#8B4C84] hover:bg-[#8B4C84]/90 text-white px-6 py-3 h-auto text-lg rounded-lg"
                >
                    Profile settings
                </Link>
            </div>
        </GradCircleWrapper>
    )
}

