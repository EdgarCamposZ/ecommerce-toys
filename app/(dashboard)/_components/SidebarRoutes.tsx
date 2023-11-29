"use client";
import { Layout, Compass, ToyBrick, BarChart } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Navegar",
        href: "/search",
    }
];

const AdminRoutes = [
    {
        icon: ToyBrick,
        label: "Juguetes",
        href: "/juguetes",
    },
    {
        icon: BarChart,
        label: "Estadisticas",
        href: "/juguetes/stadistics",
    }
];

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isJuguetesPage = pathname?.includes("/juguetes");
    const routes = isJuguetesPage ? AdminRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
};

