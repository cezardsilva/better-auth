import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarMenu } from "./_components/avatar-menu";

import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <>
      {/* <pre>{JSON.stringify(session.user, null, 2)}</pre> */}
      <div className="fixed top-4 right-4 z-50">
        <AvatarMenu user={session.user} />
      </div>
      <div className="container mx-auto min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-2">Página dashboard</h1>
        <h3>Usuario logado: {session.user.name}</h3>
      </div>
    </>
  );
}