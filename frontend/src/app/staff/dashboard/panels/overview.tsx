// panels/OverviewPanel.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ui/data-table";

interface Metric {
  title: string;
  value: string;
  icon: React.ReactNode;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  date: string;
}

const metrics: Metric[] = [
  {
    title: "Total Members",
    value: "1,234",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a10 10 0 10-20 0v2h5m15 0v-2a10 10 0 00-20 0v2h20z"
        />
      </svg>
    ),
  },
  {
    title: "Active Subscriptions",
    value: "567",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: "Total Revenue",
    value: "$45,678",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 1.343-3 3 0 1.306.835 2.417 2 2.83V15h2v-1.17c1.165-.413 2-1.524 2-2.83 0-1.657-1.343-3-3-3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14"
        />
      </svg>
    ),
  },
  {
    title: "New Signups",
    value: "89",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m4-4v4m4-4v4m-8-4v4"
        />
      </svg>
    ),
  },
];

const lineChartData = [
  { month: "Jan", members: 400 },
  { month: "Feb", members: 300 },
  { month: "Mar", members: 500 },
  { month: "Apr", members: 700 },
  { month: "May", members: 600 },
  { month: "Jun", members: 800 },
  { month: "Jul", members: 750 },
  { month: "Aug", members: 900 },
  { month: "Sep", members: 850 },
  { month: "Oct", members: 950 },
  { month: "Nov", members: 1000 },
  { month: "Dec", members: 1100 },
];

const barChartData = [
  { branch: "Downtown", revenue: 30000 },
  { branch: "Uptown", revenue: 25000 },
  { branch: "Suburb", revenue: 20000 },
  { branch: "Eastside", revenue: 15000 },
  { branch: "Westside", revenue: 18000 },
];

const activities: Activity[] = [
  {
    id: 1,
    user: "Alice Johnson",
    action: "Joined the gym",
    date: "2024-04-01",
  },
  {
    id: 2,
    user: "Bob Smith",
    action: "Upgraded membership",
    date: "2024-04-02",
  },
  {
    id: 3,
    user: "Charlie Brown",
    action: "Cancelled subscription",
    date: "2024-04-03",
  },
  {
    id: 4,
    user: "Diana Prince",
    action: "Joined the gym",
    date: "2024-04-04",
  },
  {
    id: 5,
    user: "Ethan Hunt",
    action: "Participated in event",
    date: "2024-04-05",
  },
];

const activityColumns: ColumnDef<Activity>[] = [
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

export default function OverviewPanel() {
  return (
    <div className="space-y-6">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="flex items-center p-4">
            <div className="p-3 rounded-full bg-gray-100">{metric.icon}</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {metric.title}
              </p>
              <p className="text-xl font-semibold text-gray-900">
                {metric.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Member Growth Over Time</CardTitle>
            <CardDescription>Monthly member signups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="members" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Branch</CardTitle>
            <CardDescription>Monthly revenue distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activities Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={activityColumns} data={activities} />
        </CardContent>
      </Card>
    </div>
  );
}
