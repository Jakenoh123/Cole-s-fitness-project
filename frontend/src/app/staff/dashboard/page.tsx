"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Menu,
  ChevronUp,
  ChevronDown,
  MoreHorizontalIcon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ui/data-table";
import BranchPanel from "./panels/branch";
import ClassPanel from "./panels/class";
import InstructorPanel from "./panels/instructor";
import EquipmentPanel from "./panels/equipment";
import MembersPanel from "./panels/member";
import MembershipPanel from "./panels/membership";
import ProfilePanel from "./panels/profile";
import RoomPanel from "./panels/room";
import SchedulingPanel from "./panels/scheduling";
import { useRouter } from "next/navigation";
import OverviewPanel from "./panels/overview";

// Types
type Role = "admin" | "manager" | "staff";
type PanelType =
  | "overview"
  | "equipment"
  | "instructors"
  | "membership"
  | "members"
  | "profile"
  | "branch"
  | "room"
  | "class"
  | "scheduling"
  | "roles";

interface UserRole {
  id: number;
  name: string;
  permissions: string[];
}

const currentUser = {
  name: "John Doe",
  role: "admin" as Role,
  email: "john.doe@example.com",
  avatar: "/placeholder.svg",
};

// Mock data and utilities
const userRoles: Record<Role, PanelType[]> = {
  admin: [
    "overview",
    "equipment",
    "instructors",
    "membership",
    "members",
    "profile",
    "branch",
    "room",
    "class",
    "scheduling",
    "roles",
  ],
  manager: [
    "overview",
    "equipment",
    "instructors",
    "membership",
    "members",
    "profile",
    "room",
    "class",
    "scheduling",
  ],
  staff: ["profile", "class", "scheduling"],
};

// Roles Panel Component
function RolesPanel() {
  const roles: UserRole[] = [
    { id: 1, name: "Admin", permissions: ["All access"] },
    {
      id: 2,
      name: "Manager",
      permissions: [
        "Equipment management",
        "Member management",
        "Class management",
      ],
    },
    { id: 3, name: "Staff", permissions: ["View schedules", "Update profile"] },
  ];

  const columns: ColumnDef<UserRole>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => {
        const permissions = row.getValue("permissions") as string[];
        return <div>{permissions.join(", ")}</div>;
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles Management</CardTitle>
        <CardDescription>Manage user roles</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={roles} />
      </CardContent>
    </Card>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState<PanelType>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const panels = {
    overview: { title: "Overview", component: OverviewPanel },
    equipment: { title: "Equipment Management", component: EquipmentPanel },
    membership: { title: "Membership Management", component: MembershipPanel },
    members: { title: "Members Management", component: MembersPanel },
    profile: { title: "User Profile", component: ProfilePanel },
    branch: { title: "Branch Management", component: BranchPanel },
    room: { title: "Room Management", component: RoomPanel },
    class: { title: "Class Management", component: ClassPanel },
    scheduling: { title: "Scheduling", component: SchedulingPanel },
    roles: { title: "Roles Management", component: RolesPanel },
    instructors: {
      title: "Instructors Management",
      component: InstructorPanel,
    },
    employees: { title: "Employees Management", component: RolesPanel },
  } as const;

  const accessiblePanels = userRoles[currentUser.role];

  useEffect(() => {
    console.log(activePanel);
    if (!accessiblePanels.includes(activePanel)) {
      setActivePanel(accessiblePanels[0]);
    }
  }, [accessiblePanels, activePanel]);

  const handleLogout = () => {
    // Implement logout logic here
    router.replace("/");
  };

  const PanelComponent = panels[activePanel].component;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Staff Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button onClick={handleLogout}>
              Logout <LogOut></LogOut>
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside
            className={`w-full md:w-64 ${
              isMobileMenuOpen ? "block" : "hidden md:block"
            }`}
          >
            <nav className="space-y-2">
              {accessiblePanels.map((panel) => (
                <Button
                  key={panel}
                  variant={activePanel === panel ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActivePanel(panel);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {panels[panel].title}
                </Button>
              ))}
            </nav>
          </aside>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">
              {panels[activePanel].title}
            </h2>
            <PanelComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
