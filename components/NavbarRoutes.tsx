"use client";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogOut, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isJuguetesPage = pathname?.startsWith("/juguetes");
    const isPlayerPage = pathname?.includes("/chapter");
    const isSearchPage = pathname === "/search";

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-8 ml-auto">
                {isJuguetesPage || isPlayerPage ? (
                    <Link href="/cliente">
                        <Button size="sm" variant='customghost'>
                            <LogOut className="h-4 w-4 mr-2" />
                            Salir
                        </Button>
                    </Link>
                ) : (
                    <Link href="/juguetes">
                        <Button size="sm" variant='customghost'>
                            Modo Admin
                        </Button>
                    </Link>
                )}
                <UserButton
                    afterSignOutUrl="/"
                />
                <ModeToggle />
            </div>
        </>
    );
}
