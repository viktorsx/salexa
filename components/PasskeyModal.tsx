import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importujte useRouter
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const router = useRouter(); // Inicijalizujte useRouter
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setOpen(false);
      onAuthSuccess(); // Poziva funkciju kada je korisnik već autentifikovan
    }
  }, []);

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
      onAuthSuccess(); // Poziva funkciju nakon uspešne autentifikacije
      router.refresh(); // Osvježava stranicu odmah nakon autentifikacije
    } else {
      setError("Netačan PIN kod. Pokušajte ponovo.");
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Pristup admin panelu
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Da bi pristupili admin stranici, molimo vas unesite vaš PIN kod.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="shad-otp">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot key={index} className="shad-otp-slot" index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={validatePasskey} className="shad-primary-btn w-full">
            Unesite PIN kod
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
