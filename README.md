# StegaSafe

StegaSafe adalah aplikasi web Next.js untuk menyembunyikan dan mengekstrak pesan teks di dalam gambar PNG. Seluruh pemrosesan berlangsung lokal di browser—gambar, pesan, dan kata sandi tidak dikirim ke server.

## Fitur

- Encode dan decode pesan menggunakan Least Significant Bit (LSB) pada kanal RGB.
- Enkripsi opsional AES-256-GCM.
- Derivasi kunci kata sandi dengan PBKDF2-SHA-256 (310.000 iterasi).
- Salt 16 byte dan IV 12 byte acak untuk setiap payload terenkripsi.
- Integritas payload terenkripsi melalui authentication tag AES-GCM.
- Integritas payload biasa melalui 16 byte pertama SHA-256.
- Validasi PNG berdasarkan MIME type dan magic bytes.
- Batas file 15 MB, indikator kapasitas, dark mode, drag-and-drop, dan Web Worker.
- Tidak memiliki backend, database, analytics, atau API pemrosesan eksternal.

## Instalasi dan menjalankan

Persyaratan: Node.js 20.9 atau lebih baru dan npm.

```bash
git clone https://github.com/tirsasaki/stegasafe.git
cd stegasafe
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lain:

```bash
npm test
npm run build
npm start
```

## Cara kerja algoritma

1. Browser memvalidasi MIME type, ukuran, dan signature biner PNG.
2. Canvas API mendekode PNG menjadi data piksel RGBA.
3. Pesan diubah menjadi UTF-8.
4. Jika enkripsi aktif, kunci AES-256 dibuat dari kata sandi memakai PBKDF2, salt acak, dan 310.000 iterasi. Pesan kemudian dienkripsi dengan AES-GCM dan IV acak.
5. Jika enkripsi tidak aktif, checksum SHA-256 terpotong ditambahkan untuk mendeteksi perubahan data.
6. Web Worker menyisipkan setiap bit payload ke bit terendah kanal R, G, dan B. Kanal alpha tidak diubah.
7. Canvas mengekspor piksel sebagai PNG baru.

Saat ekstraksi, proses dibalik. Magic signature diperiksa sebelum aplikasi membaca panjang payload atau meminta kata sandi.

## Struktur payload v1

Semua bilangan multi-byte memakai big-endian.

| Offset | Ukuran | Isi |
| --- | ---: | --- |
| 0 | 8 byte | Magic ASCII `STEGSAFE` |
| 8 | 1 byte | Versi format: `1` |
| 9 | 1 byte | Flags; bit 0 berarti terenkripsi |
| 10 | 4 byte | Panjang payload |
| 14 | 16 byte | Salt PBKDF2, nol bila tidak terenkripsi |
| 30 | 12 byte | IV AES-GCM, nol bila tidak terenkripsi |
| 42 | variabel | Ciphertext + tag GCM, atau plaintext + checksum |

Header tetap berukuran 42 byte. AES-GCM menambahkan authentication tag 16 byte. Payload biasa menambahkan checksum 16 byte.

## Kapasitas

StegaSafe memakai satu bit pada masing-masing dari tiga kanal RGB:

```text
kapasitas total = floor(lebar × tinggi × 3 / 8)
kapasitas pesan = kapasitas total - 42 byte header - 16 byte integritas
```

Ukuran pesan dihitung dalam byte UTF-8, sehingga emoji dan karakter Jepang dapat memakai lebih dari satu byte per karakter. Batas unggahan MVP adalah 15 MB per file.

## Struktur proyek

```text
app/                         halaman dan tema global
components/                  komponen UI
lib/crypto/                  AES-GCM dan PBKDF2
lib/steganography/           payload, kapasitas, encode/decode, LSB
lib/validation/              validasi dan pemrosesan PNG
workers/                     pemrosesan piksel di thread terpisah
types/                       tipe TypeScript
tests/                       pengujian payload, enkripsi, validasi, dan UI
```

## Batasan dan keamanan

- Steganografi menyembunyikan keberadaan pesan, tetapi tidak menjamin pesan mustahil dideteksi oleh analisis forensik.
- Kata sandi tidak dapat dipulihkan. Gunakan kata sandi kuat dan simpan secara aman.
- Mengubah ukuran, crop, filter, optimasi, kompresi, screenshot, atau konversi gambar dapat merusak pesan.
- Platform sosial dan aplikasi pesan sering memproses ulang gambar. Kirim sebagai berkas asli bila memungkinkan.
- Metadata header tidak dienkripsi; signature, versi, status enkripsi, dan panjang payload dapat terdeteksi.
- Keamanan bergantung pada browser, perangkat, dan kekuatan kata sandi pengguna.
- Aplikasi tidak menggantikan alat enkripsi atau penyimpanan rahasia yang telah diaudit untuk kebutuhan berisiko tinggi.

## Pengujian

Suite Vitest mencakup:

- pesan biasa dan terenkripsi;
- kata sandi salah;
- pesan kosong;
- Unicode Indonesia, Inggris, Jepang, dan emoji;
- kapasitas mendekati serta melewati batas;
- gambar tanpa payload dan payload rusak;
- validasi file selain PNG;
- keberadaan kontrol UI utama yang dapat diakses.

GitHub Actions menjalankan pengujian dan production build pada setiap push dan pull request.

## Privasi

Tidak ada data pengguna yang disimpan oleh aplikasi. Preferensi light/dark mode disimpan lokal melalui `localStorage`. Source code dapat diaudit langsung di repository ini.
