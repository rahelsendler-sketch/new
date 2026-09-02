/**
 * ASAH C++ — Structured Lessons Dataset (Phase 2 Expanded)
 * Complete Curriculum: Lessons 1 to 8 (Persiapan, Fundamental, Operators, Conditionals, Loops)
 * Includes Line-by-Line breakdowns, Analogies, Micro-Questions, Hints & Test Cases.
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
                    <p>Selamat datang di dunia C++! 🚀</p>
                    <p>Komputer sebenarnya adalah mesin yang sangat cepat, tetapi ia tidak paham bahasa manusia. Komputer hanya paham <strong>bahasa mesin (0 dan 1)</strong>.</p>
                    <div class="concept-analogy-box">
                        <span class="analogy-icon">💡</span>
                        <div>
                            <strong>Analogi Sederhana:</strong><br>
                            Bayangkan kamu adalah seorang Koki Indonesia dan memesan bahan makanan ke Pemasok dari Jepang. Kamu membutuhkan <strong>Penerjemah (Compiler)</strong> untuk mengubah instruksimu menjadi bahasa yang dipahami pemasok tersebut.
                        </div>
                    </div>
                    <p><strong>C++</strong> adalah bahasa pemrograman yang kita tulis (Source Code), dan <strong>Compiler</strong> adalah penerjemah yang mengubah kode C++ tersebut menjadi program komputer yang bisa dijalankan!</p>
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
                    { token: '#include <iostream>', explain: 'Memanggil pustaka (library) iostream untuk fitur Input (cin) & Output (cout).' },
                    { token: 'using namespace std;', explain: 'Memberitahu compiler agar kita bisa menggunakan perintah standar C++ seperti cout tanpa mengetik std::' },
                    { token: 'int main() { ... }', explain: 'Fungsi utama program. Semua eksekusi instruksi C++ SELALU dimulai dari titik ini.' },
                    { token: 'cout << "Hello World!";', explain: 'Singkatan dari Character Output. Digunakan untuk mencetak teks ke layar. Diakhiri tanda titik koma (;).' },
                    { token: 'return 0;', explain: 'Sinyal ke komputer bahwa program telah selesai berjalan dengan sukses tanpa error.' }
                ]
            },
            {
                id: 'sec-1-3',
                title: '3. Uji Pemahaman Kilat (Micro-Question)',
                type: 'micro-question',
                question: {
                    id: 'q1-1',
                    text: 'Apa fungsi utama dari perintah `cout` dalam C++?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: 'Membaca input ketikan dari keyboard' },
                        { id: 'B', text: 'Mencetak/menampilkan teks atau data ke layar', isCorrect: true },
                        { id: 'C', text: 'Menghentikan jalannya program' },
                        { id: 'D', text: 'Membuat variabel baru' }
                    ],
                    explanation: 'Benar sekali! `cout` (Character Output) bertugas menampilkan keluaran berupa teks atau angka ke console layar komputer kamu.'
                }
            },
            {
                id: 'sec-1-4',
                title: '4. Prediksi Output (Output Prediction)',
                type: 'micro-question',
                question: {
                    id: 'q1-2',
                    text: 'Setiap akhir statement dalam C++ wajib ditutup dengan simbol apa?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: 'Titik dua ( : )' },
                        { id: 'B', text: 'Titik koma ( ; )', isCorrect: true },
                        { id: 'C', text: 'Tanda kurung siku ( ] )' },
                        { id: 'D', text: 'Titik ( . )' }
                    ],
                    explanation: 'Tepat! Di C++, titik koma (;) ibarat tanda titik dalam kalimat. Tanpa titik koma, compiler akan mengalami Syntax Error!'
                }
            }
        ],
        challenge: {
            id: 'chal-1',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Tulis program C++ yang mencetak perintah salam: `Halo, dunia!` tepat di layar.',
            starterCode: `#include <iostream>
using namespace std;

int main() {
    // Tulis kode kamu di bawah ini
    
    return 0;
}`,
            hints: [
                'Gunakan perintah `cout << "..."` untuk menampilkan teks.',
                'Pastikan kalimat di dalam tanda petik ganda adalah `"Halo, dunia!"`.',
                'Sintaks lengkapnya: `cout << "Halo, dunia!";`'
            ],
            testCases: [
                {
                    id: 't1-1',
                    input: '',
                    expectedOutput: 'Halo, dunia!',
                    description: 'Program harus mencetak "Halo, dunia!"'
                }
            ]
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
                title: '1. Konsep Variabel & Analogi Kotak',
                type: 'explanation',
                content: `
                    <p>Dalam program, kita sangat sering menyimpan informasi (seperti skor game, harga barang, atau nama pengguna).</p>
                    <div class="concept-analogy-box">
                        <span class="analogy-icon">📦</span>
                        <div>
                            <strong>Analogi Kotak Memori:</strong><br>
                            Bayangkan variabel seperti <strong>kotak berlabel</strong> di dalam gudang. Kamu memberi label pada kotak tersebut (misal: <code>umur</code>), lalu memasukkan isi angka (misal: <code>16</code>) ke dalamnya.
                        </div>
                    </div>
                `
            },
            {
                id: 'sec-2-2',
                title: '2. Tipe Data Dasar C++',
                type: 'explanation',
                content: `
                    <p>Berikut 4 tipe data utama yang wajib kamu kuasai:</p>
                    <ul style="padding-left:20px; line-height:1.8">
                        <li><code>int</code> : Menyimpan bilangan bulat (contoh: <code>16</code>, <code>-5</code>).</li>
                        <li><code>double</code> : Menyimpan angka desimal (contoh: <code>3.14</code>, <code>75.5</code>).</li>
                        <li><code>string</code> : Menyimpan kumpulan teks (contoh: <code>"Rahel"</code>).</li>
                        <li><code>bool</code> : Menyimpan status benar/salah (<code>true</code> / <code>false</code>).</li>
                    </ul>
                `
            },
            {
                id: 'sec-2-3',
                title: '3. Prediksi Output & Perubahan Nilai',
                type: 'micro-question',
                question: {
                    id: 'q2-1',
                    text: 'Perhatikan kode berikut:\n```cpp\nint umur = 16;\numur = 20;\ncout << umur;\n```\nBerapa nilai yang akan dicetak di layar?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: '16' },
                        { id: 'B', text: '20', isCorrect: true },
                        { id: 'C', text: '1620' },
                        { id: 'D', text: 'Error' }
                    ],
                    explanation: 'Hebat! Variabel `umur` awalnya berisi 16, tetapi nilainya ditimpa menjadi 20.'
                }
            }
        ],
        challenge: {
            id: 'chal-2',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buatlah sebuah variabel bernama `umur` dengan tipe data `int` bernilai `16`, lalu tampilkan nilai variabel tersebut ke layar.',
            starterCode: `#include <iostream>
using namespace std;

int main() {
    // 1. Deklarasikan variabel umur bernilai 16
    
    // 2. Tampilkan nilai umur dengan cout
    
    return 0;
}`,
            hints: [
                'Gunakan sintaks: `int umur = 16;`',
                'Untuk menampilkan variabel, panggil `cout << umur;` (tanpa tanda petik di sekitar nama variabel).'
            ],
            testCases: [
                {
                    id: 't2-1',
                    input: '',
                    expectedOutput: '16',
                    description: 'Program harus mencetak angka 16'
                }
            ]
        }
    },

    {
        id: 'lesson-3',
        level: 1,
        levelTitle: 'LEVEL 1 — FUNDAMENTAL C++',
        title: 'Lesson 3 — Input User (cin) & Ekspresi',
        description: 'Buat program interaktif yang bisa menerima masukan dari pengguna dengan cin dan menghitung hasilnya.',
        icon: '⌨️',
        duration: '15-20 Menit',
        xpReward: 200,
        prerequisites: ['lesson-2'],
        sections: [
            {
                id: 'sec-3-1',
                title: '1. Membaca Input dengan `cin`',
                type: 'explanation',
                content: `
                    <p>Jika <code>cout</code> menggunakan panah ke kiri (<code>&lt;&lt;</code>) untuk mengeluarkan data, maka <strong><code>cin</code></strong> (Character Input) menggunakan panah ke kanan (<code>&gt;&gt;</code>) untuk memasukkan data dari keyboard ke dalam variabel.</p>
                `
            },
            {
                id: 'sec-3-2',
                title: '2. Arah Panah Operator',
                type: 'micro-question',
                question: {
                    id: 'q3-1',
                    text: 'Arah panah manakah yang benar untuk mengambil input ketikan keyboard dengan `cin`?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: 'cin << nama;' },
                        { id: 'B', text: 'cin >> nama;', isCorrect: true },
                        { id: 'C', text: 'cin -> nama;' }
                    ],
                    explanation: 'Sempurna! `cin >>` menggunakan dua panah mengarah ke kanan (masuk ke variabel).'
                }
            }
        ],
        challenge: {
            id: 'chal-3',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buatlah program yang membaca masukan kata `nama` dari user dengan `cin`, kemudian menampilkan ucapan `Halo, ` diikuti nama tersebut.',
            starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string nama;
    
    // 1. Baca input ketikan nama dengan cin
    
    // 2. Tampilkan "Halo, " dilanjutkan variabel nama
    
    return 0;
}`,
            hints: [
                'Gunakan `cin >> nama;` untuk membaca masukan ketikan.',
                'Gunakan `cout << "Halo, " << nama;` untuk menggabungkan teks dan variabel.'
            ],
            testCases: [
                {
                    id: 't3-1',
                    input: 'Budi',
                    expectedOutput: 'Halo, Budi',
                    description: 'Jika input = "Budi", output harus "Halo, Budi"'
                }
            ]
        }
    },

    {
        id: 'lesson-4',
        level: 1,
        levelTitle: 'LEVEL 1 — FUNDAMENTAL C++',
        title: 'Lesson 4 — Operator Aritmatika & Modulus (%)',
        description: 'Kuasai operator matematika +, -, *, /, modulus (%), dan increment ++ dalam program kasir & kalkulator.',
        icon: '➕',
        duration: '15-20 Menit',
        xpReward: 220,
        prerequisites: ['lesson-3'],
        sections: [
            {
                id: 'sec-4-1',
                title: '1. Operator Matematika C++',
                type: 'explanation',
                content: `
                    <p>C++ mendukung operasi matematika standar:</p>
                    <ul style="padding-left:20px; line-height:1.8">
                        <li><code>+</code> Tambah, <code>-</code> Kurang</li>
                        <li><code>*</code> Kali, <code>/</code> Bagi</li>
                        <li><code>%</code> Modulus (Sisa Bagi). Contoh: <code>7 % 3 = 1</code> (karena 7 dibagi 3 sisa 1).</li>
                        <li><code>x++</code> Increment (menambah nilai x sebesar 1).</li>
                    </ul>
                `
            },
            {
                id: 'sec-4-2',
                title: '2. Prediksi Hasil Modulus',
                type: 'micro-question',
                question: {
                    id: 'q4-1',
                    text: 'Berapakah hasil dari ekspresi `10 % 3` dalam C++?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: '3' },
                        { id: 'B', text: '1', isCorrect: true },
                        { id: 'C', text: '0' },
                        { id: 'D', text: '3.33' }
                    ],
                    explanation: 'Tepat! 10 dibagi 3 adalah 3 dengan sisa 1. Operator `%` mengembalikan nilai sisa bagi yaitu 1.'
                }
            }
        ],
        challenge: {
            id: 'chal-4',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat program kasir yang menerima input `bayar` dan `total`, lalu menghitung dan mencetak uang `kembalian` (kembalian = bayar - total).',
            starterCode: `#include <iostream>
using namespace std;

int main() {
    int bayar, total;
    cin >> bayar >> total;
    
    // Hitung kembalian = bayar - total
    // Tampilkan nilai kembalian ke layar
    
    return 0;
}`,
            hints: [
                'Deklarasikan `int kembalian = bayar - total;`',
                'Tampilkan hasilnya dengan `cout << kembalian;`.'
            ],
            testCases: [
                {
                    id: 't4-1',
                    input: '50000 35000',
                    expectedOutput: '15000',
                    description: 'Jika bayar = 50000 dan total = 35000, kembalian harus 15000'
                }
            ]
        }
    },

    // --- LEVEL 2 — CONDITIONAL ---
    {
        id: 'lesson-5',
        level: 2,
        levelTitle: 'LEVEL 2 — CONDITIONAL (PERCABANGAN)',
        title: 'Lesson 5 — Percabangan Logika (if, else if, else)',
        description: 'Ajarkan komputer kamu untuk mengambil keputusan secara otomatis berdasarkan kondisi logika!',
        icon: '🔀',
        duration: '18-22 Menit',
        xpReward: 250,
        prerequisites: ['lesson-4'],
        sections: [
            {
                id: 'sec-5-1',
                title: '1. Mengambil Keputusan dengan `if`',
                type: 'explanation',
                content: `
                    <p>Sama seperti manusia, program komputer perlu mengambil keputusan berdasarkan kondisi:</p>
                    <div class="concept-analogy-box">
                        <span class="analogy-icon">🚦</span>
                        <div>
                            <strong>Analogi Lampu Lalu Lintas:</strong><br>
                            - Jika lampu Merah ➔ Berhenti.<br>
                            - Jika lampu Kuning ➔ Hati-hati.<br>
                            - Selain itu (Hijau) ➔ Jalan terus.
                        </div>
                    </div>
                `
            },
            {
                id: 'sec-5-2',
                title: '2. Sintaks if - else dalam C++',
                type: 'code-breakdown',
                codeSnippet: `int nilai = 80;

if (nilai >= 75) {
    cout << "LULUS";
} else {
    cout << "REMEDIAL";
}`,
                breakdownLines: [
                    { token: 'if (nilai >= 75)', explain: 'Mengecek apakah ekspresi di dalam kurung bernilai TRUE.' },
                    { token: 'cout << "LULUS";', explain: 'Blok instruksi yang dijalankan jika kondisi bernilai TRUE.' },
                    { token: 'else { ... }', explain: 'Blok alternatif yang dijalankan jika kondisi bernilai FALSE.' }
                ]
            },
            {
                id: 'sec-5-3',
                title: '3. Micro-Question Percabangan',
                type: 'micro-question',
                question: {
                    id: 'q5-1',
                    text: 'Jika `int umur = 15;`, apa output dari:\n```cpp\nif (umur >= 17) {\n    cout << "Boleh Buat SIM";\n} else {\n    cout << "Belum Cukup Umur";\n}\n```',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: 'Boleh Buat SIM' },
                        { id: 'B', text: 'Belum Cukup Umur', isCorrect: true },
                        { id: 'C', text: 'Error' }
                    ],
                    explanation: 'Benar! Karena 15 tidak lebih besar atau sama dengan 17, blok `else` yang akan dijalankan.'
                }
            }
        ],
        challenge: {
            id: 'chal-5',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buatlah program yang membaca nilai ujian `nilai` dari user. Jika `nilai >= 75` cetak `LULUS`, selain itu cetak `REMEDIAL`.',
            starterCode: `#include <iostream>
using namespace std;

int main() {
    int nilai;
    cin >> nilai;
    
    // Tulis struktur if - else di sini
    
    return 0;
}`,
            hints: [
                'Gunakan struktur `if (nilai >= 75) { cout << "LULUS"; } else { cout << "REMEDIAL"; }`',
                'Pastikan teks persis sama dengan instruksi.'
            ],
            testCases: [
                {
                    id: 't5-1',
                    input: '85',
                    expectedOutput: 'LULUS',
                    description: 'Nilai 85 harus menghasilkan "LULUS"'
                },
                {
                    id: 't5-2',
                    input: '60',
                    expectedOutput: 'REMEDIAL',
                    description: 'Nilai 60 harus menghasilkan "REMEDIAL"'
                }
            ]
        }
    },

    {
        id: 'lesson-6',
        level: 2,
        levelTitle: 'LEVEL 2 — CONDITIONAL (PERCABANGAN)',
        title: 'Lesson 6 — Operator Logika (&&, ||, !)',
        description: 'Gabungkan beberapa kondisi kompleks menggunakan operator DAN (&&), ATAU (||), dan BUKAN (!).',
        icon: '⚡',
        duration: '18-22 Menit',
        xpReward: 270,
        prerequisites: ['lesson-5'],
        sections: [
            {
                id: 'sec-6-1',
                title: '1. Operator Logika Majemuk',
                type: 'explanation',
                content: `
                    <p>Kadang kita harus mengecek lebih dari satu syarat sekaligus:</p>
                    <ul style="padding-left:20px; line-height:1.8">
                        <li><code>&&</code> (AND / DAN) : Bernilai TRUE jika <strong>semua</strong> syarat benar.</li>
                        <li><code>||</code> (OR / ATAU) : Bernilai TRUE jika <strong>salah satu</strong> syarat benar.</li>
                        <li><code>!</code> (NOT / BUKAN) : Membalik nilai kebenaran (TRUE ➔ FALSE).</li>
                    </ul>
                `
            },
            {
                id: 'sec-6-2',
                title: '2. Prediksi Operator Logika AND (&&)',
                type: 'micro-question',
                question: {
                    id: 'q6-1',
                    text: 'Jika `int umur = 20;` dan `bool punyaKTP = true;`, apakah `(umur >= 17 && punyaKTP == true)` bernilai true?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: 'Ya (true)', isCorrect: true },
                        { id: 'B', text: 'Tidak (false)' }
                    ],
                    explanation: 'Sempurna! Karena kedua syarat bernilai benar, maka hasil operator `&&` adalah true.'
                }
            }
        ],
        challenge: {
            id: 'chal-6',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat program sistem diskon toko. Membaca `status` (string) dan `belanja` (int). Jika `status == "VIP"` DAN `belanja >= 100000`, cetak `Diskon 20%`, jika tidak cetak `Harga Normal`.',
            starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string status;
    int belanja;
    cin >> status >> belanja;
    
    // Tulis percabangan dengan && di sini
    
    return 0;
}`,
            hints: [
                'Gunakan `if (status == "VIP" && belanja >= 100000)`',
                'Tampilkan "Diskon 20%" jika benar, dan "Harga Normal" pada else.'
            ],
            testCases: [
                {
                    id: 't6-1',
                    input: 'VIP 150000',
                    expectedOutput: 'Diskon 20%',
                    description: 'Status VIP & belanja 150000 -> Diskon 20%'
                },
                {
                    id: 't6-2',
                    input: 'Reguler 150000',
                    expectedOutput: 'Harga Normal',
                    description: 'Status Reguler -> Harga Normal'
                }
            ]
        }
    },

    // --- LEVEL 3 — LOOP ---
    {
        id: 'lesson-7',
        level: 3,
        levelTitle: 'LEVEL 3 — LOOP (PERULANGAN)',
        title: 'Lesson 7 — Perulangan While & Do-While',
        description: 'Otomatiskan tugas berulang tanpa mengetik kode berulang kali menggunakan perulangan while!',
        icon: '🔄',
        duration: '20-25 Menit',
        xpReward: 300,
        prerequisites: ['lesson-6'],
        sections: [
            {
                id: 'sec-7-1',
                title: '1. Mengapa Perulangan Diperlukan?',
                type: 'explanation',
                content: `
                    <p>Bayangkan kamu diminta mencetak angka 1 sampai 100. Tanpa perulangan, kamu harus mengetik <code>cout</code> sebanyak 100 kali! 😱</p>
                    <p>Dengan <strong>perulangan while</strong>, kita cukup menulisnya dalam beberapa baris kode.</p>
                `
            },
            {
                id: 'sec-7-2',
                title: '2. Sintaks Perulangan While',
                type: 'code-breakdown',
                codeSnippet: `int angka = 1;

while (angka <= 5) {
    cout << angka << " ";
    angka++;
}`,
                breakdownLines: [
                    { token: 'int angka = 1;', explain: 'Inisialisasi variabel penghitung (counter) awal.' },
                    { token: 'while (angka <= 5)', explain: 'Mengecek syarat. Selama angka <= 5, blok di dalam kurung akan diulang terus.' },
                    { token: 'angka++;', explain: 'Menambah nilai angka setiap kali perulangan selesai agar perulangan tidak menjadi Infinite Loop.' }
                ]
            },
            {
                id: 'sec-7-3',
                title: '3. Prediksi Output Perulangan',
                type: 'micro-question',
                question: {
                    id: 'q7-1',
                    text: 'Berapa kali perulangan `while (x < 3)` akan berjalan jika `int x = 0;` dan ada `x++;` di dalamnya?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: '3 kali (x = 0, 1, 2)', isCorrect: true },
                        { id: 'B', text: '4 kali' },
                        { id: 'C', text: '0 kali' }
                    ],
                    explanation: 'Hebat! Perulangan berjalan untuk x=0, x=1, dan x=2 (total 3 kali). Ketika x=3, syarat (3 < 3) bernilai false dan perulangan berhenti.'
                }
            }
        ],
        challenge: {
            id: 'chal-7',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat program countdown roket dari angka `5` sampai `1` dipisahkan spasi menggunakan perulangan `while`. Output harus: `5 4 3 2 1 `.',
            starterCode: `#include <iostream>
using namespace std;

int main() {
    int i = 5;
    
    // Tulis perulangan while di sini
    
    return 0;
}`,
            hints: [
                'Gunakan `while (i >= 1)`',
                'Di dalam loop, cetak `cout << i << " ";` lalu kurangi nilainya dengan `i--;`'
            ],
            testCases: [
                {
                    id: 't7-1',
                    input: '',
                    expectedOutput: '5 4 3 2 1 ',
                    description: 'Harus mencetak "5 4 3 2 1 "'
                }
            ]
        }
    },

    {
        id: 'lesson-8',
        level: 3,
        levelTitle: 'LEVEL 3 — LOOP (PERULANGAN)',
        title: 'Lesson 8 — Perulangan For & Nested Loop',
        description: 'Gunakan perulangan for yang ringkas untuk melakukan iterasi dengan jumlah langkah yang pasti.',
        icon: '🔁',
        duration: '20-25 Menit',
        xpReward: 320,
        prerequisites: ['lesson-7'],
        sections: [
            {
                id: 'sec-8-1',
                title: '1. Perulangan For yang Ringkas',
                type: 'explanation',
                content: `
                    <p>Perulangan <strong><code>for</code></strong> menggabungkan inisialisasi, syarat, dan increment dalam 1 baris ringkas:</p>
                    <div class="code-example-block">
                        <div class="code-header-bar">Sintaks For Loop</div>
                        <pre class="code-snippet-pre">for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}</pre>
                    </div>
                `
            },
            {
                id: 'sec-8-2',
                title: '2. Micro-Question For Loop',
                type: 'micro-question',
                question: {
                    id: 'q8-1',
                    text: 'Apa output dari `for (int i = 1; i <= 3; i++) { cout << i; }`?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'A', text: '123', isCorrect: true },
                        { id: 'B', text: '1 2 3' },
                        { id: 'C', text: '321' }
                    ],
                    explanation: 'Benar! Karena tidak ada spasi di dalam `cout << i;`, angka 1, 2, dan 3 akan dicetak berdampingan menjadi 123.'
                }
            }
        ],
        challenge: {
            id: 'chal-8',
            title: 'Sekarang giliran kamu 👨‍💻',
            instruction: 'Buat program menggunakan perulangan `for` untuk mencetak angka `1` sampai `5` masing-masing dipisahkan spasi. Output: `1 2 3 4 5 `.',
            starterCode: `#include <iostream>
using namespace std;

int main() {
    // Tulis perulangan for di sini
    
    return 0;
}`,
            hints: [
                'Gunakan `for (int i = 1; i <= 5; i++)`',
                'Cetak nilai `i` dengan `cout << i << " ";`'
            ],
            testCases: [
                {
                    id: 't8-1',
                    input: '',
                    expectedOutput: '1 2 3 4 5 ',
                    description: 'Harus mencetak "1 2 3 4 5 "'
                }
            ]
        }
    }
];
