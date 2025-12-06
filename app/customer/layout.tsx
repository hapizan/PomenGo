import { Header } from "@/components/navigation/Header";
import { Sidebar } from "@/components/navigation/Sidebar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar role="customer" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

