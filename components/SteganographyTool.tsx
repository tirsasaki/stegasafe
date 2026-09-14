"use client";

import CapacityIndicator from "@/components/CapacityIndicator";
import ImageDropzone from "@/components/ImageDropzone";
import ImagePreview from "@/components/ImagePreview";
import PasswordInput from "@/components/PasswordInput";
import ToastNotification from "@/components/ToastNotification";
import { friendlyError } from "@/lib/errors";
import { decodeImage, inspectImage } from "@/lib/steganography/decode";
import { encodeImage } from "@/lib/steganography/encode";
import { maximumMessageBytes } from "@/lib/steganography/capacity";
import { formatBytes, loadImageInfo } from "@/lib/validation/image";
import type { ImageInfo, PayloadHeader, ToastState } from "@/types/steganography";
import {
  Check,
  Clipboard,
  Download,
  FileKey2,
  ImageUp,
  LoaderCircle,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  UnlockKeyhole,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Mode = "encode" | "decode";

export default function SteganographyTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [message, setMessage] = useState("");
  const [encrypt, setEncrypt] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [header, setHeader] = useState<PayloadHeader | null>(null);
  const [decoded, setDecoded] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<ToastState>(null);

  const messageBytes = useMemo(() => new TextEncoder().encode(message).length, [message]);
  const maximum = image ? maximumMessageBytes(image.width, image.height) : 0;

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function clearUrls() {
    if (image?.url) URL.revokeObjectURL(image.url);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
  }

  function reset(nextMode: Mode = mode) {
    clearUrls();
    setMode(nextMode);
    setImage(null);
    setMessage("");
    setPassword("");
    setConfirmation("");
    setHeader(null);
    setDecoded("");
    setResultUrl("");
    setResultBlob(null);
    setBusy(false);
    setError("");
  }

  function switchMode(next: Mode) {
    if (next !== mode) reset(next);
  }

  async function selectFile(file: File) {
    setError("");
    setHeader(null);
    setDecoded("");
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setResultBlob(null);
    if (image?.url) URL.revokeObjectURL(image.url);

    try {
      const nextImage = await loadImageInfo(file);
      setImage(nextImage);
      if (mode === "decode") {
        try {
          const detected = await inspectImage(nextImage);
          setHeader(detected);
        } catch (inspectionError) {
          setError(friendlyError(inspectionError));
        }
      }
    } catch (selectionError) {
      setImage(null);
      setError(friendlyError(selectionError));
    }
  }

  async function encode() {
    setError("");
    if (!image) return setError("Pilih gambar PNG terlebih dahulu.");
    if (!message) return setError(friendlyError(new Error("EMPTY_MESSAGE")));
    if (messageBytes > maximum) return setError(friendlyError(new Error("CAPACITY_EXCEEDED")));
    if (encrypt && !password) return setError(friendlyError(new Error("PASSWORD_REQUIRED")));
    if (encrypt && password !== confirmation) return setError(friendlyError(new Error("PASSWORD_MISMATCH")));

    setBusy(true);
    try {
      const blob = await encodeImage(image, message, encrypt, password);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setToast({ type: "success", message: "Pesan berhasil disembunyikan di dalam gambar." });
    } catch (processError) {
      setError(friendlyError(processError));
    } finally {
      setBusy(false);
    }
  }

  async function decode() {
    setError("");
    if (!image) return setError("Pilih gambar PNG terlebih dahulu.");
    if (!header) return setError(friendlyError(new Error("NO_PAYLOAD")));
    if (header.encrypted && !password) return setError(friendlyError(new Error("PASSWORD_REQUIRED")));

    setBusy(true);
    try {
      const text = await decodeImage(image, header, password);
      setDecoded(text);
      setToast({ type: "success", message: "Pesan berhasil diekstrak." });
    } catch (processError) {
      setDecoded("");
      setError(friendlyError(processError));
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!resultBlob || !resultUrl) return;
    const anchor = document.createElement("a");
    anchor.href = resultUrl;
    anchor.download = `stegasafe-${image?.name.replace(/\.png$/i, "") || "image"}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(decoded);
      setToast({ type: "success", message: "Pesan disalin ke clipboard." });
    } catch {
      setToast({ type: "error", message: "Pesan tidak dapat disalin oleh browser." });
    }
  }

  return (
    <section id="alat" className="container-page scroll-mt-24 pb-20 pt-4">
      <div className="card animate-fade-up overflow-hidden">
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/80 p-1.5 dark:border-slate-800 dark:bg-slate-950/50" role="tablist" aria-label="Mode steganografi">
          <button type="button" role="tab" aria-selected={mode === "encode"} onClick={() => switchMode("encode")} className={"flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 " + (mode === "encode" ? "bg-white text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-300" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white")}>
            <ImageUp className="size-4" /> Sembunyikan Pesan
          </button>
          <button type="button" role="tab" aria-selected={mode === "decode"} onClick={() => switchMode("decode")} className={"flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 " + (mode === "decode" ? "bg-white text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-300" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white")}>
            <FileKey2 className="size-4" /> Ekstrak Pesan
          </button>
        </div>

        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-2 lg:p-9">
          <div>
            <div className="mb-4">
              <p className="eyebrow">{mode === "encode" ? "Langkah 1" : "Pemeriksaan gambar"}</p>
              <h2 className="mt-1 text-2xl font-bold">{mode === "encode" ? "Pilih gambar pembawa" : "Pilih gambar StegaSafe"}</h2>
            </div>
            {image ? (
              <div className="space-y-4">
                <ImagePreview image={image} />
                <button type="button" className="btn-secondary w-full" onClick={() => reset(mode)}><RotateCcw className="size-4" />Ganti gambar</button>
              </div>
            ) : (
              <ImageDropzone id={`${mode}-image`} onFile={selectFile} disabled={busy} />
            )}
            <div className="mt-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm leading-6 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200">
              <ShieldCheck className="mt-1 size-4 shrink-0" />
              <p>Jangan mengubah ukuran, mengedit, mengompres, atau mengonversi gambar hasil. Perubahan piksel dapat merusak pesan.</p>
            </div>
          </div>

          <div className="min-w-0">
            {mode === "encode" ? (
              <div className="space-y-6">
                <div>
                  <label htmlFor="secret-message" className="mb-2 block text-sm font-semibold">Pesan rahasia</label>
                  <textarea id="secret-message" value={message} onChange={(event) => setMessage(event.target.value)} className="input min-h-40 resize-y" placeholder="Tulis pesan yang ingin disembunyikan…" />
                  <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>{message.length.toLocaleString("id-ID")} karakter</span>
                    <span>{formatBytes(messageBytes)}</span>
                  </div>
                </div>

                {image && <CapacityIndicator used={messageBytes} maximum={maximum} />}

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <input type="checkbox" checked={encrypt} onChange={(event) => setEncrypt(event.target.checked)} className="mt-1 size-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span>
                    <span className="flex items-center gap-2 font-semibold"><LockKeyhole className="size-4 text-indigo-600" />Enkripsi pesan dengan kata sandi</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-500 dark:text-slate-400">AES-GCM melindungi isi pesan sebelum disisipkan.</span>
                  </span>
                </label>

                {encrypt && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <PasswordInput id="encode-password" label="Kata sandi" value={password} onChange={setPassword} />
                    <PasswordInput id="confirm-password" label="Konfirmasi kata sandi" value={confirmation} onChange={setConfirmation} />
                  </div>
                )}

                <button type="button" onClick={encode} disabled={busy || !image || !message || messageBytes > maximum} className="btn-primary w-full">
                  {busy ? <><LoaderCircle className="size-4 motion-safe:animate-spin" />Memproses gambar…</> : <><Sparkles className="size-4" />Sembunyikan Pesan</>}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="eyebrow">Status</p>
                  <h2 className="mt-1 text-2xl font-bold">Ekstrak pesan tersembunyi</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Signature dan metadata diperiksa secara lokal sebelum ekstraksi.</p>
                </div>

                {header && (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                    <Check className="size-5 shrink-0" />
                    <div><p className="font-semibold">Data StegaSafe ditemukan</p><p className="mt-0.5 text-sm">Payload {header.encrypted ? "terenkripsi" : "tidak terenkripsi"} • {formatBytes(header.payloadLength)}</p></div>
                  </div>
                )}

                {header?.encrypted && <PasswordInput id="decode-password" label="Kata sandi" value={password} onChange={setPassword} autoComplete="current-password" />}

                <button type="button" onClick={decode} disabled={busy || !image || !header} className="btn-primary w-full">
                  {busy ? <><LoaderCircle className="size-4 motion-safe:animate-spin" />Mengekstrak pesan…</> : <><UnlockKeyhole className="size-4" />Ekstrak Pesan</>}
                </button>

                {decoded && (
                  <div className="animate-fade-up">
                    <label htmlFor="decoded-message" className="mb-2 block text-sm font-semibold">Pesan hasil</label>
                    <textarea id="decoded-message" readOnly value={decoded} className="input min-h-44 resize-y bg-slate-50 dark:bg-slate-950" />
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <button type="button" onClick={copyMessage} className="btn-secondary flex-1"><Clipboard className="size-4" />Salin Pesan</button>
                      <button type="button" onClick={() => reset("decode")} className="btn-secondary flex-1"><Trash2 className="size-4" />Bersihkan</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {busy && (
              <div className="mt-4" role="status" aria-live="polite">
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full w-2/3 animate-pulse rounded-full bg-indigo-500" /></div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Pemrosesan berlangsung di perangkat ini.</p>
              </div>
            )}

            {error && <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200" role="alert">{error}</div>}
          </div>
        </div>

        {mode === "encode" && resultUrl && image && (
          <div className="border-t border-slate-200 bg-emerald-50/50 p-5 sm:p-7 lg:p-9 dark:border-slate-800 dark:bg-emerald-950/10">
            <div className="mx-auto max-w-2xl">
              <div className="mb-5 text-center">
                <span className="mx-auto grid size-12 animate-success-pop place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300"><Check className="size-6" /></span>
                <h3 className="mt-3 text-xl font-bold">Gambar StegaSafe siap</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Unduh dalam format PNG untuk mempertahankan data tersembunyi.</p>
              </div>
              <ImagePreview image={{ ...image, url: resultUrl, size: resultBlob?.size ?? image.size, name: `stegasafe-${image.name}` }} label="Gambar hasil StegaSafe" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={download} className="btn-primary"><Download className="size-4" />Unduh Gambar</button>
                <button type="button" onClick={() => reset("encode")} className="btn-secondary"><RotateCcw className="size-4" />Proses Gambar Baru</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}
