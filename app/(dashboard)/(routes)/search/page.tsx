import { db } from "@/lib/db";
import { Categories } from "./_components/Categories";
import { SearchInput } from "@/components/SearchInput";
import { getJuguetes } from "@/actions/get-toys";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { JuguetesList } from "@/components/JugutesList";

interface SearchPageProps {
    searchParams: {
        name: string;
        categoryId: string;
    }
};

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }


    const categories = await db.tbl_categorias.findMany({
        orderBy: {
            nombre: "asc"
        }
    });

    const juguetes = await getJuguetes({
        userId,
        ...searchParams,
    });

    return (
        <>
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-4">
                <Categories
                    items={categories}
                />
                <JuguetesList items={juguetes} />
            </div>
        </>
    );
}

export default SearchPage;
