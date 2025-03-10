//Divisions and Systems

export const Divisions = [
  {
    id: 1,
    name: "division-i",
    systems: [
      {
        id: 1,
        name: "system1",
        link: "/dashboard/division-i/system1",
      },
      {
        id: 2,
        name: "system2",
        link: "/dashboard/division-i/system2",
      },
      {
        id: 3,
        name: "system3",
        link: "/dashboard/division-i/system3",
      },
      {
        id: 4,
        name: "system4",
        link: "/dashboard/division-i/system4",
      },
      {
        id: 5,
        name: "system5",
        link: "/dashboard/division-i/system5",
      },
    ],
  },
  {
    id: 2,
    name: "division-ii",
    systems: [
      {
        id: 1,
        name: "system1",
        link: "/dashboard/division-ii/system1",
      },
      {
        id: 2,
        name: "system2",
        link: "/dashboard/division-ii/system2",
      },
      {
        id: 3,
        name: "system3",
        link: "/dashboard/division-ii/system3",
      },
      {
        id: 4,
        name: "system4",
        link: "/dashboard/division-ii/system4",
      },
      {
        id: 5,
        name: "system5",
        link: "/dashboard/division-ii/system5",
      },
    ],
  },
  {
    id: 3,
    name: "division-iii",
    systems: [
      {
        id: 1,
        name: "system1",
        link: "/dashboard/division-iii/system1",
      },
      {
        id: 2,
        name: "system2",
        link: "/dashboard/division-iii/system2",
      },
      {
        id: 3,
        name: "system3",
        link: "/dashboard/division-iii/system3",
      },
      {
        id: 4,
        name: "system4",
        link: "/dashboard/division-iii/system4",
      },
      {
        id: 5,
        name: "system5",
        link: "/dashboard/division-iii/system5",
      },
      {
        id: 6,
        name: "system6",
        link: "/dashboard/division-iii/system6",
      },
      {
        id: 7,
        name: "system7",
        link: "/dashboard/division-iii/system7",
      },
      {
        id: 8,
        name: "system8",
        link: "/dashboard/division-iii/system8",
      },
    ],
  },
  {
    id: 4,
    name: "division-iv",
    systems: [
      {
        id: 1,
        name: "system1",
        link: "/dashboard/division-iv/system1",
      },
    ],
  },
  {
    id: 5,
    name: "division-v",
    systems: [
      {
        id: 1,
        name: "system1",
        link: "/dashboard/division-v/system1",
      },
    ],
  },
  {
    id: 6,
    name: "division-vi",
    systems: [
      {
        id: 1,
        name: "system1",
        link: "/dashboard/division-vi/system1",
      },
    ],
  },
  {
    id: 7,
    name: "drd",
    systems: [
      {
        id: 1,
        name: "system1",
        link: "/dashboard/drd/system1",
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
