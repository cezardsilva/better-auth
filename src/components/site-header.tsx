import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AvatarMenu } from "../app/dashboard/_components/avatar-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type SiteHeaderProps = {
  user: { name: string; image?: string };
};

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <ThemeToggle />
        <div className="ml-auto flex items-center gap-2">
          <AvatarMenu user={user} />
        </div>
      </div>
    </header>
  );
}
