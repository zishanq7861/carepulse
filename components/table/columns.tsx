"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppointmentAuditLog } from "../AppointmentAuditLog";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patients?.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8 rounded-full"
          />
          <p className="whitespace-nowrap">{doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <AppointmentModal
              patientId={appointment.patients?.$id}
              userId={appointment.userId}
              appointment={appointment}
              type="schedule"
              title="Schedule Appointment"
              description="Please confirm the following details to schedule."
            />
            <AppointmentModal
              patientId={appointment.patients?.$id}
              userId={appointment.userId}
              appointment={appointment}
              type="cancel"
              title="Cancel Appointment"
              description="Are you sure you want to cancel your appointment?"
            />
          </div>
          
          {/* 🚀 Beautiful Modal Overlay Layer */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 bg-dark-300 hover:bg-dark-400 border border-dark-500 rounded-lg px-3 py-1.5 transition-all text-12-medium text-light-200">
                <Image
                  src="/assets/icons/appointments.svg"
                  height={14}
                  width={14}
                  alt="history"
                  className="opacity-70 brightness-200"
                />
                <span>History</span>
              </button>
            </DialogTrigger>
            
            <DialogContent className="shad-dialog sm:max-w-md border-dark-500 bg-dark-200">
              <DialogHeader className="mb-4 space-y-3">
                {/* 🚀 Simplified human-readable content copy matches your brand voice */}
                <DialogTitle className="text-left text-white">Appointment History</DialogTitle>
                <DialogDescription className="text-left">
                  See what happened with {appointment.patients?.name}&apos;s appointment step-by-step.
                </DialogDescription>
              </DialogHeader>

              {/* Injected Timeline Display */}
              <AppointmentAuditLog appointment={appointment} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];