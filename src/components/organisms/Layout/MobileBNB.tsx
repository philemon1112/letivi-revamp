"use client";
import { useState } from "react";
import { MouseEvent } from "react";
import { RiHome2Line, RiLogoutBoxRLine } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Modal from "@/components/molecules/Modal";
import { logoutUser } from "@/services/login";

function MobileBottomNavigationBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  const showModal = () => {
    console.log("modal opens");
    setOpen(true);
  };

  const menus = [
    {
      name: "Home",
      link: "/feed",
      icon: <RiHome2Line />,
    },
    {
      name: "Explore",
      link: "#",
      icon: <AiOutlineFileSearch />,
      dropdown: [
        { label: "All", value: "explore" },
        { label: "Nature", value: "nature" },
        { label: "Professionals", value: "professionals" },
        { label: "Lifestyle", value: "lifestyle" },
        { label: "Culture", value: "culture" },
        { label: "Animals", value: "animals" },
        { label: "Workspaces", value: "workspaces" },
      ],
      action: showModal,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <CgUserList />,
    },
    {
      name: "Messages",
      link: "/messages",
      icon: <TiMessages />,
    },
    // {
    //   name: "Notifications",
    //   link: "/notifications",
    //   icon: <MdOutlineNotificationsNone />,
    // },
    {
      name: "Logout",
      link: "#",
      icon: <RiLogoutBoxRLine />,
      action: handleLogout,
    },
  ];

  const handleMenuClick = (
    menu: (typeof menus)[number],
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (menu.action) {
      e.preventDefault();
      menu.action();
    }
  };

  return (
    <div>
      <Modal
        show={open}
        actionButtonVariant="primary"
        onCloseAction={() => setOpen(false)}
        overlay="light"
        className="!p-4 !py-2"
      >
        <div
          className=" bg-white"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {menus[1]?.dropdown?.map((menu, index) => (
              <Link
                key={index}
                href={menu.value}
                className={`block px-4 py-2 text-base font-medium ${
                  pathname === menu.value ? "text-na_blue" : "text-gray-700"
                }`}
                role="menuitem"
                id="menu-item-0"
              >
                {menu.label}
              </Link>
            ))}
          </div>
        </div>
      </Modal>
      <header className="header z-50 xl:hidden rounded-t-3xl shadow-2xl fixed bottom-0 inset-x-0 grid border-b backdrop-blur-lg bg-white/80 border-gray-400 w-full">
        <div className="flex justify-around items-center px-4 py-1 text-na_blue">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-lg cursor-pointer"
              onClick={(e) => handleMenuClick(menu, e)}
            >
              <Link
                href={menu.link}
                className={`${
                  pathname === menu.link
                    ? "active bg-na_blue px-4 rounded-md py-1 text-white"
                    : "text-na_blue"
                } flex flex-col items-center`}
              >
                {menu.icon}
                <h1 className="text-[8px]">{menu.name}</h1>
              </Link>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default MobileBottomNavigationBar;
