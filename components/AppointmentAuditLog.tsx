"use client";

import { Appointment } from "@/types/appwrite.types";
import { formatDateTime } from "@/lib/utils";

interface TimelineEvent {
  title: string;
  description: string;
  date: string;
  status: string;
  color: string;
}

export const AppointmentAuditLog = ({ appointment }: { appointment: Appointment }) => {
  const timelineEvents: TimelineEvent[] = [
    {
      title: "Appointment Booked",
      description: `The patient submitted a request for an appointment with ${appointment.primaryPhysician}.`,
      date: formatDateTime(appointment.$createdAt).dateTime,
      status: "pending",
      color: "border-blue-500 bg-blue-500",
    },
    ...(appointment.status !== "pending" ? [
      {
        title: appointment.status === "scheduled" ? "Appointment Confirmed" : "Appointment Cancelled",
        description: appointment.status === "scheduled" 
          ? `Admin approved this appointment time slot.`
          : `Reason for cancellation: ${appointment.cancellationReason || "No reason given."}`,
        date: formatDateTime(appointment.$updatedAt).dateTime,
        status: appointment.status,
        color: appointment.status === "scheduled" ? "border-green-500 bg-green-500" : "border-red-500 bg-red-500",
      },
      {
        title: "Confirmation Email Sent",
        description: `The system successfully sent an email update straight to the patient.`,
        date: formatDateTime(appointment.$updatedAt).dateTime,
        status: "notified",
        color: "border-purple-500 bg-purple-500",
      }
    ] : [])
  ];

  return (
    <div className="flex flex-col space-y-6 bg-[#1A1F2C] p-5 rounded-xl border border-dark-500 max-w-sm w-full text-left">
      <div className="flex flex-col gap-1">
        {/* 🚀 Simple headers */}
        <h3 className="text-14-semibold text-white">Activity Timeline</h3>
        <p className="text-12-regular text-dark-700">Real-time tracking status logs</p>
      </div>

      <div className="relative border-l border-dark-500 ml-3 space-y-6">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative pl-6">
            <span className={`absolute -left-[6px] top-1.5 flex h-3 w-3 rounded-full border-2 ${event.color}`} />
            
            <div className="flex flex-col gap-1">
              <span className="text-14-medium text-white">{event.title}</span>
              <span className="text-12-regular text-dark-700">{event.description}</span>
              <span className="text-10-regular text-dark-600 mt-1 font-mono">{event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};