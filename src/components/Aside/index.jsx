"use client";

import AsideItem from "./AsideItem";
import { usePathname } from "next/navigation";
import asideMenus from "@/utils/asideMenus";
import { useSession } from "next-auth/react";

export default function Aside({ menuDisabled, className = "" }) {
  const pathName = usePathname();
  const session = useSession();
  let activeMenu = "";
  let userRole = session ? session?.data?.user : {};
  console.log(userRole, asideMenus, "scskvksk");

  return (
    <aside
      className={`fixed pt-10 left-0 h-full z-30 overflow-y-auto overflow-x-hidden rounded-tr-large group"
      } ${className}`}
    >
      {asideMenus.map((menu, index) => {
        if (pathName == menu.href || pathName.startsWith(menu.href ?? "*")) {
          activeMenu = menu.label;
        }
        return (
          <AsideItem
            key={menu.label + index}
            active={activeMenu == menu.label}
            TbIcon={menu.TbIcon}
            label={menu.label}
            href={menu.href}
            className={menuDisabled ? "hidden group-hover:flex" : ""}
          />
        );
      })}
    </aside>
  );
}
