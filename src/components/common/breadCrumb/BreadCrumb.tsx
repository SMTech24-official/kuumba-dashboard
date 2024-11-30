"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BreadCrumb = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

    // Split the current path into an array, filtering out empty values
    const pathnames = pathname.split("/").filter((x) => x);

    // Dynamically update breadcrumbs based on "tab" search parameter
    useEffect(() => {
        const tabPath = searchParams.get("tab")?.split("/") || [];
        setBreadcrumbs(tabPath);
    }, [searchParams]);


    return (
        <div className="hidden sm:block">
            <div className="flex items-start gap-2 font-semibold sm:text-base text-xs md:text-lg text-wrap">
                {/* Render path-based breadcrumbs */}
                {pathnames?.map((breadcrumb, index) => {
                    return (
                        <Link href={index == 0 ? `/${pathnames[0]}`: index == 1 ? `/${pathnames[0]}/${pathnames[1]}` : index == 2 ? `/${pathnames[0]}/${pathnames[1]}/${pathnames[2]}` : `/${pathnames[0]}` } key={`path-${index}`} className="text-black capitalize flex items-center gap-2 text-balance ">
                            {breadcrumb}
                            {index < pathnames.length - 1 && <ChevronRight className="min-h-5 min-w-5" />}
                        </Link>
                    )
                })}
                {/* Render tab-based breadcrumbs */}
                {breadcrumbs?.map((breadcrumb, index) => (
                    <span key={`tab-${index}`} className="text-black capitalize flex items-center text-balance">
                        {index == 0 && <ChevronRight className="min-h-5 min-w-5" />}
                        {breadcrumb}
                        {index < breadcrumbs.length - 1 && <ChevronRight className="min-h-5 min-w-5" />}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BreadCrumb;
