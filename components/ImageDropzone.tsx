"use client";

import { ImagePlus, UploadCloud } from "lucide-react";
import { DragEvent, KeyboardEvent, useRef, useState } from "react";

type Props = {
  id: string;
  disabled?: boolean;
  onFile: (file: File) => void;
};

export default function ImageDropzone({ id, disabled, onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function accept(files: FileList | null) {
    const file = files?.[0];
    if (file) onFile(file);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    if (!disabled) accept(event.dataTransfer.files);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={onKeyDown}
      onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={"group cursor-pointer rounded-2xl border-2 border-dashed px-5 py-9 text-center outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 " + (dragging ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" : "border-slate-300 bg-slate-50/70 hover:border-indigo-400 hover:bg-indigo-50/60 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-indigo-600")}
    >
      <input ref={inputRef} id={id} type="file" accept="image/png,.png" className="sr-only" onChange={(event) => accept(event.target.files)} disabled={disabled} />
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 transition group-hover:scale-105 dark:bg-slate-900 dark:ring-slate-700">
        {dragging ? <ImagePlus className="size-6" /> : <UploadCloud className="size-6" />}
      </span>
      <p className="mt-4 font-semibold text-slate-800 dark:text-slate-100">Tarik gambar PNG ke sini</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">atau klik untuk memilih • maksimum 15 MB</p>
    </div>
  );
}
