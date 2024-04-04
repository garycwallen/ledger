"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

export default function CreateTranscation() {
  const router = useRouter();
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState(0);
  const [location, setLocation] = useState("");

  const createTransaction = api.transcation.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setType("Expense");
      setAmount(0);
      setLocation("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTransaction.mutate({
          type,
          amount,
          location,
        });
      }}
      className="flex flex-col gap-2"
    >
      <select
        name="type"
        required
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
        defaultValue="Expense"
      >
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        min={0.01}
        step={0.01}
        required
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setAmount(e.target.valueAsNumber)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createTransaction.isPending}
      >
        {createTransaction.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
