import Sidebar from "./_components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="h-full pl-[60px]">
        <div className="flex h-full gap-x-3">
          <div className="h-full flex-1">
            {/* Add Navbar */}
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
