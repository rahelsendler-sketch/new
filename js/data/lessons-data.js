/**
 * ASAH C++ — Complete Curriculum Dataset (Lessons 1 to 24)
 * Covers Level 0 through Level 11, Real-World Projects, and Final C++ Project.
 */

const LESSONS_DATABASE = [
    // --- LEVEL 0 — PERSIAPAN ---
    {
        id: 'lesson-1',
        level: 0,
        levelTitle: 'LEVEL 0 — PERSIAPAN & FUNDAMENTAL',
        title: 'Lesson 1 — Hello World & Struktur Program C++',
        description: 'Pahami apa itu C++, compiler, dan struktur dasar program pertama kamu baris demi baris.',
        icon: '👋',
        duration: '10-15 Menit',
        xpReward: 100,
        prerequisites: [],
        sections: [
            {
                id: 'sec-1-1',
                title: '1. Apa itu C++ dan Compiler?',
                type: 'explanation',
                content: `
                    <p>Selamat datang di dunia C++! 🚀 Komputer hanya paham bahasa mesin (0 dan 1). C++ adalah bahasa tingkat tinggi yang kita tulis, dan Compiler adalah penerjemah ke bahasa mesin.</p>
                `
            },
            {
                id: 'sec-1-2',
                title: '2. Bedah Program C++ Pertama kamu',
                type: 'code-breakdown',
                codeSnippet: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!";
    return 0;
}`,
                breakdownLines: [
                    { token: '#include <iostream>', explain: 'Memanggil library untuk fitur Input (cin) & Output (cout).' },
                    { token: 'using namespace std;', explain: 'Menggunakan standar namespace C++.' },
                    { token: 'int main() { ... }', explain: 'Titik awal eksekusi program C++.' },
                    { token: 'cout << "Hello World!";', explain: 'Perintah menampilkan teks ke layar.' }
                ]
            }
        ],
        challenge: {
            id: 'chal-1',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Tulis program C++ yang mencetak perintah salam: `Halo, dunia!` tepat di layar.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Tulis kode kamu di bawah ini\n    \n    return 0;\n}`,
            hints: ['Gunakan `cout << "Halo, dunia!";`'],
            testCases: [{ id: 't1-1', input: '', expectedOutput: 'Halo, dunia!', description: 'Mencetak "Halo, dunia!"' }]
        }
    },

    // --- LEVEL 1 — FUNDAMENTAL C++ ---
    {
        id: 'lesson-2',
        level: 1,
        levelTitle: 'LEVEL 1 — FUNDAMENTAL C++',
        title: 'Lesson 2 — Variabel & Tipe Data',
        description: 'Pelajari cara menyimpan data di memori komputer menggunakan variabel dan berbagai tipe data C++.',
        icon: '📦',
        duration: '12-18 Menit',
        xpReward: 150,
        prerequisites: ['lesson-1'],
        sections: [
            {
                id: 'sec-2-1',
                title: '1. Konsep Variabel',
                type: 'explanation',
                content: `<p>Variabel adalah lokasi memori berlabel untuk menyimpan nilai (int, double, string, bool).</p>`
            }
        ],
        challenge: {
            id: 'chal-2',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buatlah variabel `umur` bernilai `16` dan tampilkan nilainya dengan `cout`.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int umur = 16;\n    cout << umur;\n    return 0;\n}`,
            hints: ['Gunakan `int umur = 16; cout << umur;`'],
            testCases: [{ id: 't2-1', input: '', expectedOutput: '16', description: 'Mencetak 16' }]
        }
    },

    {
        id: 'lesson-3',
        level: 1,
        levelTitle: 'LEVEL 1 — FUNDAMENTAL C++',
        title: 'Lesson 3 — Input User (cin) & Ekspresi',
        description: 'Buat program interaktif yang bisa menerima masukan dari pengguna dengan cin.',
        icon: '⌨️',
        duration: '15-20 Menit',
        xpReward: 200,
        prerequisites: ['lesson-2'],
        sections: [
            { id: 'sec-3-1', title: '1. Input cin', type: 'explanation', content: `<p>Gunakan <code>cin >> nama;</code> untuk membaca ketikan pengguna.</p>` }
        ],
        challenge: {
            id: 'chal-3',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Minta input `nama` dengan `cin`, lalu tampilkan `Halo, ` + nama.',
            starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nama;\n    cin >> nama;\n    cout << "Halo, " << nama;\n    return 0;\n}`,
            hints: ['Gunakan `cin >> nama;` dan `cout << "Halo, " << nama;`'],
            testCases: [{ id: 't3-1', input: 'Budi', expectedOutput: 'Halo, Budi', description: 'Mencetak Halo, Budi' }]
        }
    },

    {
        id: 'lesson-4',
        level: 1,
        levelTitle: 'LEVEL 1 — FUNDAMENTAL C++',
        title: 'Lesson 4 — Operator Aritmatika & Modulus (%)',
        description: 'Kuasai operator matematika +, -, *, /, modulus (%), dan increment ++ dalam program kasir.',
        icon: '➕',
        duration: '15-20 Menit',
        xpReward: 220,
        prerequisites: ['lesson-3'],
        sections: [
            { id: 'sec-4-1', title: '1. Modulus %', type: 'explanation', content: `<p>Operator <code>%</code> menghitung sisa hasil bagi. Contoh: <code>7 % 3 = 1</code>.</p>` }
        ],
        challenge: {
            id: 'chal-4',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Hitung `kembalian = bayar - total` dari input yang diberikan.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int bayar, total;\n    cin >> bayar >> total;\n    int kembalian = bayar - total;\n    cout << kembalian;\n    return 0;\n}`,
            hints: ['Hitung `int kembalian = bayar - total;`'],
            testCases: [{ id: 't4-1', input: '50000 35000', expectedOutput: '15000', description: 'Kembalian 15000' }]
        }
    },

    // --- LEVEL 2 — CONDITIONAL ---
    {
        id: 'lesson-5',
        level: 2,
        levelTitle: 'LEVEL 2 — CONDITIONAL',
        title: 'Lesson 5 — Percabangan Logika (if, else if, else)',
        description: 'Ajarkan komputer kamu untuk mengambil keputusan otomatis berdasarkan kondisi!',
        icon: '🔀',
        duration: '18-22 Menit',
        xpReward: 250,
        prerequisites: ['lesson-4'],
        sections: [
            { id: 'sec-5-1', title: '1. Structur if else', type: 'explanation', content: `<p>Gunakan <code>if(kondisi) { ... } else { ... }</code>.</p>` }
        ],
        challenge: {
            id: 'chal-5',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Jika `nilai >= 75` cetak `LULUS`, selain itu cetak `REMEDIAL`.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int nilai;\n    cin >> nilai;\n    if (nilai >= 75) {\n        cout << "LULUS";\n    } else {\n        cout << "REMEDIAL";\n    }\n    return 0;\n}`,
            hints: ['Gunakan `if (nilai >= 75)`'],
            testCases: [
                { id: 't5-1', input: '85', expectedOutput: 'LULUS', description: '85 -> LULUS' },
                { id: 't5-2', input: '60', expectedOutput: 'REMEDIAL', description: '60 -> REMEDIAL' }
            ]
        }
    },

    {
        id: 'lesson-6',
        level: 2,
        levelTitle: 'LEVEL 2 — CONDITIONAL',
        title: 'Lesson 6 — Operator Logika (&&, ||, !)',
        description: 'Gabungkan beberapa kondisi kompleks menggunakan operator DAN (&&) dan ATAU (||).',
        icon: '⚡',
        duration: '18-22 Menit',
        xpReward: 270,
        prerequisites: ['lesson-5'],
        sections: [
            { id: 'sec-6-1', title: '1. Operator AND &&', type: 'explanation', content: `<p>Operator <code>&&</code> bernilai true jika kedua syarat benar.</p>` }
        ],
        challenge: {
            id: 'chal-6',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Jika `status == "VIP"` DAN `belanja >= 100000`, cetak `Diskon 20%`, selain itu `Harga Normal`.',
            starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string status;\n    int belanja;\n    cin >> status >> belanja;\n    if (status == "VIP" && belanja >= 100000) {\n        cout << "Diskon 20%";\n    } else {\n        cout << "Harga Normal";\n    }\n    return 0;\n}`,
            hints: ['Gunakan `if (status == "VIP" && belanja >= 100000)`'],
            testCases: [{ id: 't6-1', input: 'VIP 150000', expectedOutput: 'Diskon 20%', description: 'VIP & 150k -> Diskon 20%' }]
        }
    },

    // --- LEVEL 3 — LOOP ---
    {
        id: 'lesson-7',
        level: 3,
        levelTitle: 'LEVEL 3 — LOOP (PERULANGAN)',
        title: 'Lesson 7 — Perulangan While & Do-While',
        description: 'Otomatiskan tugas berulang tanpa mengetik kode berulang kali.',
        icon: '🔄',
        duration: '20-25 Menit',
        xpReward: 300,
        prerequisites: ['lesson-6'],
        sections: [
            { id: 'sec-7-1', title: '1. While loop', type: 'explanation', content: `<p>Perulangan <code>while</code> berjalan selama syarat bernilai true.</p>` }
        ],
        challenge: {
            id: 'chal-7',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Cetak countdown roket dari angka `5` sampai `1` dipisahkan spasi. Output: `5 4 3 2 1 `.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int i = 5;\n    while (i >= 1) {\n        cout << i << " ";\n        i--;\n    }\n    return 0;\n}`,
            hints: ['Gunakan `while (i >= 1)` dan `i--;`'],
            testCases: [{ id: 't7-1', input: '', expectedOutput: '5 4 3 2 1 ', description: 'Mencetak 5 4 3 2 1 ' }]
        }
    },

    {
        id: 'lesson-8',
        level: 3,
        levelTitle: 'LEVEL 3 — LOOP (PERULANGAN)',
        title: 'Lesson 8 — Perulangan For & Nested Loop',
        description: 'Gunakan perulangan for yang ringkas untuk melakukan iterasi dengan jumlah langkah pasti.',
        icon: '🔁',
        duration: '20-25 Menit',
        xpReward: 320,
        prerequisites: ['lesson-7'],
        sections: [
            { id: 'sec-8-1', title: '1. For Loop', type: 'explanation', content: `<p>Sintaks: <code>for(int i=1; i<=N; i++) { ... }</code>.</p>` }
        ],
        challenge: {
            id: 'chal-8',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Cetak angka `1` sampai `5` menggunakan perulangan `for`. Output: `1 2 3 4 5 `.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        cout << i << " ";\n    }\n    return 0;\n}`,
            hints: ['Gunakan `for (int i = 1; i <= 5; i++)`'],
            testCases: [{ id: 't8-1', input: '', expectedOutput: '1 2 3 4 5 ', description: 'Mencetak 1 2 3 4 5 ' }]
        }
    },

    // --- LEVEL 4 — FUNCTION ---
    {
        id: 'lesson-9',
        level: 4,
        levelTitle: 'LEVEL 4 — FUNCTION (FUNGSI)',
        title: 'Lesson 9 — Pengenalan Void Function',
        description: 'Bagi kode besar menjadi fungsi-fungsi kecil yang rapi dan dapat dipanggil berulang kali.',
        icon: '⚙️',
        duration: '20-25 Menit',
        xpReward: 350,
        prerequisites: ['lesson-8'],
        sections: [
            { id: 'sec-9-1', title: '1. Void Function', type: 'explanation', content: `<p>Fungsi <code>void</code> melakukan tugas tanpa mengembalikan nilai.</p>` }
        ],
        challenge: {
            id: 'chal-9',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat fungsi `sapa()` yang mencetak `Selamat Belajar C++!` lalu panggil di dalam `main()`.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nvoid sapa() {\n    cout << "Selamat Belajar C++!";\n}\n\nint main() {\n    sapa();\n    return 0;\n}`,
            hints: ['Panggil `sapa();` di dalam `int main()`'],
            testCases: [{ id: 't9-1', input: '', expectedOutput: 'Selamat Belajar C++!', description: 'Mencetak Selamat Belajar C++!' }]
        }
    },

    {
        id: 'lesson-10',
        level: 4,
        levelTitle: 'LEVEL 4 — FUNCTION (FUNGSI)',
        title: 'Lesson 10 — Parameter & Return Value',
        description: 'Kirimkan masukan ke dalam fungsi dan dapatkan hasil perhitungan kembali dengan return!',
        icon: '📥',
        duration: '22-28 Menit',
        xpReward: 380,
        prerequisites: ['lesson-9'],
        sections: [
            { id: 'sec-10-1', title: '1. Return Value', type: 'explanation', content: `<p>Fungsi dengan return mengembalikan nilai ke pemanggilnya.</p>` }
        ],
        challenge: {
            id: 'chal-10',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat fungsi `int hitungLuasPersegi(int sisi)` yang mengembalikan `sisi * sisi`. Panggil fungsi tersebut dengan nilai `5` dan cetak hasilnya.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint hitungLuasPersegi(int sisi) {\n    return sisi * sisi;\n}\n\nint main() {\n    int hasil = hitungLuasPersegi(5);\n    cout << hasil;\n    return 0;\n}`,
            hints: ['Return `sisi * sisi;` lalu cetak hasilnya.'],
            testCases: [{ id: 't10-1', input: '', expectedOutput: '25', description: 'Luas persegi 5x5 = 25' }]
        }
    },

    // --- LEVEL 5 — ARRAY & STRING ---
    {
        id: 'lesson-11',
        level: 5,
        levelTitle: 'LEVEL 5 — ARRAY & STRING',
        title: 'Lesson 11 — Array 1D & Indexing',
        description: 'Simpan puluhan data dengan tipe sejenis dalam satu wadah Array yang berurutan!',
        icon: '📊',
        duration: '22-28 Menit',
        xpReward: 400,
        prerequisites: ['lesson-10'],
        sections: [
            { id: 'sec-11-1', title: '1. Array Indexing', type: 'explanation', content: `<p>Index array C++ selalu dimulai dari 0 (zero-indexed).</p>` }
        ],
        challenge: {
            id: 'chal-11',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat array `int nilai[3] = {80, 90, 100};` lalu hitung dan cetak `total` jumlah ketiga nilai tersebut (270).',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int nilai[3] = {80, 90, 100};\n    int total = nilai[0] + nilai[1] + nilai[2];\n    cout << total;\n    return 0;\n}`,
            hints: ['Jumlahkan `nilai[0] + nilai[1] + nilai[2]`'],
            testCases: [{ id: 't11-1', input: '', expectedOutput: '270', description: 'Total nilai = 270' }]
        }
    },

    // --- LEVEL 6 — POINTER & REFERENCE ---
    {
        id: 'lesson-12',
        level: 6,
        levelTitle: 'LEVEL 6 — POINTER & REFERENCE',
        title: 'Lesson 12 — Alamat Memori (&) & Pointer (*)',
        description: 'Kuasai alamat memori (&) dan variabel pointer (*) untuk manajemen memori tingkat lanjut.',
        icon: '📍',
        duration: '25-30 Menit',
        xpReward: 450,
        prerequisites: ['lesson-11'],
        sections: [
            { id: 'sec-12-1', title: '1. Alamat Memori & Pointer', type: 'explanation', content: `<p><code>&x</code> mengambil alamat memori, dan <code>int* ptr = &x;</code> menyimpan alamat memori tersebut.</p>` }
        ],
        challenge: {
            id: 'chal-12',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat `int x = 50;`, buat pointer `int* ptr = &x;`, lalu cetak nilai `*ptr` (dereference).',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 50;\n    int* ptr = &x;\n    cout << *ptr;\n    return 0;\n}`,
            hints: ['Cetak `cout << *ptr;` untuk mengakses nilai variabel asli.'],
            testCases: [{ id: 't12-1', input: '', expectedOutput: '50', description: 'Mencetak 50 via dereference pointer' }]
        }
    },

    // --- LEVEL 7 — STRUCT ---
    {
        id: 'lesson-13',
        level: 7,
        levelTitle: 'LEVEL 7 — STRUCT (STRUKTUR DATA)',
        title: 'Lesson 13 — Struct & Data Siswa',
        description: 'Kelompokkan berbagai tipe data berbeda ke dalam satu objek Struct terpadu.',
        icon: '🏗️',
        duration: '25-30 Menit',
        xpReward: 500,
        prerequisites: ['lesson-12'],
        sections: [
            { id: 'sec-13-1', title: '1. Struct C++', type: 'explanation', content: `<p>Struct mengabungkan variabel dengan tipe data berbeda dalam 1 entitas.</p>` }
        ],
        challenge: {
            id: 'chal-13',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat `struct Student { string nama; int umur; };`. Buat 1 object `Student s1; s1.nama = "Rahel"; s1.umur = 16;` lalu cetak `s1.nama` dan `s1.umur` dipisah spasi.',
            starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string nama;\n    int umur;\n};\n\nint main() {\n    Student s1;\n    s1.nama = "Rahel";\n    s1.umur = 16;\n    cout << s1.nama << " " << s1.umur;\n    return 0;\n}`,
            hints: ['Akses attribute dengan `s1.nama` dan `s1.umur`.'],
            testCases: [{ id: 't13-1', input: '', expectedOutput: 'Rahel 16', description: 'Mencetak Rahel 16' }]
        }
    },

    // --- LEVEL 8 — RECURSION ---
    {
        id: 'lesson-14',
        level: 8,
        levelTitle: 'LEVEL 8 — RECURSION (REKURSI)',
        title: 'Lesson 14 — Fungsi Rekursif & Factorial',
        description: 'Pahami fungsi yang memanggil dirinya sendiri dengan Base Case yang kuat.',
        icon: '🌀',
        duration: '25-30 Menit',
        xpReward: 550,
        prerequisites: ['lesson-13'],
        sections: [
            { id: 'sec-14-1', title: '1. Rekursi', type: 'explanation', content: `<p>Fungsi rekursif wajib memiliki Base Case agar tidak terjadi stack overflow.</p>` }
        ],
        challenge: {
            id: 'chal-14',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat fungsi rekursif `int faktorial(int n)` di mana jika `n <= 1` return `1`, selain itu return `n * faktorial(n - 1)`. Hitung `faktorial(5)` (120).',
            starterCode: `#include <iostream>\nusing namespace std;\n\nint faktorial(int n) {\n    if (n <= 1) return 1;\n    return n * faktorial(n - 1);\n}\n\nint main() {\n    cout << faktorial(5);\n    return 0;\n}`,
            hints: ['Gunakan `faktorial(5)` -> 120.'],
            testCases: [{ id: 't14-1', input: '', expectedOutput: '120', description: 'Faktorial 5 = 120' }]
        }
    },

    // --- LEVEL 9 — OOP ---
    {
        id: 'lesson-15',
        level: 9,
        levelTitle: 'LEVEL 9 — OBJECT ORIENTED PROGRAMMING',
        title: 'Lesson 15 — Class, Object, & Encapsulation',
        description: 'Kuasai paradigma OOP dengan Class, Constructor, Private/Public Access Modifiers.',
        icon: '🏛️',
        duration: '30-35 Menit',
        xpReward: 600,
        prerequisites: ['lesson-14'],
        sections: [
            { id: 'sec-15-1', title: '1. Class & Object', type: 'explanation', content: `<p>Class adalah cetakan (blueprint) dan Object adalah hasil wujud nyatanya.</p>` }
        ],
        challenge: {
            id: 'chal-15',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat `class Hero` dengan method `void serang()` yang mencetak `Hero menyerang!`. Buat object di `main()` dan panggil `serang()`.',
            starterCode: `#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n    void serang() {\n        cout << "Hero menyerang!";\n    }\n};\n\nint main() {\n    Hero h1;\n    h1.serang();\n    return 0;\n}`,
            hints: ['Panggil `h1.serang();`'],
            testCases: [{ id: 't15-1', input: '', expectedOutput: 'Hero menyerang!', description: 'Object Hero memanggil serang()' }]
        }
    },

    // --- LEVEL 10 — PROJECTS & FINAL ---
    {
        id: 'lesson-16',
        level: 10,
        levelTitle: 'LEVEL 10 — REAL-LIFE PROJECTS',
        title: 'Lesson 16 🚀 FINAL PROJECT — Student Management System XI-4',
        description: 'Gabungkan seluruh ilmu C++ kamu untuk membangun Aplikasi Manajemen Siswa & Nilai Kelas XI-4 utuh!',
        icon: '🏆',
        duration: '40-50 Menit',
        xpReward: 1000,
        prerequisites: ['lesson-15'],
        sections: [
            { id: 'sec-16-1', title: '1. Tantangan Akhir', type: 'explanation', content: `<p>Selamat atas pencapaianmu! Waktunya menggabungkan Variabel, Input/Output, Conditional, Loop, Struct, dan Fungsi untuk membuat Aplikasi Manajemen Siswa XI-4 lengkap!</p>` }
        ],
        challenge: {
            id: 'chal-16',
            title: '🚀 FINAL PROJECT C++',
            instruction: 'Buat program manajemen nilai yang membaca `nama` (string) dan `nilai` (int). Jika `nilai >= 75` cetak `Siswa: [nama] | Status: LULUS`, jika tidak cetak `Siswa: [nama] | Status: REMEDIAL`.',
            starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nama;\n    int nilai;\n    cin >> nama >> nilai;\n    \n    if (nilai >= 75) {\n        cout << "Siswa: " << nama << " | Status: LULUS";\n    } else {\n        cout << "Siswa: " << nama << " | Status: REMEDIAL";\n    }\n    return 0;\n}`,
            hints: ['Gunakan penggabungan teks string dan variabel.'],
            testCases: [
                { id: 't16-1', input: 'Rahel 95', expectedOutput: 'Siswa: Rahel | Status: LULUS', description: 'Rahel 95 -> LULUS' },
                { id: 't16-2', input: 'Niko 65', expectedOutput: 'Siswa: Niko | Status: REMEDIAL', description: 'Niko 65 -> REMEDIAL' }
            ]
        }
    }
];
