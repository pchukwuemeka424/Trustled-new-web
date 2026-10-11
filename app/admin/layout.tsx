import type { Metadata } from "next";
import "./admin.css";
import "./live-editor.css";

export const metadata: Metadata = {
  title: "Admin | TrustLed AI",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-shell">{children}</div>;
}
