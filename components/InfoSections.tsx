import { Download, FileImage, KeyRound, Laptop, LockKeyhole, MessageSquareText, ServerOff, ShieldAlert } from "lucide-react";

const steps = [
  { icon: FileImage, title: "Pilih gambar PNG", text: "Unggah gambar pembawa. Format dan isi file diperiksa sebelum diproses." },
  { icon: MessageSquareText, title: "Masukkan dan lindungi pesan", text: "Tulis pesan, periksa kapasitas, lalu aktifkan AES-GCM bila diperlukan." },
  { icon: Download, title: "Unduh atau ekstrak kembali", text: "Simpan PNG hasil tanpa mengeditnya, lalu ekstrak kapan pun di StegaSafe." },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="container-page scroll-mt-24 py-20">
      <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Cara Kerja</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Tiga langkah, tanpa mengirim file</h2></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <article key={title} className="card p-6">
            <div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"><Icon className="size-5" /></span><span className="text-3xl font-bold text-slate-200 dark:text-slate-700">0{index + 1}</span></div>
            <h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-300">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const security = [
  { icon: Laptop, title: "Pemrosesan lokal", text: "Canvas, Web Worker, dan Web Crypto berjalan di browser Anda." },
  { icon: ServerOff, title: "Tanpa unggahan", text: "Tidak ada gambar, pesan, atau kata sandi yang dikirim ke server." },
  { icon: KeyRound, title: "Kunci hanya milik Anda", text: "Kata sandi tidak disimpan dan tidak dapat dipulihkan jika terlupa." },
  { icon: LockKeyhole, title: "Dua lapis perlindungan", text: "Steganografi menyamarkan keberadaan pesan; enkripsi melindungi isinya." },
];

export function SecuritySection() {
  return (
    <section id="keamanan" className="border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="eyebrow">Privasi dan Keamanan</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Data Anda tetap di perangkat</h2><p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">StegaSafe dirancang tanpa backend untuk versi ini. Gunakan secara bertanggung jawab dan pilih kata sandi yang kuat untuk data sensitif.</p>
          <div className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><ShieldAlert className="mt-0.5 size-5 shrink-0" /><p>Steganografi bukan jaminan bahwa data mustahil dideteksi. Analisis khusus tetap dapat menemukan pola tersembunyi.</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {security.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700"><Icon className="size-5 text-indigo-600 dark:text-indigo-400" /><h3 className="mt-3 font-bold">{title}</h3><p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["Apa itu steganografi?", "Steganografi adalah teknik menyembunyikan keberadaan informasi di dalam media lain. StegaSafe mengubah bit paling rendah pada kanal warna RGB gambar."],
  ["Apakah gambar dikirim ke server?", "Tidak. Pembacaan piksel, enkripsi, penyisipan, dan ekstraksi berlangsung langsung di browser perangkat Anda."],
  ["Mengapa hanya mendukung PNG?", "PNG menyimpan piksel tanpa kompresi lossy. JPEG dan sebagian proses konversi dapat mengubah bit warna yang membawa pesan."],
  ["Apakah pesan hilang jika gambar diedit?", "Bisa. Mengubah ukuran, memotong, memberi filter, mengompres, atau mengonversi gambar dapat merusak data tersembunyi."],
  ["Apa yang terjadi jika kata sandi terlupa?", "Tidak ada mekanisme pemulihan. Tanpa kata sandi yang tepat, payload AES-GCM tidak dapat dibuka oleh aplikasi."],
  ["Apakah metode ini sepenuhnya tidak dapat dideteksi?", "Tidak. Steganografi membantu menyamarkan keberadaan data, tetapi analisis statistik atau forensik tetap dapat mendeteksi kejanggalan."],
];

export function FAQSection() {
  return (
    <section id="faq" className="container-page scroll-mt-24 py-20">
      <div className="mx-auto max-w-3xl"><div className="text-center"><p className="eyebrow">FAQ</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Pertanyaan yang sering diajukan</h2></div>
        <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {faqs.map(([question, answer]) => <details key={question} className="group p-5 open:bg-slate-50 dark:open:bg-slate-950/40"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">{question}<span className="text-xl text-indigo-500 transition group-open:rotate-45">+</span></summary><p className="mt-3 pr-8 text-base leading-7 text-slate-600 dark:text-slate-300">{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
