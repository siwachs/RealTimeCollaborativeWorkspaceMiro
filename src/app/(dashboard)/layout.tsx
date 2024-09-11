import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/orgSidebar";
import Navbar from "./_components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <Sidebar />
      <main className="h-full pl-[60px]">
        <div className="flex h-full gap-x-3">
          <OrgSidebar />

          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
