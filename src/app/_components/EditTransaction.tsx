"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Transaction } from "./types";

interface EditTransactionProps {
  transaction: Transaction;
}

export default function EditTransaction({ transaction }: EditTransactionProps) {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(transaction.type);
  const [amount, setAmount] = useState(transaction.amount);
  const [location, setLocation] = useState(transaction.location);
  const [createdAt, setCreatedAt] = useState(transaction.createdAt);
  const router = useRouter();

  const utils = api.useUtils();
  const updateMutation = api.transcation.update.useMutation({
    onSuccess: async () => {
      try {
        await utils.transcation.getAll.invalidate();
        router.refresh();
        setShowModal(false);
      } catch (error) {
        console.error("Error invalidating cache:", error);
      }
    },
  });

  const handleOpen = () => {
    setType(transaction.type);
    setAmount(transaction.amount);
    setLocation(transaction.location);
    setCreatedAt(transaction.createdAt);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id: transaction.id, type, amount, location, createdAt });
  };

  return (
    <>
      <button onClick={handleOpen} className="group rounded p-1 hover:bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500 group-hover:text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.415.586H8v-2.414a2 2 0 01.586-1.414z"
          />
        </svg>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-60"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-80 rounded-2xl bg-gradient-to-b from-[#2e026d] to-[#15162c] p-6 shadow-2xl ring-1 ring-white/10">
            <h3 className="mb-4 text-lg font-semibold text-white">Edit Transaction</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "Expense" | "Income")}
                className="w-full rounded-full px-4 py-2 text-black"
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
                onChange={(e) => setAmount(e.target.valueAsNumber)}
                className="w-full rounded-full px-4 py-2 text-black"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                required
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-full px-4 py-2 text-black"
              />
              <DatePicker
                selected={createdAt}
                onChange={(date: Date) => setCreatedAt(date)}
                className="w-full rounded-full px-4 py-2 text-black"
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white hover:bg-purple-500 disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
