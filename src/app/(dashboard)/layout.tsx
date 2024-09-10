import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/orgSidebar";
import Navbar from "./_components/sidebar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="pl-[60px]">
        <div className="flex h-full gap-x-3">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
