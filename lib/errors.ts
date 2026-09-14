const messages: Record<string, string> = {
  FILE_TOO_LARGE: "Ukuran gambar melebihi batas 15 MB.",
  INVALID_FILE_TYPE: "Format tidak didukung. Pilih gambar PNG.",
  INVALID_PNG_CONTENT: "Isi file bukan PNG yang valid.",
  INVALID_IMAGE: "Gambar tidak dapat dibaca oleh browser.",
  EMPTY_MESSAGE: "Masukkan pesan yang ingin disembunyikan.",
  CAPACITY_EXCEEDED: "Pesan melebihi kapasitas gambar ini.",
  PASSWORD_REQUIRED: "Masukkan kata sandi untuk melanjutkan.",
  PASSWORD_MISMATCH: "Konfirmasi kata sandi tidak cocok.",
  NO_PAYLOAD: "Gambar ini tidak mengandung data StegaSafe.",
  UNSUPPORTED_VERSION: "Versi data tersembunyi belum didukung.",
  DECRYPTION_FAILED: "Kata sandi salah atau data tersembunyi telah rusak.",
  CORRUPTED_DATA: "Data tersembunyi rusak atau gambar telah diubah.",
  CANVAS_UNAVAILABLE: "Browser tidak mendukung pemrosesan Canvas.",
  WORKER_UNAVAILABLE: "Browser tidak mendukung Web Worker.",
  EXPORT_FAILED: "Gambar hasil tidak dapat dibuat.",
  PROCESSING_FAILED: "Proses gagal. Silakan coba gambar lain.",
  ABORTED: "Proses dihentikan.",
};

export function friendlyError(error: unknown): string {
  if (error instanceof Error) return messages[error.message] ?? messages.PROCESSING_FAILED;
  return messages.PROCESSING_FAILED;
}
