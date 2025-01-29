"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessKey");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="shad-danger-btn px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
