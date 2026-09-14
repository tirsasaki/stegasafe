import { ArrowDown, ArrowRight, FileImage, KeyRound, LockKeyhole, MessageSquareText, ServerOff } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="beranda" className="container-page grid items-center gap-10 pb-10 pt-16 lg:grid-cols-[1.1fr_.9fr] lg:pb-14 lg:pt-24">
      <div className="max-w-3xl">
        <p className="eyebrow mb-4">Privasi langsung di perangkat Anda</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
          Sembunyikan Pesan di Dalam Gambar
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Lindungi dan sisipkan pesan rahasia ke dalam gambar PNG. Semua diproses langsung di perangkat Anda.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#alat" className="btn-primary">Mulai Menyembunyikan <ArrowDown className="size-4" /></a>
          <a href="#alat" className="btn-secondary">Ekstrak Pesan <ArrowRight className="size-4" /></a>
        </div>
        <div className="mt-7 flex flex-wrap gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900"><LockKeyhole className="size-3.5 text-indigo-600" />100% diproses di browser</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900"><ServerOff className="size-3.5 text-indigo-600" />Tanpa upload ke server</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900"><KeyRound className="size-3.5 text-indigo-600" />Enkripsi opsional</span>
        </div>
      </div>

      <div className="card relative mx-auto w-full max-w-md overflow-hidden p-6 sm:p-8" aria-label="Ilustrasi pesan dimasukkan ke gambar">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-center dark:border-indigo-900 dark:bg-indigo-950/40">
            <MessageSquareText className="mx-auto size-9 text-indigo-600 dark:text-indigo-400" />
            <p className="mt-2 text-sm font-semibold">Pesan</p>
            <div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-indigo-200 dark:bg-indigo-800" />
          </div>
          <ArrowRight className="size-6 text-slate-400" />
          <div className="relative rounded-2xl border border-violet-100 bg-violet-50 p-5 text-center dark:border-violet-900 dark:bg-violet-950/30">
            <FileImage className="mx-auto size-9 text-violet-600 dark:text-violet-400" />
            <p className="mt-2 text-sm font-semibold">PNG aman</p>
            <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900"><LockKeyhole className="size-3.5" /></span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-12 gap-1" aria-hidden="true">
          {Array.from({ length: 36 }, (_, index) => (
            <span key={index} className={"aspect-square rounded-sm " + (index % 5 === 0 ? "bg-indigo-500" : index % 3 === 0 ? "bg-violet-300 dark:bg-violet-700" : "bg-slate-200 dark:bg-slate-700")} />
          ))}
        </div>
        <p className="mt-5 text-center text-sm leading-6 text-slate-500 dark:text-slate-400">Perubahan kecil pada bit warna menyimpan data tanpa terlihat oleh mata.</p>
      </div>
    </section>
  );
}
