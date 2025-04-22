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

interface Membership {
  id: number;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

// Membership Panel Component
export default function MembershipPanel() {
  const memberships: Membership[] = [
    {
      id: 1,
      name: "Basic",
      price: 29.99,
      duration: "1 month",
      features: ["Access to gym", "Locker usage"],
    },
    {
      id: 2,
      name: "Premium",
      price: 49.99,
      duration: "1 month",
      features: ["Access to gym", "Locker usage", "Group classes"],
    },
    {
      id: 3,
      name: "VIP",
      price: 99.99,
      duration: "1 month",
      features: [
        "Access to gym",
        "Locker usage",
        "Group classes",
        "Personal trainer",
      ],
    },
  ];

  const columns: ColumnDef<Membership>[] = [
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
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "features",
      header: "Features",
      cell: ({ row }) => {
        const features = row.getValue("features") as string[];
        return <div>{features.join(", ")}</div>;
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Management</CardTitle>
        <CardDescription>Manage membership plans</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={memberships} />
      </CardContent>
    </Card>
  );
}
