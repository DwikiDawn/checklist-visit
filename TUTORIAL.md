# Ragdalion Assessment - Quick Start Guide

## 🚀 Mulai Aplikasi

### Development Mode
```bash
cd C:\Users\user\ragdalion-assessment
npm run dev
```
Buka browser: **http://localhost:3000** atau **http://localhost:5173**

### Production Build
```bash
npm run build
npm run preview
```

---

## 📖 Tutorial Penggunaan

### 1. CREATE NEW ASSESSMENT

**Dashboard → Klik "Mulai Assessment Baru"**

Pilih tipe assessment:
- **IT Assessment (PRD)** - untuk project software/web/mobile/AI
- **OT/IoT Assessment (Genba)** - untuk project hardware/sensor/PLC/HMI
- **IT + OT Combined** - untuk project full-stack

Isi data customer:
- Nama perusahaan (required)
- Industri (Automotive, FMCG, Electronics, dll)
- PIC / Contact Person
- Tanggal visit

Klik **"Mulai Assessment"**

---

### 2. ISI CHECKLIST

#### IT Assessment - 6 Section:
1. **Profil Perusahaan** - nama PT, alamat, industri, PIC, jumlah karyawan
2. **Sistem IT Existing** - ERP, database, server, jaringan, API
3. **Kebutuhan & Pain Points** - problem, proses bisnis, target user, timeline, budget
4. **Technical Requirements** - platform (web/mobile), auth, security, volume data
5. **AI & Advanced Features** - ML, computer vision, NLP, IoT integration
6. **Catatan & Dokumentasi** - foto, notes, follow-up

#### OT Assessment - 8 Section:
1. **Informasi Site** - plant, area, kondisi lingkungan, power, network
2. **PLC & Controller** - merk PLC, qty, protokol, firmware, kondisi
3. **HMI & SCADA** - merk HMI, ukuran layar, SCADA system, remote monitoring
4. **Sensor & Instrumentasi** - sensor existing & yang perlu ditambah, qty, tipe output
5. **Network & Infrastruktur OT** - switch, segregasi IT-OT, gateway, kabel
6. **Data Mesin & Produksi** - nama mesin, qty, parameter (OEE, cycle time), interval
7. **Safety & Compliance** - standar (ISO), safety PLC, emergency stop, cybersecurity
8. **Catatan Genba** - layout, foto panel/mesin, temuan, rekomendasi

**Tips:**
- Field dengan tanda ***** wajib diisi
- Progress bar di sidebar menunjukkan % completion
- Auto-save setiap input
- Bisa keluar dan lanjut nanti (data tersimpan di browser)

---

### 3. GENERATE OUTPUT

Setelah selesai isi checklist, klik **"Selesai & Generate Output"**

Output yang dihasilkan:

#### A. Request BoM (OT/IoT)
Otomatis calculate:
- Sensor yang dibutuhkan (berdasarkan jawaban section 4)
- HMI baru (jika kondisi perlu ganti/upgrade)
- IoT Gateway / Edge Server (berdasarkan kebutuhan)
- Network equipment (switch, kabel, panel box)
- PLC baru (jika kondisi perlu diganti)
- OT Services (instalasi, programming PLC/HMI, training)

Tabel BoM menampilkan:
- Item name & description
- Qty & unit
- Harga satuan
- Subtotal
- **Total Estimasi**

#### B. Quotation (IT Services)
Otomatis calculate:
- Software development (web/mobile/API) - berdasarkan platform & complexity
- Dashboard & Analytics - berdasarkan reporting needs & AI
- AI/ML Services - predictive, vision, NLP, anomaly detection
- Infrastructure (cloud/on-premise setup)
- Training & Maintenance

Tabel Quotation menampilkan sama seperti BoM dengan total estimasi.

---

### 4. EXPORT & SHARE

**Export JSON**
- Full data assessment + responses + generated output
- Untuk backup atau integrasi dengan sistem lain
- Filename: `assessment-[CustomerName]-[timestamp].json`

**Print / PDF**
- Klik tombol "Print / PDF"
- Browser print dialog akan muncul
- Pilih "Save as PDF" atau langsung print
- Format professional, siap kirim ke customer

---

## 💡 Use Cases

### Scenario 1: Visit ke Automotive Plant (OT Focus)
1. Pilih **OT/IoT Assessment (Genba)**
2. Customer: PT Toyota Motor Manufacturing, Industri: Automotive
3. Isi checklist:
   - Site: Indoor-Panas/Berdebu, power 220V tersedia, WiFi available
   - PLC: Mitsubishi FX5U, 5 unit, Modbus TCP
   - Sensor perlu: Temperature (10 pcs), Vibration (5 pcs), Current (15 pcs)
   - HMI: Perlu upgrade, ukuran 10.1"
   - Mesin: 8 mesin injection molding, monitoring OEE + Cycle Time
4. Generate BoM:
   - 10x Temperature Sensor PT100 @ Rp 850k
   - 5x Vibration Sensor @ Rp 3.5jt
   - 15x Current Transformer @ Rp 450k
   - 5x HMI 10.1" @ Rp 9.5jt
   - 1x IoT Gateway @ Rp 5.5jt
   - Network equipment + Services
   - **Total: Rp 150-200 juta**

### Scenario 2: Digital Transformation Project (IT Focus)
1. Pilih **IT Assessment (PRD)**
2. Customer: PT Indofood CBP, Industri: FMCG
3. Isi checklist:
   - Sistem: SAP existing, hybrid cloud, perlu integrasi
   - Kebutuhan: Real-time production dashboard, mobile app untuk supervisor
   - AI: Predictive analytics untuk demand forecasting
   - Platform: Web + Mobile (Android/iOS)
   - Budget: 500jt - 1M
4. Generate Quotation:
   - Web Application (Enterprise) @ Rp 300jt
   - Mobile App (Cross-platform) @ Rp 100jt
   - AI Predictive Analytics @ Rp 120jt
   - Dashboard Advanced @ Rp 75jt
   - Cloud Setup + Training + Maintenance @ Rp 65jt
   - **Total: Rp 660 juta**

### Scenario 3: Full Stack Industrial IoT (Combined)
1. Pilih **IT + OT Combined**
2. Isi checklist IT (section 1-6) + OT (section 7-14)
3. Generate both BoM + Quotation
4. Present complete solution ke customer

---

## 🔧 Tips & Tricks

**Save Time:**
- Bawa laptop saat visit, isi checklist langsung di lokasi
- Atau pakai HP (mobile responsive)
- Foto panel/mesin pakai HP, deskripsikan di field "Catatan Genba"

**Accuracy:**
- Bawa spec sheet PLC/HMI yang umum untuk referensi
- Tanya protokol komunikasi ke teknisi customer
- Cek nameplate sensor/mesin untuk merk & model

**Follow-up:**
- Export JSON setelah selesai visit
- Print PDF untuk diserahkan ke customer di akhir visit atau follow-up meeting
- Notes di section terakhir untuk reminder item yang perlu konfirmasi

---

## 📞 Support

Ada bug atau request fitur baru? Contact:
- **Dwiki Darmawan** (Boss Dawn)
- Email: dwiky.ragda@gmail.com
- WhatsApp: (via Dawn Agent)

---

**Happy Assessing! 🚀**
