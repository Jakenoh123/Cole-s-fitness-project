"use client";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/ui/data-table";

interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: string;
  joinDate: string;
}

// Member Panel Component
export default function MembersPanel() {
  const members: Member[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      membershipType: "Premium",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      membershipType: "Basic",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      membershipType: "VIP",
      joinDate: "2023-03-10",
    },
  ];

  const columns: ColumnDef<Member>[] = [
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
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "membershipType",
      header: "Membership Type",
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members Management</CardTitle>
        <CardDescription>Manage gym members</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={members} />
      </CardContent>
    </Card>
  );
}
