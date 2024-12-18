"use client"

import TopBar from '@/components/Dashboard/components/navigationBar/TopBar';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { BiSolidBookAdd } from 'react-icons/bi';
import { FaUserGroup } from 'react-icons/fa6';
import { MdProductionQuantityLimits } from "react-icons/md";
import SideBar from './components/navigationBar/SiderBar';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useAppSelector(selectCurrentUser);
    const [isOpen, setIsOpen] = useState(false)

    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [navRef])

    const navLink = [
        { name: 'My Products', href: '/myProducts', icon: AiOutlineProduct },
        { name: 'Add Products', href: '/addProducts', icon: BiSolidBookAdd },
        { name: 'User details', href: '/members-details', icon: FaUserGroup },
        { name: 'Orders', href: '/orders', icon: MdProductionQuantityLimits },
        // { name: 'Settings', href: '/settings', icon: FaBookBookmark },

    ];



    return (
        <div className='flex'>
            <div className='max-h-screen h-full sticky top-0 z-50'>
                <SideBar navLink={navLink} isOpen={isOpen} user={user} navRef={navRef} />
            </div>
            <div className='w-full'>
                <div className='sticky top-0 z-40'>
                    <TopBar setIsOpen={setIsOpen} isOpen={isOpen} user={user} />
                </div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;