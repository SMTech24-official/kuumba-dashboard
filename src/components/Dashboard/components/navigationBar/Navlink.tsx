"use client"
import logo from "@/assets/logo/dashLogo.png"
import profile from "@/assets/profile placehoilder.png"
import { NavLink } from '@/lib/types/type'
import { TUser } from '@/redux/features/auth/authSlice'
import { useAppDispatch } from '@/redux/hooks'
import { logoutHandler } from '@/utils/handleLogout'
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { IoLogOut } from 'react-icons/io5'


export default function MainNavLink({ user, navLink }: { user: null | TUser, navLink: NavLink[] }) {
    const pathname = usePathname()
    console.log(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isActive = (href: any) => {
        // Remove query parameters from href for comparison
        const cleanHref = href.split('?')[0];
        const cleanPathname = pathname.split('?')[0];

        // If href is exactly `/dashboard`, match it exactly
        if (cleanHref === '/') {
            return cleanPathname === '/';
        }

        // For other routes, match using startsWith
        return cleanPathname.startsWith(cleanHref);
    };

    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = async () => {
        await logoutHandler(dispatch, router);
    };
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Link href={"/"} className="p-4">
                <div className="flex items-center justify-center gap-2">
                    <Image
                        src={logo}
                        alt="Booksy.buzz"
                        width={150}
                        height={150}
                        className="rounded"
                    />
                </div>
            </Link>
            <nav className="flex-1 p-4">
                <div className="space-y-1">
                    {
                        navLink?.map((link) => <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-md ${isActive(link.href) ? "bg-primary text-white" : "hover:bg-[#8B4C84]/10"}`}
                        >
                            <div className="rounded">
                                <link.icon className='min-w-6 min-h-6' />
                            </div>
                            {link.name}
                        </Link>)
                    }
                </div>

            </nav>
            <div className="mt-auto p-4 space-y-1">
                <div
                    onClick={() => handleLogout()}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer`}
                >
                    <IoLogOut className="min-w-6 min-h-6" />
                    Log Out
                </div>
                <div className="flex items-center gap-3 px-3 py-3 mt-4">
                    <Image
                        src={user?.profilePic || profile}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                        <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                        {/* <div className="font-medium text-xs">{user?.email}</div> */}
                        <div className="text-xs text-gray-500">{user?.role}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}