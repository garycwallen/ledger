"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Transaction } from "./types";

interface DeleteTransactionProps {
  transaction: Transaction;
}

export default function DeleteTransaction({
  transaction,
}: DeleteTransactionProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const utils = api.useUtils();
  const deleteMutation = api.transcation.delete.useMutation({
    onSuccess: async () => {
      try {
        // Wait for cache invalidation
        await utils.transcation.getAll.invalidate();
        router.refresh();
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error invalidating cache:", error);
      }
    },
  });

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate({ id: transaction.id });
  };

  return (
    <>
      <button onClick={handleDelete} className="rounded p-1 hover:bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500 hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowDeleteModal(false)}
          ></div>

          <div className="relative rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium">Delete Transaction</h3>
            <p className="mb-6 text-sm text-gray-500">
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
