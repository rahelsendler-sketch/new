/**
 * ASAH C++ — Interactive Personal AI Tutor
 * Answers user C++ questions, explains errors, and clarifies concepts according to user level.
 */

class AITutor {
    constructor() {
        this.knowledgeBase = [
            {
                keywords: ['int', 'integer', 'kenapa int'],
                answer: '`int` (singkatan dari Integer) digunakan untuk menyimpan bilangan bulat tanpa koma (seperti 1, 10, -5). Komputer perlu tahu tipe data ini agar bisa mengalokasikan ruang memori yang tepat (biasanya 4 byte).'
            },
            {
                keywords: ['double', 'float', 'koma', 'desimal'],
                answer: '`double` dan `float` digunakan untuk angka berkoma/desimal (seperti 3.14 atau 75.5). `double` lebih presisi (menggunakan 8 byte memori) dibanding `float` (4 byte).'
            },
            {
                keywords: ['cout', 'mencetak', 'keluar', 'output'],
                answer: '`cout` adalah singkatan dari **Character Output**. Fungsinya untuk menampilkan data atau teks ke layar console. Selalu gunakan dua panah ke kiri (`<<`) setelah `cout`!'
            },
            {
                keywords: ['cin', 'input', 'baca', 'masukan'],
                answer: '`cin` adalah singkatan dari **Character Input**. Fungsinya untuk membaca ketikan dari keyboard dan menyimpannya ke dalam variabel. Gunakan dua panah ke kanan (`>>`) setelah `cin`!'
            },
            {
                keywords: ['while', 'for', 'beda while', 'beda for', 'perulangan'],
                answer: '• **`for`** lebih cocok jika kamu **sudah tahu berapa kali** perulangan akan berjalan (misal 10 kali).\n• **`while`** lebih cocok jika perulangan berjalan **selama syarat masih bernilai benar** (misal perulangan meminta PIN sampai benar).'
            },
            {
                keywords: ['if', 'else', 'percabangan', 'kondisi'],
                answer: '`if` digunakan untuk membuat keputusan. Komputer mengecek syarat di dalam `if(syarat)`: jika BENAR (true) maka instruksi dijalankan; jika SALAH (false) maka komputer melompat ke blok `else`.'
            },
            {
                keywords: ['error', 'semicolon', 'titik koma', ';'],
                answer: 'Titik koma (`;`) di C++ adalah tanda penutup sebuah instruksi (seperti tanda titik dalam kalimat). Jika kamu mendapat error *expected semicolon*, periksa baris kode tempat kamu lupa menaruh `;`!'
            },
            {
                keywords: ['modulus', '%', 'sisa bagi'],
                answer: 'Operator `%` (Modulus) menghitung **sisa hasil bagi** dari pembagian dua bilangan bulat. Contoh: `7 % 3` hasilnya `1` karena 7 dibagi 3 adalah 2 dengan sisa 1. Sangat berguna untuk mengecek angka genap/ganjil!'
            }
        ];
    }

    ask(queryText, userCode = '') {
        const q = queryText.toLowerCase().trim();
        if (!q) return 'Ketik pertanyaan kamu tentang C++ di atas!';

        // Search Knowledge Base
        for (let item of this.knowledgeBase) {
            if (item.keywords.some(k => q.includes(k))) {
                return item.answer;
            }
        }

        // If user asks about their code error
        if (q.includes('error') || q.includes('salah') || q.includes('kenapa')) {
            if (userCode) {
                const result = cppExecutor.execute(userCode);
                if (!result.success) {
                    return `🤖 **Analisis Error Kode Kamu:**\n\n${result.error}\n\n💡 **Saran Tutor:** Periksa kembali penulisan sintaks dan tanda titik koma (;) pada baris tersebut.`;
                } else {
                    return `🤖 Kode kamu saat ini tidak memiliki Syntax Error! Outputnya adalah:\n\`${result.output}\`\n\nJika hasilnya belum sesuai keinginan, coba periksa logika perhitungan atau urutan instruksi kamu.`;
                }
            }
        }

        return `🤖 **Tutor C++:** Pertanyaan bagus! Untuk topik "${queryText}", ingatlah bahwa di C++ setiap variabel harus dinyatakan tipe datanya terlebih dahulu dan setiap instruksi ditutup dengan titik koma (;). Kamu bisa mencoba mengetik kodenya langsung di **Coding Editor** untuk melihat hasilnya!`;
    }
}

const aiTutor = new AITutor();
