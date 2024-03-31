import Image from "next/image";

import { getServerAuthSession } from "@/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <header className="container mx-auto max-w-2xl px-6 py-6">
      <div className="absolute right-0 top-0">
        {/* User Session Information */}
        {session && (
          <div className="flex items-center gap-2">
            {/* User Image */}
            <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
              <Image
                src={
                  session.user?.image ?? "https://thispersondoesnotexist.com/"
                }
                width={50}
                height={50}
                alt={session.user?.name ?? "User Profile Photo"}
                className="h-full w-full object-cover"
              />
            </div>

            {/* User Greeting */}
            <small className="text-white">Hi, {session.user?.name}!</small>
          </div>
        )}

        {/* Sign In/Out Functionality */}
      </div>
    </header>
  );
}
