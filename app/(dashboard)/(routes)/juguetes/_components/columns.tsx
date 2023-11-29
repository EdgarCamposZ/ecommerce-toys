"use client"

import { Button } from "@/components/ui/button"
import { tbl_toys } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { cn } from "@/lib/utils"

export const columns: ColumnDef<tbl_toys>[] = [
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="customghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "categoria.nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="customghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Categoria
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "precio",
        header: ({ column }) => {
            return (
                <Button
                    variant="customghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("precio") || "0");
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(price);

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "inventario",
        header: ({ column }) => {
            return (
                <Button
                    variant="customghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Inventario
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const { uuid, nombre } = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/juguetes/${uuid}`}>
                            <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar Juguete
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(uuid)}
                        >
                            Copiar UUID del Juguete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(nombre)}
                        >
                            Copiar Nombre del Juguete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

