"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, Utensils, ShoppingCart, Users, User2, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AppLogo from "../../assets/images/app-logo.svg";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/modules/admin/auth/auth.action";
import { toast } from "sonner";

export default function AppSidebar() {

    const menus = [
        { id: 1, title: "Dashboard", href: "/admin/dashboard", icon: Home },
        { id: 2, title: "Restaurants", href: "/admin/restaurants", icon: Utensils },
        { id: 3, title: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { id: 4, title: "Users", href: "/admin/users", icon: Users },
    ];

    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const authState = useSelector(state => state.auth);
    const { user } = authState;

    const handleLogout = () => {
        dispatch(authActions.postLogout(
            (response) => {
                if (response.success === true) {
                    toast.success(response.message);
                    router.push('/admin/login');
                }
            },
            (error) => {
                toast.error(error.error || 'Login failed');
                setLoading(false);
            },
        ))
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
                <Link href="/admin/dashboard">
                    <Image src={AppLogo} alt="logo" className="w-[180px]" />
                </Link>
            </SidebarHeader>
            <SidebarContent className="mt-4">
                <SidebarGroup>
                    <SidebarMenu className='gap-4'>
                        {menus.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium
                                                ${isActive ? "bg-brand-orange text-white" : "text-black hover:bg-gray-200"}`}
                                        >
                                            <item.icon size={20} />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="flex items-center cursor-pointer text-black"
                        >
                            <User2 />
                            {user ? user?.email : "admin@pasto.com"}
                            <LogOut className="ml-auto" />
                        </SidebarMenuButton>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> xwxw
                                    <LogOut className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="right"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

