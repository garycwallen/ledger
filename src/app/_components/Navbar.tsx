import Image from "next/image";

import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <header className="container mx-auto max-w-2xl px-6 py-6">
      <div className="flex items-center justify-between">
        {/* User Session Information */}
        {session && (
          <div className="flex items-center gap-2">
            {/* User Image */}
            <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
              <Image
                src={
                  session.user.image ?? "https://thispersondoesnotexist.com/"
                }
                width={50}
                height={50}
                alt={session.user.name ?? "User Profile Photo"}
                className="h-full w-full object-cover"
              />
            </div>

            {/* User Name */}
            <small>Hi, {session.user.name}!</small>
          </div>
        )}
        {/* Sign-out Button */}
        {session && (
          <nav className="flex items-center gap-4">
            <div>
              <Link
                href="/api/auth/signout"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                Sign out
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
