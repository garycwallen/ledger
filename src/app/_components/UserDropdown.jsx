import { Avatar, Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { getServerAuthSession } from "@/server/auth";

export default async function UserDropdown() {
  const session = await getServerAuthSession();
  return (
    <Dropdown
      label={<Avatar alt="User settings" img={session?.user.image} rounded />}
      arrowIcon={false}
      inline
    >
      <DropdownHeader>
        <span className="block text-sm">{session?.user.name}</span>
        <span className="block truncate text-sm font-medium">
          {session?.user.email}
        </span>
      </DropdownHeader>
      <DropdownItem>
        <a href="/api/auth/signout">Sign out</a>
      </DropdownItem>
    </Dropdown>
  );
}
