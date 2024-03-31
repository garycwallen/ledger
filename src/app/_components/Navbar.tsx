import Image from "next/image";

import { getServerAuthSession } from "@/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="absolute right-0 top-0">
      {session && (
        <span className="text-white">
          <Image
            src={session.user?.image ?? "https://thispersondoesnotexist.com/"}
            width={50}
            height={50}
            alt="User Profile Photo"
            className="rounded-full"
          />
          {session.user?.name}
        </span>
      )}
    </div>
  );
}
