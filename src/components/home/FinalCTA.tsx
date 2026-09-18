import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-primary)] px-6 py-12 text-center sm:px-10">
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #fff, transparent 40%), radial-gradient(circle at 85% 85%, #fff, transparent 45%)" }}
        />
        <div className="relative">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">همین حالا قطعه خودروی خود را پیدا کنید</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
            با اطمینان از اصالت کالا، تطابق دقیق و ارسال سریع، خریدتان را شروع کنید.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/products">
              <Button size="lg" variant="dark">مشاهده همه محصولات</Button>
            </Link>
            <Link href="/vehicle">
              <Button size="lg" className="bg-white text-[var(--color-primary)] shadow-none hover:bg-white/90">
                انتخاب بر اساس خودرو
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
