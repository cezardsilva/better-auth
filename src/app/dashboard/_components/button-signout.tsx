"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ReactNode } from "react";

type ButtonSignOutProps = {
  children?: ReactNode;
};

export function ButtonSignOut({ children }: ButtonSignOutProps) {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/")
        }
      }
    });
  }

  return (
    <Button onClick={signOut} style={{ cursor: "pointer" }} className="flex items-center w-full px-2 py-2 text-sm bg-transparent hover:bg-muted">
      {children ?? "Sair da conta"}
    </Button>
  );
}