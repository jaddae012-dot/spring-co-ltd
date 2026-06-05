import AutoLogoutOnNav from "@/components/admin/AutoLogoutOnNav";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoLogoutOnNav />
      {children}
    </>
  );
}
