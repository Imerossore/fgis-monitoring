//Divisions and Systems

export const Divisions = [
  {
    id: 1,
    name: "division-i",
    systems: [
      {
        id: 1,
        name: "System 1",
        link: "/dashboard/division-i/system/1",
      },
      {
        id: 2,
        name: "System 2",
        link: "/dashboard/division-i/system/2",
      },
      {
        id: 3,
        name: "System 3",
        link: "/dashboard/division-i/system/3",
      },
      {
        id: 4,
        name: "System 4",
        link: "/dashboard/division-i/system/4",
      },
      {
        id: 5,
        name: "System 5",
        link: "/dashboard/division-i/system/5",
      },
    ],
  },
  {
    id: 2,
    name: "division-ii",
    systems: [
      {
        id: 1,
        name: "System 1",
        link: "/dashboard/division-ii/system/1",
      },
      {
        id: 2,
        name: "System 2",
        link: "/dashboard/division-ii/system/2",
      },
      {
        id: 3,
        name: "System 3",
        link: "/dashboard/division-ii/system/3",
      },
      {
        id: 4,
        name: "System 4",
        link: "/dashboard/division-ii/system/4",
      },
      {
        id: 5,
        name: "System 5",
        link: "/dashboard/division-ii/system/5",
      },
    ],
  },
  {
    id: 3,
    name: "division-iii",
    systems: [
      {
        id: 1,
        name: "System 1",
        link: "/dashboard/division-iii/system/1",
      },
      {
        id: 2,
        name: "System 2",
        link: "/dashboard/division-iii/system/2",
      },
      {
        id: 3,
        name: "System 3",
        link: "/dashboard/division-iii/system/3",
      },
      {
        id: 4,
        name: "System 4",
        link: "/dashboard/division-iii/system/4",
      },
      {
        id: 5,
        name: "System 5",
        link: "/dashboard/division-iii/system/5",
      },
      {
        id: 6,
        name: "System 6",
        link: "/dashboard/division-iii/system/6",
      },
      {
        id: 7,
        name: "System 7",
        link: "/dashboard/division-iii/system/7",
      },
      {
        id: 8,
        name: "System 8",
        link: "/dashboard/division-iii/system/8",
      },
    ],
  },
  {
    id: 4,
    name: "division-iv",
    systems: [
      {
        id: 1,
        name: "System I",
        link: "/dashboard/division-iv/system/1",
      },
    ],
  },
  {
    id: 5,
    name: "division-v",
    systems: [
      {
        id: 1,
        name: "System I",
        link: "/dashboard/division-v/system/1",
      },
    ],
  },
  {
    id: 6,
    name: "division-vi",
    systems: [
      {
        id: 1,
        name: "System I",
        link: "/dashboard/division-vi/system/1",
      },
    ],
  },
  {
    id: 7,
    name: "drd",
    systems: [
      {
        id: 1,
        name: "System I",
        link: "/dashboard/drd/system/1",
      },
    ],
  },
];

//Menu Items

import { FaChartPie, FaUsers, FaFlag } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

export const iconMap: Record<string, React.ComponentType> = {
  dashboard: MdDashboard,
  analytics: FaChartPie,
  "user-management": FaUsers,
  reports: FaFlag,
  setting: IoSettingsSharp,
};

export const menuItems = [
  {
    title: "MAIN MENU",
    items: [
      {
        icon: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: "analytics",
        label: "Analytics",
        href: "/analytics",
      },
      {
        icon: "user-management",
        label: "User Management",
        href: "/user-management",
      },
    ],
  },
  {
    title: "OTHER MENU",
    items: [
      {
        icon: "reports",
        label: "Reports",
        href: "/reports",
      },
      {
        icon: "setting",
        label: "Setting",
        href: "/setting",
      },
    ],
  },
];

//System table column and rows

export const columns = ["System", "Target", "Actual", "Percentage", "Status"];
export const rows = [
  "Operational",
  "Non Operational",
  "FUSA",
  "Newly Generated",
  "PNR",
  "Converted",
  "SA",
];
