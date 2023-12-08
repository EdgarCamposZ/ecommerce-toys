"use client"
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// const headingFont = localFont({
//     src: "../../public/fonts/font.woff2"
// });
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Client } from "@clerk/nextjs/server";
import { Logo } from "@/components/Logo";

const textFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ],
});

const HomePage = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className={cn(
                "flex items-center justify-center flex-col",
                //headingFont.className,
            )}>
                <div className="flex items-center justify-center p-10">
                    <Image
                        src="/narutoo.jpeg"
                        alt="Logo"
                        height={100}
                        width={100}
                    />

                    <p className={cn(
                        "text-6xl text-neutral-700 dark:text-white pb-1",
                        //headingFont.className,
                    )}>
                        Coleccionables
                    </p>
                </div>
                <div className="mb-10 flex items-center border  p-4 bg-teal-500  rounded-full">
                    <Medal className="h-6 w-6 mr-2" />
                    Lo mejor en juguetes
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 dark:text-white mb-6">
                    Hoy quiero agregar a mi coleccion...
                </h1>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
                >
                    <h1 className="text-teal-800 dark:text-yellow-500 mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
                        <TypeAnimation
                            sequence={[
                                "Figuras de anime",
                                1000,
                                "Figuras de accion",
                                1000,
                                "Funko pops",
                                1000,
                                "Figuras del deporte",
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </h1>
                </motion.div>
            </div>
            <div className={cn(
                "text-sm md:text-xl text-neutral-600 dark:text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
                textFont.className,
            )}>
              Descubre la magia de los juguetes coleccionables, donde cada pieza es una joya única que enciende la imaginación. Con detalles meticulosos y una variedad fascinante de personajes, estos objetos se convierten en tesoros exclusivos para los amantes de la colección. Cada adquisición no solo es un juguete, sino una inversión en experiencias inolvidables. Coleccionar estos pequeños tesoros es como construir un mundo propio lleno de emociones y recuerdos. ¡Inicia tu viaje coleccionista hoy y da vida a una nueva dimensión de diversión!
            </div>
            <Button className="mt-6" size="lg" asChild>
                <Link href="/sign-up">
                    Registrarse
                </Link>
            </Button>
            <br />
        </div>
    );
};

export default HomePage;
