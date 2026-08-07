let jumlahKeranjang = 0;
const namaToko = "TokoRaffi";

console.log(`Selamat Datang di ${namaToko}!`);
console.log(`Jumlah item di keranjang: ${jumlahKeranjang}`);

const tombolKeranjang = document.querySelector("#tombol-keranjang");
const tombolHamburger = document.querySelector("#tombol-hamburger");
const menuMobile = document.querySelector("#menu-mobile");

const formProduk = document.querySelector("#form-produk");
const gridKatalog = document.querySelector("#grid-katalog");
const pesanError = document.querySelector("#pesan-error");

const API_URL =
  "https://supreme-rotary-phone-xr9p6x5x7jpgcv449-3000.app.github.dev/api/products";


// ====================
// MENU
// ====================

tombolKeranjang.addEventListener("click", () => {
    console.log("Tombol keranjang diklik!");
});

tombolHamburger.addEventListener("click", () => {
    menuMobile.classList.toggle("hidden");
});


// ====================
// MEMBUAT KARTU PRODUK
// ====================

function buatKartuProduk(item) {

    const kartu = document.createElement("div");

    kartu.className =
        "bg-white rounded-lg shadow hover:shadow-lg transition p-4";

    kartu.innerHTML = `
        <div class="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400">
            Belum ada gambar
        </div>

        <h4 class="font-semibold text-gray-800">
            ${item.nama}
        </h4>

        <p class="text-blue-700 font-bold mt-1">
            Rp ${Number(item.harga).toLocaleString("id-ID")}
        </p>

        <button
            class="w-full bg-blue-700 text-white py-2 rounded-lg btn-tambah-keranjang">
            Tambah ke Keranjang
        </button>
    `;

    return kartu;
}


// ====================
// LOAD PRODUK
// ====================

async function muatProduk() {

    gridKatalog.innerHTML =
        `<p class="text-gray-500 col-span-full">Memuat produk...</p>`;

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Gagal mengambil data produk");
        }

        const hasil = await response.json();

        gridKatalog.innerHTML = "";

        hasil.data.forEach((item) => {
            gridKatalog.appendChild(buatKartuProduk(item));
        });

    } catch (error) {

        console.error(error);

        gridKatalog.innerHTML = `
            <p class="text-red-500 col-span-full">
                Gagal memuat produk.
            </p>
        `;
    }

}


// ====================
// SUBMIT FORM
// ====================

formProduk.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nama = document.querySelector("#input-nama").value.trim();
    const harga = Number(document.querySelector("#input-harga").value);

    if (nama === "" || harga <= 0) {

        pesanError.textContent =
            "Nama produk dan harga wajib diisi.";

        pesanError.classList.remove("hidden");

        return;
    }

    pesanError.classList.add("hidden");

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nama,
                harga
            })

        });

        if (!response.ok) {
            throw new Error("Gagal menyimpan produk");
        }

        formProduk.reset();

        await muatProduk();

    } catch (error) {

        console.error(error);

        alert("Produk gagal ditambahkan.");
    }

});


// ====================
// KERANJANG
// ====================

let totalKeranjang = 0;

gridKatalog.addEventListener("click", (event) => {

    if (event.target.classList.contains("btn-tambah-keranjang")) {

        totalKeranjang++;

        tombolKeranjang.textContent =
            `Keranjang (${totalKeranjang})`;
    }

});


// ====================
// LOAD AWAL
// ====================

muatProduk();