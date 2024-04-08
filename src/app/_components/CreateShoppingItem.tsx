"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

export default function CreateTranscation() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createShoppingItem = api.shoppingItem.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createShoppingItem.mutate({
          name,
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="name"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createShoppingItem.isPending}
      >
        {createShoppingItem.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
