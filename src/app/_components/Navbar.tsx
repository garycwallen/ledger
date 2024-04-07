import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import UserAvatar from "@/app/_components/UserDropdown";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <header className="container mx-auto max-w-2xl px-6 py-6">
      <div className="flex items-center justify-between">
        {/* User Session Information */}
        {session && (
          <div className="flex items-center gap-2">
            {/* User Image */}
            <h1 className="text-3xl font-extrabold tracking-tight">
              <Link href="/">
                Family <span className="text-[hsl(280,100%,70%)]">Ledger</span>
              </Link>
            </h1>
          </div>
        )}
        {/* Sign-out Button */}
        {session && (
          <nav className="flex items-center gap-4">
            <UserAvatar />
          </nav>
        )}
      </div>
    </header>
  );
}
