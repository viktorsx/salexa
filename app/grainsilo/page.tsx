"use client";

import LogoutButton from "@/components/LogoutButton";
import { decryptKey } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const GrainSilo = () => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [silos, setSilos] = useState([
    { id: 1, name: "Ćelija 1", level: 50 },
    { id: 2, name: "Ćelija 2", level: 30 },
    { id: 3, name: "Ćelija 3", level: 70 },
  ]);

  const updateSiloLevel = (id: number, newLevel: number) => {
    setSilos((prevSilos) =>
      prevSilos.map((silo) =>
        silo.id === id ? { ...silo, level: Math.max(0, Math.min(100, newLevel)) } : silo
      )
    );
  };

  useEffect(() => {
    const encryptedKey = localStorage.getItem("accessKey");
    const accessKey = encryptedKey ? decryptKey(encryptedKey) : null;
    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setAuthorized(true);
    } else {
      router.push("/");
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header flex justify-between items-center">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Grain silo panel</p>
        <div className="flex space-x-4">
          <Link
            href="/admin"
            className="shad-secondary-btn px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Admin panel
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h2 className="header">Welcome to the Grain Silo System</h2>
          <p className="text-dark-700">
            Here you can manage and monitor grain storage levels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {silos.map((silo) => (
              <Card
                key={silo.id}
                className="p-5 bg-dark-300 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow silo-card-border transform transition-all hover:scale-105 hover:bg-dark-400"
              >
                <CardContent className="text-center">
                  <div className="text-xl font-bold mb-6 text-white">
                    {silo.name}
                  </div>

                  {/* Modifikovani 3D silos sa pomeranim sadržajem */}
                  <motion.div
                    className="silo-container mx-auto relative h-64 w-32 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-full shadow-inner-3d" />

                    {/* Pomerena unutrašnjost sa leve strane */}
                    <motion.div
                      className="absolute bottom-0 w-[100%] left-[0%] bg-gradient-to-b from-amber-500 to-amber-700 rounded-t-full transition-all duration-500"
                      style={{
                        height: `${silo.level}%`,
                        borderRadius: "40 40 0 0",
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${silo.level}%` }}
                    />

                    <div className="absolute inset-0 rounded-t-full pointer-events-none" />
                    <div className="absolute inset-0 bg-noise opacity-20 rounded-t-full" />
                  </motion.div>

                  <div className="mt-6 text-lg font-semibold text-amber-400">
                    <span className="text-1xl">{silo.level}</span>% kapacitet
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      className="w-full bg-dark-400 hover:bg-blue-900 border-blue-800 text-blue-400 hover:text-white"
                      onClick={() => updateSiloLevel(silo.id, silo.level + 10)}
                    >
                      ↑ Fill
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-dark-400 hover:bg-red-900 border-red-800 text-red-400 hover:text-white"
                      onClick={() => updateSiloLevel(silo.id, silo.level - 10)}
                    >
                      ↓ Empty
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GrainSilo;