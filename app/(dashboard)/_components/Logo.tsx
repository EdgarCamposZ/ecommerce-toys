import Image from "next/image";

export const Logo = () => {
    return (
        <Image
            src="/narutoo.jpeg"
            alt="Logo"
            width={70}
            height={70}
        />
    )
};
