import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import LogoutButton from "@/components/LogoutButton"; // Importujemo dugme
import AuthWrapper from "@/components/AuthWrapper"; // Dodali smo AuthWrapper

const Admin = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <AuthWrapper>
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              height={32}
              width={162}
              alt="logo"
              className="h-8 w-fit"
            />
          </Link>
          <p className="text-16-semibold">Administratorski panel</p>

          <div className="flex space-x-4">
            <Link
              href="/grainsilo"
              className="shad-secondary-btn px-4 py-2 text-white bg-blue-600 rounded-lg hover:shad-secondary-hover-btn"
            >
              Grain Silo
            </Link>
            <LogoutButton />
          </div>
        </header>
        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header">Dobrodošli 😎</h1>
            <p className="text-dark-700">
              Započnite dan sa zakazivanjem termina
            </p>
          </section>
          <section className="admin-stat">
            <StatCard
              type="appointments"
              count={appointments.scheduledCount}
              label="Scheduled appointments"
              icon="/assets/icons/appointments.svg"
            />
            <StatCard
              type="pending"
              count={appointments.pendingCount}
              label="Pending appointments"
              icon="/assets/icons/pending.svg"
            />
            <StatCard
              type="cancelled"
              count={appointments.cancelledCount}
              label="Cancelled appointments"
              icon="/assets/icons/cancelled.svg"
            />
          </section>
          <DataTable columns={columns} data={appointments.documents} />
        </main>
      </div>
    </AuthWrapper>
  );
};

export default Admin;
