import { PropsWithChildren } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/sidebar";

const DashLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r lg:block">
          <div className="flex flex-col gap-2">
            <div className="flex-1 mt-4">
              <Sidebar />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b  px-6">
            <Link className="lg:hidden" href="/" rel="ugc">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
              <span className="sr-only">Home</span>
            </Link>
            <div className="flex-1">
              <h1 className="font-semibold text-lg">Dashboard</h1>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashLayout;
