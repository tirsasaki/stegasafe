"use client";

import { Download, FileImage, KeyRound, Laptop, LockKeyhole, MessageSquareText, ServerOff, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const contentByLanguage = {
  en: {
    howEyebrow: "How It Works",
    howTitle: "Three steps, with no file uploads",
    steps: [
      { icon: FileImage, title: "Choose a PNG image", text: "Select a carrier image. Its format and file content are checked before processing." },
      { icon: MessageSquareText, title: "Enter and protect your message", text: "Write your message, check capacity, and enable AES-GCM encryption if needed." },
      { icon: Download, title: "Download or extract it later", text: "Keep the resulting PNG unedited, then extract the message anytime with StegaSafe." },
    ],
    securityEyebrow: "Privacy and Security",
    securityTitle: "Your data stays on your device",
    securityIntro: "This version of StegaSafe is designed without a backend. Use it responsibly and choose a strong password for sensitive information.",
    warning: "Steganography does not guarantee that data is impossible to detect. Specialized analysis can still identify hidden patterns.",
    security: [
      { icon: Laptop, title: "Local processing", text: "Canvas, Web Worker, and Web Crypto run inside your browser." },
      { icon: ServerOff, title: "No uploads", text: "Images, messages, and passwords are never sent to a server." },
      { icon: KeyRound, title: "Only you hold the key", text: "Passwords are not stored and cannot be recovered if forgotten." },
      { icon: LockKeyhole, title: "Two layers of protection", text: "Steganography disguises the message; encryption protects its contents." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["What is steganography?", "Steganography is a technique for hiding the existence of information inside another medium. StegaSafe modifies the least significant bits of an image's RGB color channels."],
      ["Is my image sent to a server?", "No. Pixel reading, encryption, embedding, and extraction happen directly in your browser."],
      ["Why is only PNG supported?", "PNG preserves pixels without lossy compression. JPEG and many conversion processes can alter the color bits that carry the message."],
      ["Will editing the image destroy the message?", "It can. Resizing, cropping, filtering, compressing, or converting the image may damage the hidden data."],
      ["What happens if I forget the password?", "There is no recovery mechanism. Without the correct password, the application cannot decrypt the AES-GCM payload."],
      ["Is this method completely undetectable?", "No. Steganography helps disguise the presence of data, but statistical or forensic analysis may still detect anomalies."],
    ],
  },
  id: {
    howEyebrow: "Cara Kerja",
    howTitle: "Tiga langkah, tanpa mengirim file",
    steps: [
      { icon: FileImage, title: "Pilih gambar PNG", text: "Unggah gambar pembawa. Format dan isi file diperiksa sebelum diproses." },
      { icon: MessageSquareText, title: "Masukkan dan lindungi pesan", text: "Tulis pesan, periksa kapasitas, lalu aktifkan AES-GCM bila diperlukan." },
      { icon: Download, title: "Unduh atau ekstrak kembali", text: "Simpan PNG hasil tanpa mengeditnya, lalu ekstrak kapan pun di StegaSafe." },
    ],
    securityEyebrow: "Privasi dan Keamanan",
    securityTitle: "Data Anda tetap di perangkat",
    securityIntro: "StegaSafe dirancang tanpa backend untuk versi ini. Gunakan secara bertanggung jawab dan pilih kata sandi yang kuat untuk data sensitif.",
    warning: "Steganografi bukan jaminan bahwa data mustahil dideteksi. Analisis khusus tetap dapat menemukan pola tersembunyi.",
    security: [
      { icon: Laptop, title: "Pemrosesan lokal", text: "Canvas, Web Worker, dan Web Crypto berjalan di browser Anda." },
      { icon: ServerOff, title: "Tanpa unggahan", text: "Tidak ada gambar, pesan, atau kata sandi yang dikirim ke server." },
      { icon: KeyRound, title: "Kunci hanya milik Anda", text: "Kata sandi tidak disimpan dan tidak dapat dipulihkan jika terlupa." },
      { icon: LockKeyhole, title: "Dua lapis perlindungan", text: "Steganografi menyamarkan keberadaan pesan; enkripsi melindungi isinya." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Pertanyaan yang sering diajukan",
    faqs: [
      ["Apa itu steganografi?", "Steganografi adalah teknik menyembunyikan keberadaan informasi di dalam media lain. StegaSafe mengubah bit paling rendah pada kanal warna RGB gambar."],
      ["Apakah gambar dikirim ke server?", "Tidak. Pembacaan piksel, enkripsi, penyisipan, dan ekstraksi berlangsung langsung di browser perangkat Anda."],
      ["Mengapa hanya mendukung PNG?", "PNG menyimpan piksel tanpa kompresi lossy. JPEG dan sebagian proses konversi dapat mengubah bit warna yang membawa pesan."],
      ["Apakah pesan hilang jika gambar diedit?", "Bisa. Mengubah ukuran, memotong, memberi filter, mengompres, atau mengonversi gambar dapat merusak data tersembunyi."],
      ["Apa yang terjadi jika kata sandi terlupa?", "Tidak ada mekanisme pemulihan. Tanpa kata sandi yang tepat, payload AES-GCM tidak dapat dibuka oleh aplikasi."],
      ["Apakah metode ini sepenuhnya tidak dapat dideteksi?", "Tidak. Steganografi membantu menyamarkan keberadaan data, tetapi analisis statistik atau forensik tetap dapat mendeteksi kejanggalan."],
    ],
  },
};

export function HowItWorks() {
  const { language } = useLanguage();
  const c = contentByLanguage[language];
  return (
    <section id="cara-kerja" className="container-page scroll-mt-24 py-20">
      <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">{c.howEyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{c.howTitle}</h2></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {c.steps.map(({ icon: Icon, title, text }, index) => (
          <article key={title} className="card p-6">
            <div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"><Icon className="size-5" /></span><span className="text-3xl font-bold text-slate-200 dark:text-slate-700">0{index + 1}</span></div>
            <h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-300">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SecuritySection() {
  const { language } = useLanguage();
  const c = contentByLanguage[language];
  return (
    <section id="keamanan" className="border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="eyebrow">{c.securityEyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{c.securityTitle}</h2><p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{c.securityIntro}</p>
          <div className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><ShieldAlert className="mt-0.5 size-5 shrink-0" /><p>{c.warning}</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {c.security.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700"><Icon className="size-5 text-indigo-600 dark:text-indigo-400" /><h3 className="mt-3 font-bold">{title}</h3><p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const { language } = useLanguage();
  const c = contentByLanguage[language];
  return (
    <section id="faq" className="container-page scroll-mt-24 py-20">
      <div className="mx-auto max-w-3xl"><div className="text-center"><p className="eyebrow">{c.faqEyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{c.faqTitle}</h2></div>
        <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {c.faqs.map(([question, answer]) => <details key={question} className="group p-5 open:bg-slate-50 dark:open:bg-slate-950/40"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">{question}<span className="text-xl text-indigo-500 transition group-open:rotate-45">+</span></summary><p className="mt-3 pr-8 text-base leading-7 text-slate-600 dark:text-slate-300">{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
