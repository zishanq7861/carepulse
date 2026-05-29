"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const SearchParamInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }

    router.push(`/admin?${params.toString()}`);
  };

  return (
    // 🚀 Using explicit dark background classes to force the design language to align
    <div className="w-full max-w-md flex items-center gap-3 rounded-xl border border-[#1E293B] bg-[#1E293B] px-4 py-2.5 shadow-xl transition-all duration-200 focus-within:border-[#24AE7C]">
      {/* 🚀 Inline SVG ensures the magnifying glass renders perfectly with zero broken image paths */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5 text-[#64748B]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      
      <input
        type="text"
        placeholder="Search patients by name..."
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-transparent text-[14px] font-medium text-white placeholder-[#64748B] outline-none"
      />
    </div>
  );
};