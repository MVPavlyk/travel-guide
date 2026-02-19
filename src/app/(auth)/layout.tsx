import { type ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <section className="flex w-1/2 flex-col items-center justify-center bg-white px-12 py-12 shadow-xl">
        <div className="w-full max-w-sm">{children}</div>
      </section>
      <section className="flex w-1/2 flex-col items-center justify-center bg-gray-100">
        <h2 className="text-4xl font-bold text-gray-800">Travel with us</h2>
      </section>
    </div>
  );
}
