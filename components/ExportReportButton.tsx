"use client";

import Image from "next/image";
import { Appointment } from "@/types/appwrite.types";

export const ExportReportButton = ({ data }: { data: Appointment[] }) => {
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert("No data available to export!");
      return;
    }

    const headers = ["Patient Name", "Status", "Appointment Date", "Doctor"];

    const rows = data.map((appointment) => [
      appointment.patients?.name || "Unknown",
      appointment.status?.toUpperCase(),
      new Date(appointment.schedule).toLocaleString(),
      appointment.primaryPhysician,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `carepulse_appointments_report.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center gap-2 rounded-lg border border-dark-500 bg-dark-300 px-4 py-2 text-14-medium text-white transition-all hover:bg-dark-400 shadow-md"
    >
      <Image
        // 🚀 Swapped to appointments.svg so it renders a beautiful calendar/document icon instantly!
        src="/assets/icons/appointments.svg" 
        height={16}
        width={16}
        alt="download"
        className="brightness-200"
      />
      Export Report
    </button>
  );
};