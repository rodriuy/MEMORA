"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  LayoutGrid,
  UploadCloud,
  ScanLine,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { href: "/dashboard/explore", label: "Explorar Memorias", icon: LayoutGrid },
  { href: "/dashboard/upload", label: "Subir Historia", icon: UploadCloud },
  { href: "/dashboard/nfc-simulation", label: "Simulación NFC", icon: ScanLine },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Simulate logout
    router.push('/');
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Logo />
          <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: "right" }}
                onClick={() => router.push(item.href)}
              >
                <div>
                  <item.icon />
                  <span>{item.label}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center gap-3 px-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/100" alt="User" data-ai-hint="person face" />
            <AvatarFallback>FR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold truncate">
              Familia Rodriguez
            </span>
            <span className="text-xs text-muted-foreground truncate">
              familia.rodriguez@email.com
            </span>
          </div>
        </div>
        <Button variant="ghost" className="justify-start gap-2 text-muted-foreground" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
