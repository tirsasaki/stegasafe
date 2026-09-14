import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import type { ToastState } from "@/types/steganography";

export default function ToastNotification({
  toast,
  onClose,
}: {
  toast: ToastState;
  onClose: () => void;
}) {
  if (!toast) return null;
  const Icon = toast.type === "success" ? CheckCircle2 : toast.type === "error" ? CircleAlert : Info;
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] animate-fade-up" role="status" aria-live="polite">
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <Icon className={"mt-0.5 size-5 shrink-0 " + (toast.type === "success" ? "text-emerald-500" : toast.type === "error" ? "text-rose-500" : "text-indigo-500")} />
        <p className="text-sm font-medium">{toast.message}</p>
        <button type="button" onClick={onClose} className="rounded p-0.5 text-slate-400 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:text-white" aria-label="Tutup notifikasi">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
