"use client";

interface NavLink {
  name: string;
  path: string;
  icon?: string;
  children?: NavLink[];
}

const PAGES: NavLink[] = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: "/assets/icons/dashboard.svg",
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: "/assets/icons/users.svg",
    children: [
      { name: "Administrators", path: "/admin/administrators" },
      { name: "All Users", path: "/admin/users" },
      { name: "Add User", path: "/admin/users/create" },
    ],
  },
  {
    name: "Workspaces",
    path: "/admin/workspace",
    icon: "/assets/icons/workspace.svg",
    children: [
      { name: "Business Workspace", path: "/admin/workspace/business" },
      { name: "Project Workspace", path: "/admin/workspace/project" },
      { name: "Events Workspace", path: "/admin/workspace/event" },
    ],
  },
  {
    name: "Industries",
    path: "/admin/industries",
    icon: "/assets/icons/industry.svg",
  },
  {
    name: "Roles and Permissions",
    path: "/admin/user-roles",
    icon: "/assets/icons/roles.svg",
  },
  {
    name: "Email Broadcast",
    path: "/admin/email-broadcast",
    icon: "/assets/icons/email.svg",
  },
  {
    name: "Account",
    path: "/admin/settings",
    icon: "/assets/icons/account.svg",
    children: [
      { name: "Settings", path: "/admin/settings" },
      { name: "Logout", path: "/logout" },
    ],
  },
];

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getApiMedia } from "@/utils/getApiMedia";

interface SideBarProps {
  isMobile: boolean;
}

function SideBar({ isMobile }: SideBarProps) {
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const defaultImg = "/assets/Img/default.png";

  const isLinkActive = (path: string) => pathname === path;
  const isGroupActive = (group: NavLink) =>
    group.children?.some((child) => pathname === child.path);

  const NavItem = ({ item }: { item: NavLink }) => {
    if (item.children) {
      return (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
              isGroupActive(item) ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-sm font-medium">{item.name}</span>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <ul className="mt-2 space-y-1 px-4">
            {item.children.map((child, idx) => (
              <li key={idx}>
                <Link
                  href={child.path}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                    isLinkActive(child.path)
                      ? "bg-[#0BC5EA] text-white"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      );
    }

    return (
      <Link
        href={item.path}
        className={`block rounded-lg px-4 py-2 text-sm font-medium ${
          isLinkActive(item.path)
            ? "bg-[#0BC5EA] text-white"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <div
      className={`${
        isMobile
          ? " flex flex-col h-full justify-between overflow-x-hidden overflow-y-auto"
          : "hidden md:flex md:w-64 md:flex-col fixed h-full overflow-y-auto overflow-x-hidden flex-col justify-between border-e bg-white"
      }`}
    >
      <div className="px-4 py-6">
        <span className="grid place-content-center rounded-lg text-xs text-gray-600">
          <Image
            className="w-auto"
            src="/assets/Img/mobile.png"
            alt=""
            width={45}
            height={45}
          />
        </span>

        <ul className="mt-4 space-y-1">
          {PAGES.map((page, index) => (
            <li key={index}>
              <NavItem item={page} />
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <Link
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <img
            alt=""
            src={
              currentUser?.profile?.picture
                ? getApiMedia(currentUser?.profile?.picture)
                : defaultImg
            }
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="text-xs">
              <strong className="block font-medium">
                {currentUser?.first_name} {currentUser?.last_name}
              </strong>
              <span>{currentUser?.email ?? "N/A"}</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
