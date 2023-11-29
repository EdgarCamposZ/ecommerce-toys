import { tbl_categorias, tbl_toys } from "@prisma/client";
import { ToyCard } from "./ToyCard";

type JugueteWithCategory = tbl_toys & {
    categoria: tbl_categorias | null;
};

interface JuguetesListProps {
    items: JugueteWithCategory[];
}

export const JuguetesList = ({
    items
}: JuguetesListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <ToyCard
                        key={item.uuid}
                        id={item.uuid}
                        name={item.nombre!}
                        imageUrl={item.imagen_url!}
                        price={item.precio!}
                        category={item?.categoria?.nombre!}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No toys found
                </div>
            )}
        </div>
    )
}
