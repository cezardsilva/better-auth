import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ButtonSignOut } from "./_components/button-signout";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/");
  }

  return (
    <>
    <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <div className="fixed top-4 right-4 z-50">
        <Avatar>
          <AvatarImage src={session.user.image || undefined} alt={session.user.name || "Avatar"} />
          <AvatarFallback>
            {session.user.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="container mx-auto min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-2">Página dashboard</h1>
        <h3>Usuario logado: {session.user.name}</h3>
        <ButtonSignOut />
      </div>
    </>
  );
}
