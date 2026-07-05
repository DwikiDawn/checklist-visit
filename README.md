# Ragdalion Assessment Tool

Aplikasi web untuk customer visit assessment IT & OT/IoT yang menghasilkan Request BoM atau Quotation secara otomatis berdasarkan hasil checklist.

![Ragdalion Assessment](https://img.shields.io/badge/Version-1.0-orange) ![React](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.x-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4.x-cyan)

## 🎯 Purpose

Aplikasi ini dirancang untuk tim Sales & Marketing PT Ragdalion Revolusi Industri untuk melakukan assessment sistematis saat visit ke customer manufacturing. Output berupa:
- **Request BoM** untuk kebutuhan OT/IoT (hardware, sensor, PLC, HMI, dll)
- **Quotation** untuk kebutuhan IT (software development, web/mobile app, AI, dashboard)

## ✨ Features

### 3 Jenis Assessment
1. **IT Assessment (PRD)** → Generate Quotation
   - Company profile & sistem existing
   - Requirements & pain points  
   - Technical requirements (web, mobile, API)
   - AI/ML features (predictive, vision, NLP)
   - Infrastructure & security

2. **OT/IoT Assessment (Genba)** → Generate Request BoM
   - Site info & lingkungan produksi
   - PLC & controller (merk, protokol, kondisi)
   - HMI & SCADA
   - Sensor & instrumentasi (temperature, pressure, vibration, dll)
   - Network OT & infrastruktur
   - Machine monitoring & OEE
   - Safety & compliance

3. **IT + OT Combined** → Generate both BoM & Quotation

### Smart Output Generator
- **Auto-calculate** item yang dibutuhkan berdasarkan jawaban checklist
- **Real catalog pricing** dari inventory Ragdalion
- **Grouped by category** untuk mudah dibaca
- **Export JSON** untuk integrasi dengan sistem lain
- **Print/PDF ready** untuk presentasi ke customer

### Modern UX
- Progress tracking real-time
- Auto-save setiap input
- Mobile responsive (bisa diisi di laptop atau HP saat di lapangan)
- Dark theme dengan branding Ragdalion
- LocalStorage persistence (data tidak hilang meskipun browser ditutup)

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **Vite 6.x** - Build tool & dev server (super fast HMR)
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **Lucide React** - Icon library
- **LocalStorage** - Client-side data persistence

## 📦 Installation

```bash
# Clone atau extract project
cd ragdalion-assessment

# Install dependencies
npm install

# Run development server
npm run dev
```

Aplikasi akan jalan di **http://localhost:5173** (Vite default) atau **http://localhost:3000**

## 🚀 Usage

### 1. Dashboard
Halaman utama menampilkan:
- Stats assessment (Total, Draft, In Progress, Completed)
- List semua assessment yang pernah dibuat
- Quick action: "Mulai Assessment Baru"

### 2. New Assessment
Pilih jenis assessment:
- **IT Assessment (PRD)** - untuk software/web/mobile/AI project
- **OT/IoT Assessment (Genba)** - untuk sensor/PLC/HMI/hardware project  
- **IT + OT Combined** - untuk project full-stack industrial

Isi informasi customer: nama perusahaan, industri, PIC, tanggal visit.

### 3. Fill Checklist
- Checklist dibagi per section dengan progress indicator
- Required fields ditandai dengan * (merah)
- Support berbagai input type: text, textarea, select, multi-checklist
- Auto-save setiap perubahan
- Navigate dengan tombol Previous/Next

### 4. Generate Output
Setelah checklist selesai (atau minimal required fields terisi), klik "Selesai & Generate Output".

Output akan menampilkan:
- **BoM Table** (untuk OT) - daftar material, qty, harga, subtotal per category
- **Quotation Table** (untuk IT) - daftar layanan/software, qty, harga, subtotal per category
- Total estimasi harga
- Customer info summary

### 5. Export & Share
- **Export JSON** - full data untuk integrasi atau backup
- **Print/PDF** - untuk kirim ke customer atau arsip

## 📁 Project Structure

```
ragdalion-assessment/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Header, navigation, footer
│   ├── context/
│   │   └── AppContext.jsx      # Global state management
│   ├── data/
│   │   ├── checklistTemplates.js   # IT & OT checklist templates
│   │   └── catalogData.js          # Item catalog & price, BoM/Quotation generator
│   ├── pages/
│   │   ├── Dashboard.jsx           # Home page
│   │   ├── NewAssessment.jsx       # Choose type & customer info
│   │   ├── AssessmentForm.jsx      # Main checklist form
│   │   └── AssessmentResult.jsx    # Display BoM/Quotation result
│   ├── App.jsx                 # Router setup
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles & Tailwind config
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Customization

### Update Checklist Items
Edit `src/data/checklistTemplates.js` untuk:
- Tambah/ubah pertanyaan checklist
- Tambah section baru
- Update required fields

### Update Catalog & Pricing
Edit `src/data/catalogData.js` untuk:
- Update harga item OT (sensor, PLC, gateway, dll)
- Update harga layanan IT (web app, mobile, AI, dll)
- Tambah item baru ke catalog
- Modify logic generator BoM/Quotation

### Update Branding
Edit `src/index.css` untuk ubah color scheme:
```css
--color-ragda-primary: #1e3a5f;    /* Navy blue */
--color-ragda-accent: #f59e0b;      /* Orange */
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload folder 'dist' ke Netlify
```

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## 💾 Data Storage

Data assessment disimpan di **browser LocalStorage** dengan key `ragda-assessments`. Data akan tetap ada meskipun browser ditutup, kecuali user clear browser data.

Untuk production dengan multi-user, consider:
- Backend API (Node.js + MongoDB/PostgreSQL)
- Firebase/Supabase untuk realtime sync
- Export/import JSON untuk backup manual

## 📝 Development Notes

### Build untuk Production
```bash
npm run build
```
Output di folder `dist/`

### Preview Production Build
```bash
npm run preview
```

### Lint & Format
Project ini belum include ESLint/Prettier. Untuk add:
```bash
npm install --save-dev eslint prettier
```

## 🤝 Contributing

Project ini developed by **Dawn Agent** untuk PT Ragdalion Revolusi Industri.

Untuk update atau request fitur baru, hubungi:
- **Dwiki Darmawan** (Manager Marketing & Sales)
- Email: dwiky.ragda@gmail.com

## 📄 License

© 2026 PT Ragdalion Revolusi Industri. Internal use only.

---

**Built with ❤️ by Dawn Agent**
