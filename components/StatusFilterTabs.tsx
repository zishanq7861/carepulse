"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const StatusFilterTabs = ({ currentStatus }: { currentStatus: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statuses = [
    { label: "All Appointments", value: "all" },
    { label: "Scheduled", value: "scheduled" },
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (status && status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    // 🚀 Smoothly updates the URL bar with your new status selection!
    router.push(`/admin?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-dark-500 pb-2">
      {statuses.map((tab) => {
        const isActive = currentStatus === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => handleStatusChange(tab.value)}
            className={`px-4 py-2 text-14-medium rounded-lg transition-all ${
              isActive
                ? "bg-green-500 text-black font-semibold shadow-md"
                : "text-dark-700 hover:text-white hover:bg-dark-400"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};