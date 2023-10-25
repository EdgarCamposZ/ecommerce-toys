import { Button } from "@/components/ui/button";
import Link from "next/link";

const JuguetesPage = () => {
    return (
        <div className="p-6">
            <Link href="/juguetes/create">
                <Button> Agregar juguete </Button>
            </Link>
        </div>
    );
}

export default JuguetesPage;
