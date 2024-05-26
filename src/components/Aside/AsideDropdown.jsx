"use client";

import AsideDropdownItem from "./AsideDropdownItem";
import AsideItem from "./AsideItem";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AsideDropdown({
  items,
  itemClassName = "",
  className = "",
  ...props
}) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setOpen(props.active);
  }, [props.active]);

  return (
    <div>
      <AsideItem
        {...props}
        onClick={() => {
          setOpen(!open);
        }}
        endContent={
          open ? (
            <i className="pi-angle-left" style={{ fontSize: "2rem" }}></i>
          ) : (
            <i className="pi-angle-right" style={{ fontSize: "2rem" }}></i>
          )
        }
      />
      {open && (
        <div className="ml-8 mt-2 p-2 bg-default-500 bg-opacity-20 rounded-large">
          {items.map((item, index) => (
            <AsideDropdownItem
              {...item}
              active={pathName.startsWith(item.href ?? "")}
              key={index}
              className={itemClassName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
