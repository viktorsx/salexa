"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PasskeyModal from "@/components/PasskeyModal";
import { decryptKey } from "@/lib/utils";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const encryptedKey = localStorage.getItem("accessKey");
    const accessKey = encryptedKey ? decryptKey(encryptedKey) : null;

    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setChecking(false);
  }, []);

  // Funkcija za osvežavanje kad se PIN unese
  const handleAuthentication = () => {
    setIsAuthenticated(true);
    router.replace("/admin"); // Navigacija da osveži prikaz
  };

  if (checking) return null; // Dok se proverava, ne prikazujemo ništa

  return isAuthenticated ? <>{children}</> : <PasskeyModal onAuthSuccess={handleAuthentication} />;
};

export default AuthWrapper;
