import { useUserDataQuery } from "@/redux/features/auth/authApi"
import { TUser } from '@/redux/features/auth/authSlice'
import { Menu, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function TopBar({ isOpen, setIsOpen }: { user: null | TUser, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
    const { data: user } = useUserDataQuery(undefined)

    return (
        <header className="border-b bg-white">
            <div className="flex items-center justify-between px-6 py-3 w-full">
                <button
                    className="lg:hidden "
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    <span className="sr-only">Toggle menu</span>
                </button>

                <div className="lg:flex items-center gap-2 hidden">
                    <span className="hidden sm:inline text-[15px]">Welcome Admin, {user?.data.name}!</span>
                    <span className="text-xl">👋</span>
                </div>



                <div></div>

            </div>
        </header>
    )
}