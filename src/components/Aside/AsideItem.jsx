import Link from "next/link";
import { Button } from "primereact/button";

export default function AsideItem({
  TbIcon,
  label,
  href,
  active,
  className = "",
  simple = false,
  ...props
}) {
  if (!href) {
    href = "#";
  }

  return (
    <Button
      {...props}
      as={Link}
      href={href}
      variant="light"
      className={` w-full flex aside-menus bg-transparent border-0 items-center justify-start p-2 pl-0 mb-1 ${
        active ? "text-primary-500" : "text-parent"
      } ${className}`}
    >
      {!simple && (
        <div
          className={`h-full w-1 rounded bg-primary-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* {!!TbIcon && <Icon TbIcon={TbIcon} size={20} />} */}
      <a href={href}>
        <div className="ml-2 ">{label}</div>
      </a>
    </Button>
  );
}
