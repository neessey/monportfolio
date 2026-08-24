import type { ReactNode } from "react";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAuth><AdminShell>{children}</AdminShell></AdminAuth>;
}
