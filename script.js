document.getElementById('jabatan').addEventListener('change', function() {
    const namaInput = document.getElementById('nama');
    const generateBtn = document.getElementById('generateBtn');
    
    // Aktifkan input nama dan tombol generate jika jabatan dipilih
    namaInput.disabled = this.value === "";
    generateBtn.disabled = this.value === "";
});

// Fungsi utama untuk membuat sertifikat
document.getElementById('generateBtn').addEventListener('click', function() {
    const nama = document.getElementById('nama').value.trim();
    const jabatan = document.getElementById('jabatan').value;
    const loading = document.getElementById('loading');
    const previewImage = document.getElementById('previewImage');
    const downloadBtn = document.getElementById('downloadBtn');

    if (nama === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    // Tampilkan indikator loading
    loading.style.display = 'block';
    previewImage.style.display = 'none';
    downloadBtn.style.display = 'none';
    previewImage.classList.remove('fade-in'); // Reset animasi sebelumnya

    setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 2480;
        canvas.height = 3508;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = `assets/${jabatan}_template.png`;  // Pastikan nama file sesuai
        img.onload = function() {
            ctx.drawImage(img, 0, 0);

            // Tambahkan teks nama ke sertifikat
            ctx.font = "70px 'Montserrat', sans-serif"; // Menggunakan Montserrat Bold
            ctx.fillStyle = "#007BFF";
            ctx.textAlign = "center";
            ctx.fillText(nama, canvas.width / 2, 700);  // Sesuaikan koordinat

            // Tampilkan pratinjau sertifikat dengan animasi
            previewImage.src = canvas.toDataURL();
            previewImage.style.display = "block";
            previewImage.classList.add('fade-in'); // Tambahkan kelas animasi

            // Tampilkan tombol download
            downloadBtn.style.display = "block";

            // Tambahkan event listener untuk download
            downloadBtn.onclick = function() {
                const link = document.createElement('a');
                link.download = `sertifikat_${jabatan}_${nama}.png`;
                link.href = canvas.toDataURL();
                link.click();
            };

            // Sembunyikan loading
            loading.style.display = 'none';
        };
    }, 1000);  // Simulasi delay 1 detik agar terasa proses
});

// Tambahkan efek saat opsi dipilih
document.getElementById('jabatan').addEventListener('change', function() {
    const selectedValue = this.value;
    if (selectedValue) {
        this.style.backgroundColor = '#E8F5E9';  // Warna hijau muda
    } else {
        this.style.backgroundColor = '#f0f5f9';  // Warna default
    }
});
