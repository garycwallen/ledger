"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PAGE_SIZE_OPTIONS = [50, 100, 250, 500, "all"] as const;

export default function PaginationControls({ totalItems }: { totalItems: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageSize, setPageSize] = useState<number | string>(() => {
    const urlParam = searchParams.get("pageSize");
    if (!urlParam) return 100;
    return urlParam === "all" ? "all" : parseInt(urlParam) || 100;
  });

  // On first load with no URL param, apply saved preference from localStorage
  useEffect(() => {
    const urlParam = searchParams.get("pageSize");
    if (!urlParam) {
      const saved = localStorage.getItem("transactionPageSize");
      if (saved) {
        const size = saved === "all" ? "all" : parseInt(saved) || 100;
        setPageSize(size);
        const params = new URLSearchParams(searchParams.toString());
        params.set("pageSize", saved);
        router.push(`?${params.toString()}`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageSizeChange = (newSize: number | string) => {
    setPageSize(newSize);
    const value = newSize === "all" ? "all" : newSize.toString();
    localStorage.setItem("transactionPageSize", value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4 border-t border-gray-100 px-5 py-4">
      <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
        Items per page:
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) =>
          handlePageSizeChange(
            e.target.value === "all" ? "all" : parseInt(e.target.value)
          )
        }
        className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        {PAGE_SIZE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option === "all" ? "All" : option}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-600">Total: {totalItems}</span>
    </div>
  );
}
