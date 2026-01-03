// ========================================
// SISTEM PAKAR CUACA LAUT
// Metode: Forward Chaining (Deterministik)
// ========================================

// Cegah error kalau form tidak ada (misal di result.html)
const form = document.getElementById('weatherForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        proses();
    });
}

function proses() {
    const fakta = {
        cuaca: document.getElementById("cuaca").value,
        gelombang: document.getElementById("gelombang").value,
        angin: document.getElementById("angin").value,
        kecepatan: document.getElementById("kecepatan").value,
        jarak: document.getElementById("jarak").value
    };

    for (let key in fakta) {
        if (!fakta[key]) {
            alert("⚠️ Semua gejala harus dipilih!");
            return;
        }
    }

    const rules = [
        {
            kondisi: { cuaca: "cerah", gelombang: "rendah", angin: "aman", kecepatan: "lambat", jarak: "jelas" },
            hasil: "Aman"
        },
        {
            kondisi: { cuaca: "hujan ringan", gelombang: "sedang", angin: "aman", kecepatan: "sedang", jarak: "terbatas" },
            hasil: "Tidak Aman"
        },
        {
            kondisi: { cuaca: "berawan", gelombang: "sedang", angin: "netral", kecepatan: "sedang", jarak: "cukup" },
            hasil: "Waspada"
        },
        {
            kondisi: { cuaca: "berawan", gelombang: "tinggi", angin: "berbahaya", kecepatan: "kencang", jarak: "terbatas" },
            hasil: "Berbahaya"
        },
        {
            kondisi: { cuaca: "hujan ringan", gelombang: "tinggi", angin: "berbahaya", kecepatan: "kencang", jarak: "terbatas" },
            hasil: "Ekstrim"
        }
    ];

    let hasil = "Waspada";

    rules.forEach(rule => {
        let cocok = true;
        for (let key in rule.kondisi) {
            if (fakta[key] !== rule.kondisi[key]) {
                cocok = false;
                break;
            }
        }
        if (cocok) hasil = rule.hasil;
    });

    localStorage.setItem("hasil", hasil);
    localStorage.setItem("inputData", JSON.stringify(fakta));

    setTimeout(() => {
        window.location.href = "result.html";
    }, 600);
}

// ===============================
// REAL-TIME CLOCK TOP BAR
// ===============================
function updateTime() {
    const timeElement = document.getElementById("timeDisplay");
    if (!timeElement) return;

    const now = new Date();
    const date = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const time = now.toLocaleTimeString('id-ID');

    timeElement.innerHTML = `${date} • ${time} WIB`;
}

document.addEventListener("DOMContentLoaded", () => {
    updateTime();
    setInterval(updateTime, 1000);
});

console.log("✅ Sistem Pakar & Jam Real-Time aktif");
