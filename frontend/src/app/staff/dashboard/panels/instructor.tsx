"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/ui/data-table";

interface Instructor {
  id: number;
  name: string;
  specialty: string;
  contact: string;
  hireDate: string;
}

// Instructor Panel Component
export default function InstructorPanel() {
  const instructors: Instructor[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Yoga",
      contact: "sarah.j@example.com",
      hireDate: "2021-03-15",
    },
    {
      id: 2,
      name: "Mike Smith",
      specialty: "HIIT",
      contact: "mike.s@example.com",
      hireDate: "2022-01-10",
    },
    {
      id: 3,
      name: "Emily Brown",
      specialty: "Strength Training",
      contact: "emily.b@example.com",
      hireDate: "2020-06-25",
    },
  ];

  const columns: ColumnDef<(typeof instructors)[0]>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "specialty", header: "Specialty" },
    { accessorKey: "contact", header: "Contact" },
    { accessorKey: "hireDate", header: "Hire Date" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructor Management</CardTitle>
        <CardDescription>Manage fitness instructors</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={instructors} />
      </CardContent>
    </Card>
  );
}
