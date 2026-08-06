const Database = require("better-sqlite3");
 
// Membuat/membuka file database bernama tokokita.db
const db = new Database("tokoRaffi.db");
 
// Membuat tabel 'produk' jika belum ada (dijalankan sekali saat server start)
db.exec(`
  CREATE TABLE IF NOT EXISTS produk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    harga INTEGER NOT NULL
  )
`);
 
module.exports = db;

const jumlahProduk = db.prepare("SELECT COUNT(*) AS total FROM produk").get();
 
if (jumlahProduk.total === 0) {
  const tambahProduk = db.prepare(
    "INSERT INTO produk (nama, harga) VALUES (?, ?)"
  );
 
  // Data awal, mirip dengan yang dipakai di Hari 3
  tambahProduk.run("Sandal Crocs warna hitam", 2000000);
  tambahProduk.run("Sneakers laki-laki warna hitam", 245000);
  tambahProduk.run("Sepatu anak-anak putih hijau", 2000);
  tambahProduk.run("Sepatu but warna hitam", 22000000);
 
  console.log("Data awal produk berhasil dimasukkan ke database.");
}

// Uji coba sementara (boleh dihapus setelah dicoba)
const semuaProduk = db.prepare("SELECT * FROM produk").all();
console.log(semuaProduk);