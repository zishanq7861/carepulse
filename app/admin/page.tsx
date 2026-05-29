import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { SearchParamInput } from "@/components/SearchParamInput"; 
import { StatusFilterTabs } from "@/components/StatusFilterTabs";
import { ExportReportButton } from "@/components/ExportReportButton"; // 🚀 Imported here
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchQuery = (searchParams?.search as string) || "";
  const statusFilter = (searchParams?.status as string) || "all";
  
  const appointments = await getRecentAppointmentList(searchQuery, statusFilter);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full flex flex-col md:flex-row md:items-center justify-start gap-8 md:gap-12">
          <div className="space-y-1">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">
              Start the day with managing new appointments
            </p>
          </div>
          
          <div className="w-full md:max-w-md">
            <SearchParamInput />
          </div>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount || 0}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount || 0}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount || 0}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        {/* 🚀 Wrapper container to hold tabs on left and Export Button on right */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-dark-500 pb-2">
          <StatusFilterTabs currentStatus={statusFilter} />
          <ExportReportButton data={appointments?.documents || []} />
        </div>

        <DataTable columns={columns} data={appointments?.documents || []} />
      </main>
    </div>
  );
};

export default AdminPage;