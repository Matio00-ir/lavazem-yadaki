import { Suspense } from "react";
import type { Metadata } from "next";
import { VehiclePageClient } from "./VehiclePageClient";

export const metadata: Metadata = {
  title: "انتخاب قطعه بر اساس خودرو",
  description: "برند، مدل، سال و نوع موتور خودروی خود را انتخاب کنید و قطعات سازگار را ببینید.",
};

export default function VehiclePage() {
  return (
    <Suspense>
      <VehiclePageClient />
    </Suspense>
  );
}
