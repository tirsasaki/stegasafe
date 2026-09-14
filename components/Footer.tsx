import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
      <div className="container-page grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-xl"><div className="flex items-center gap-2 font-bold"><ShieldCheck className="size-5 text-indigo-600" />StegaSafe</div><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Alat steganografi PNG yang bekerja sepenuhnya di browser. Gunakan untuk tujuan yang sah dan bertanggung jawab.</p></div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium" aria-label="Navigasi footer">
          <a href="#cara-kerja" className="hover:text-indigo-600">Cara Kerja</a><a href="#keamanan" className="hover:text-indigo-600">Keamanan</a><a href="#faq" className="hover:text-indigo-600">FAQ</a><a href="#keamanan" className="hover:text-indigo-600">Privasi</a>
        </nav>
      </div>
      <div className="container-page mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">© {year} StegaSafe.</div>
    </footer>
  );
}
