import type { Language } from "@/components/LanguageProvider";

const messages: Record<Language, Record<string, string>> = {
  en: {
    FILE_TOO_LARGE: "The image exceeds the 15 MB limit.",
    INVALID_FILE_TYPE: "Unsupported format. Choose a PNG image.",
    INVALID_PNG_CONTENT: "The file content is not a valid PNG.",
    INVALID_IMAGE: "The browser could not read this image.",
    EMPTY_MESSAGE: "Enter a message to hide.",
    CAPACITY_EXCEEDED: "The message exceeds this image's capacity.",
    PASSWORD_REQUIRED: "Enter a password to continue.",
    PASSWORD_MISMATCH: "The password confirmation does not match.",
    NO_PAYLOAD: "This image does not contain StegaSafe data.",
    UNSUPPORTED_VERSION: "This hidden-data version is not supported.",
    DECRYPTION_FAILED: "The password is incorrect or the hidden data is damaged.",
    CORRUPTED_DATA: "The hidden data is damaged or the image has been modified.",
    CANVAS_UNAVAILABLE: "This browser does not support Canvas processing.",
    WORKER_UNAVAILABLE: "This browser does not support Web Workers.",
    EXPORT_FAILED: "The resulting image could not be created.",
    PROCESSING_FAILED: "Processing failed. Please try another image.",
    ABORTED: "Processing was stopped.",
  },
  id: {
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
  },
};

export function friendlyError(error: unknown, language: Language = "en"): string {
  if (error instanceof Error) return messages[language][error.message] ?? messages[language].PROCESSING_FAILED;
  return messages[language].PROCESSING_FAILED;
}
