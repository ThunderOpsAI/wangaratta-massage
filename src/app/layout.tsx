import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Wangaratta Remedial Massage | Instant HICAPS Rebates & 24/7 Booking",
  description: "Accredited remedial massage therapy in Wangaratta. Deep tissue, sports injury rehab, dry needling, and pregnancy massage. Claim private health rebates instantly via HICAPS.",
  keywords: [
    "Remedial Massage Wangaratta",
    "Deep Tissue Massage Wangaratta",
    "HICAPS Massage Wangaratta",
    "Sports Injury Clinic Wangaratta",
    "Wangaratta Remedial Massage",
    "Dry Needling Wangaratta"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}
