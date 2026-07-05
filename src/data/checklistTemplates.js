// IT/PRD Assessment Checklist Template
export const IT_PRD_CHECKLIST = {
  id: 'it-prd',
  title: 'IT Assessment - Product Requirement Document',
  description: 'Checklist lengkap untuk assessment kebutuhan IT customer',
  outputType: 'quotation', // IT -> langsung Quotation
  sections: [
    {
      id: 'company-profile',
      title: '1. Profil Perusahaan',
      icon: 'Building2',
      items: [
        { id: 'cp-1', label: 'Nama perusahaan & PT', type: 'text', required: true },
        { id: 'cp-2', label: 'Alamat & lokasi site', type: 'text', required: true },
        { id: 'cp-3', label: 'Industri (Automotive/FMCG/Electronics/Chemical/dll)', type: 'select', options: ['Automotive', 'FMCG', 'Electronics', 'Chemical', 'Alat Berat', 'Warehouse', 'Hospital', 'Hotel', 'Lainnya'], required: true },
        { id: 'cp-4', label: 'PIC / Contact Person', type: 'text', required: true },
        { id: 'cp-5', label: 'Jabatan PIC', type: 'text', required: false },
        { id: 'cp-6', label: 'Email & No. Telp PIC', type: 'text', required: true },
        { id: 'cp-7', label: 'Jumlah karyawan (range)', type: 'select', options: ['< 50', '50-200', '200-500', '500-1000', '> 1000'], required: false },
      ]
    },
    {
      id: 'current-system',
      title: '2. Sistem IT Existing',
      icon: 'Server',
      items: [
        { id: 'cs-1', label: 'ERP yang digunakan (SAP/Oracle/Custom/None)', type: 'text', required: true },
        { id: 'cs-2', label: 'Database existing (MySQL/PostgreSQL/MSSQL/Oracle)', type: 'text', required: false },
        { id: 'cs-3', label: 'Infrastruktur server (On-premise/Cloud/Hybrid)', type: 'select', options: ['On-Premise', 'Cloud', 'Hybrid', 'Belum ada'], required: true },
        { id: 'cs-4', label: 'Jaringan & bandwidth internet', type: 'text', required: false },
        { id: 'cs-5', label: 'Sistem monitoring existing', type: 'text', required: false },
        { id: 'cs-6', label: 'Sudah ada API/integrasi antar sistem?', type: 'select', options: ['Ya, sudah terintegrasi', 'Sebagian terintegrasi', 'Belum ada integrasi', 'Tidak tahu'], required: true },
        { id: 'cs-7', label: 'Software/aplikasi custom yang sudah berjalan', type: 'textarea', required: false },
      ]
    },
    {
      id: 'requirements',
      title: '3. Kebutuhan & Pain Points',
      icon: 'AlertTriangle',
      items: [
        { id: 'rq-1', label: 'Problem utama yang ingin diselesaikan', type: 'textarea', required: true },
        { id: 'rq-2', label: 'Proses bisnis yang ingin didigitalisasi', type: 'textarea', required: true },
        { id: 'rq-3', label: 'Target user / departemen pengguna', type: 'text', required: true },
        { id: 'rq-4', label: 'Jumlah user yang akan menggunakan sistem', type: 'text', required: false },
        { id: 'rq-5', label: 'Kebutuhan reporting & dashboard', type: 'checklist', options: ['Real-time Dashboard', 'Daily Report', 'Weekly Report', 'Monthly Report', 'Custom Report', 'Export Excel/PDF'], required: false },
        { id: 'rq-6', label: 'Kebutuhan mobile access', type: 'select', options: ['Ya, wajib mobile', 'Nice to have', 'Tidak perlu'], required: false },
        { id: 'rq-7', label: 'Integrasi dengan sistem lain yang dibutuhkan', type: 'textarea', required: false },
        { id: 'rq-8', label: 'Timeline / deadline project', type: 'text', required: true },
        { id: 'rq-9', label: 'Budget range customer', type: 'select', options: ['< 50 Juta', '50-100 Juta', '100-300 Juta', '300-500 Juta', '500 Juta - 1 Milyar', '> 1 Milyar', 'Belum ditentukan'], required: false },
      ]
    },
    {
      id: 'tech-requirements',
      title: '4. Technical Requirements',
      icon: 'Code',
      items: [
        { id: 'tr-1', label: 'Platform yang diinginkan', type: 'checklist', options: ['Web Application', 'Mobile App (Android)', 'Mobile App (iOS)', 'Desktop Application', 'API/Backend Only'], required: true },
        { id: 'tr-2', label: 'Kebutuhan authentication & authorization', type: 'checklist', options: ['Login User/Password', 'SSO/LDAP', 'Multi-role Access', '2FA', 'API Key'], required: false },
        { id: 'tr-3', label: 'Kebutuhan security khusus', type: 'checklist', options: ['SSL/TLS', 'Data Encryption', 'Audit Trail', 'ISO 27001 Compliance', 'Penetration Testing'], required: false },
        { id: 'tr-4', label: 'Estimasi volume data (records/hari)', type: 'text', required: false },
        { id: 'tr-5', label: 'Kebutuhan backup & disaster recovery', type: 'select', options: ['Ya, critical', 'Nice to have', 'Tidak perlu'], required: false },
        { id: 'tr-6', label: 'SLA uptime yang diharapkan', type: 'select', options: ['99.9% (Enterprise)', '99.5% (Business)', '99% (Standard)', 'Tidak ada requirement khusus'], required: false },
      ]
    },
    {
      id: 'ai-features',
      title: '5. AI & Advanced Features',
      icon: 'Brain',
      items: [
        { id: 'ai-1', label: 'Kebutuhan AI/Machine Learning', type: 'checklist', options: ['Predictive Analytics', 'Computer Vision / Image Recognition', 'Natural Language Processing', 'Anomaly Detection', 'Recommendation System', 'Chatbot/Virtual Assistant', 'Tidak ada'], required: false },
        { id: 'ai-2', label: 'Kebutuhan IoT integration dari sisi software', type: 'select', options: ['Ya, perlu dashboard IoT', 'Ya, perlu data collection', 'Tidak ada kebutuhan IoT'], required: false },
        { id: 'ai-3', label: 'Kebutuhan automation/workflow', type: 'textarea', required: false },
      ]
    },
    {
      id: 'notes',
      title: '6. Catatan & Dokumentasi',
      icon: 'FileText',
      items: [
        { id: 'nt-1', label: 'Foto/dokumentasi kondisi existing', type: 'textarea', required: false, placeholder: 'Deskripsikan foto yang diambil...' },
        { id: 'nt-2', label: 'Catatan tambahan dari visit', type: 'textarea', required: false },
        { id: 'nt-3', label: 'Follow-up action items', type: 'textarea', required: false },
        { id: 'nt-4', label: 'Next meeting / timeline follow-up', type: 'text', required: false },
      ]
    }
  ]
};

// OT/Genba Assessment Checklist Template
export const OT_GENBA_CHECKLIST = {
  id: 'ot-genba',
  title: 'OT/IoT Assessment - Genba Checklist',
  description: 'Checklist untuk assessment lapangan (Genba) perangkat OT & IoT',
  outputType: 'bom', // OT -> Request BoM
  sections: [
    {
      id: 'site-info',
      title: '1. Informasi Site & Lingkungan',
      icon: 'Factory',
      items: [
        { id: 'si-1', label: 'Nama plant / line produksi', type: 'text', required: true },
        { id: 'si-2', label: 'Area / zona yang di-assess', type: 'text', required: true },
        { id: 'si-3', label: 'Kondisi lingkungan (suhu, kelembaban, debu)', type: 'select', options: ['Clean Room', 'Indoor - Normal', 'Indoor - Panas/Berdebu', 'Semi-Outdoor', 'Outdoor', 'Hazardous Area'], required: true },
        { id: 'si-4', label: 'Ketersediaan power supply di area', type: 'select', options: ['220V AC tersedia', '24V DC tersedia', 'Perlu instalasi baru', 'Solar/Battery needed'], required: true },
        { id: 'si-5', label: 'Ketersediaan jaringan di area', type: 'checklist', options: ['Ethernet/LAN', 'WiFi', 'Tidak ada jaringan', 'Perlu instalasi baru'], required: true },
        { id: 'si-6', label: 'Jarak dari panel kontrol ke server room', type: 'text', required: false },
      ]
    },
    {
      id: 'plc-controller',
      title: '2. PLC & Controller',
      icon: 'Cpu',
      items: [
        { id: 'plc-1', label: 'Merk & tipe PLC existing', type: 'text', required: true, placeholder: 'Contoh: Mitsubishi FX5U, Siemens S7-1200' },
        { id: 'plc-2', label: 'Jumlah PLC di area', type: 'text', required: true },
        { id: 'plc-3', label: 'Protokol komunikasi PLC', type: 'checklist', options: ['Modbus TCP', 'Modbus RTU', 'Profinet', 'Profibus', 'EtherNet/IP', 'CC-Link', 'MQTT', 'OPC-UA', 'Serial RS232/RS485', 'Tidak tahu'], required: true },
        { id: 'plc-4', label: 'Versi firmware PLC', type: 'text', required: false },
        { id: 'plc-5', label: 'Kapasitas I/O yang tersedia (spare)', type: 'text', required: false },
        { id: 'plc-6', label: 'Program PLC bisa diakses/dimodifikasi?', type: 'select', options: ['Ya, ada source code', 'Ya, tapi password protected', 'Tidak bisa diakses', 'Perlu konfirmasi vendor'], required: true },
        { id: 'plc-7', label: 'Kondisi fisik PLC', type: 'select', options: ['Baik / Baru', 'Baik / Lama tapi OK', 'Perlu maintenance', 'Perlu diganti'], required: true },
      ]
    },
    {
      id: 'hmi-scada',
      title: '3. HMI & SCADA',
      icon: 'Monitor',
      items: [
        { id: 'hmi-1', label: 'Merk & tipe HMI existing', type: 'text', required: false, placeholder: 'Contoh: Weintek MT8071iE, Siemens KTP700' },
        { id: 'hmi-2', label: 'Jumlah HMI di area', type: 'text', required: false },
        { id: 'hmi-3', label: 'SCADA system existing', type: 'text', required: false, placeholder: 'Contoh: Wonderware, Ignition, WinCC' },
        { id: 'hmi-4', label: 'Ukuran layar HMI yang dibutuhkan', type: 'select', options: ['4.3"', '7"', '10.1"', '12"', '15"', '> 15"', 'Belum ditentukan'], required: false },
        { id: 'hmi-5', label: 'Kondisi HMI existing', type: 'select', options: ['Baik', 'Perlu upgrade', 'Perlu ganti', 'Belum ada HMI'], required: true },
        { id: 'hmi-6', label: 'Kebutuhan remote monitoring', type: 'select', options: ['Ya, dari office', 'Ya, dari mobile', 'Ya, dari luar pabrik', 'Tidak perlu'], required: false },
      ]
    },
    {
      id: 'sensors',
      title: '4. Sensor & Instrumentasi',
      icon: 'Gauge',
      items: [
        { id: 'sn-1', label: 'Sensor yang sudah terpasang', type: 'checklist', options: ['Temperature Sensor', 'Pressure Sensor', 'Flow Sensor', 'Level Sensor', 'Proximity Sensor', 'Photoelectric Sensor', 'Vibration Sensor', 'Current/Voltage Sensor', 'Encoder', 'Load Cell', 'Vision/Camera', 'RFID Reader', 'Barcode Scanner', 'Tidak ada sensor'], required: true },
        { id: 'sn-2', label: 'Sensor yang perlu ditambahkan', type: 'checklist', options: ['Temperature Sensor', 'Pressure Sensor', 'Flow Sensor', 'Level Sensor', 'Proximity Sensor', 'Vibration Sensor', 'Current/Voltage Sensor', 'Vision/Camera', 'RFID Reader', 'Barcode Scanner', 'Gas Detector', 'Humidity Sensor'], required: false },
        { id: 'sn-3', label: 'Jumlah titik sensor yang perlu ditambah', type: 'text', required: false },
        { id: 'sn-4', label: 'Tipe output sensor (analog/digital)', type: 'checklist', options: ['4-20mA', '0-10V', 'Digital (NPN/PNP)', 'Thermocouple', 'RTD/PT100', 'RS485', 'Ethernet', 'Wireless'], required: false },
      ]
    },
    {
      id: 'network-infra',
      title: '5. Network & Infrastruktur OT',
      icon: 'Network',
      items: [
        { id: 'ni-1', label: 'Industrial switch/router existing', type: 'text', required: false },
        { id: 'ni-2', label: 'Segregasi jaringan IT-OT', type: 'select', options: ['Sudah terpisah (DMZ)', 'Satu jaringan', 'Belum ada jaringan OT', 'Tidak tahu'], required: true },
        { id: 'ni-3', label: 'Kebutuhan edge computing / gateway', type: 'select', options: ['Ya, perlu IoT Gateway', 'Ya, perlu Edge Server', 'Sudah ada', 'Tidak perlu'], required: false },
        { id: 'ni-4', label: 'Kabel & konektor yang dibutuhkan', type: 'checklist', options: ['Ethernet Cat5e/Cat6', 'Fiber Optic', 'RS485 Cable', 'Power Cable', 'Cable Tray/Conduit', 'Panel Box'], required: false },
        { id: 'ni-5', label: 'Jarak kabel terpanjang yang dibutuhkan (meter)', type: 'text', required: false },
      ]
    },
    {
      id: 'machine-info',
      title: '6. Data Mesin & Produksi',
      icon: 'Cog',
      items: [
        { id: 'mi-1', label: 'Nama & tipe mesin yang akan dimonitor', type: 'textarea', required: true },
        { id: 'mi-2', label: 'Jumlah mesin total', type: 'text', required: true },
        { id: 'mi-3', label: 'Parameter yang ingin dimonitor', type: 'checklist', options: ['OEE (Availability, Performance, Quality)', 'Cycle Time', 'Downtime', 'Production Count', 'Reject/NG Rate', 'Energy Consumption', 'Temperature Mesin', 'Vibration Level', 'Maintenance Schedule'], required: true },
        { id: 'mi-4', label: 'Data collection interval yang diinginkan', type: 'select', options: ['Real-time (< 1 detik)', 'Per detik', 'Per menit', 'Per 5 menit', 'Per jam'], required: false },
        { id: 'mi-5', label: 'Shift kerja / jam operasional', type: 'text', required: false, placeholder: 'Contoh: 3 shift, 24 jam' },
      ]
    },
    {
      id: 'safety',
      title: '7. Safety & Compliance',
      icon: 'Shield',
      items: [
        { id: 'sf-1', label: 'Standar safety yang berlaku', type: 'checklist', options: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'IATF 16949', 'FDA/GMP', 'ATEX/Explosion Proof', 'Tidak ada standar khusus'], required: false },
        { id: 'sf-2', label: 'Safety PLC / Safety relay existing', type: 'select', options: ['Ada, sudah terpasang', 'Ada, perlu update', 'Belum ada', 'Tidak diperlukan'], required: false },
        { id: 'sf-3', label: 'Emergency stop system', type: 'select', options: ['Ada & berfungsi', 'Ada tapi perlu perbaikan', 'Belum ada', 'Tidak relevan'], required: false },
        { id: 'sf-4', label: 'Cybersecurity OT concern', type: 'select', options: ['Ya, sangat concern', 'Moderate', 'Belum aware', 'Tidak relevan'], required: false },
      ]
    },
    {
      id: 'genba-notes',
      title: '8. Catatan Genba & Dokumentasi',
      icon: 'Camera',
      items: [
        { id: 'gn-1', label: 'Layout / denah area (deskripsi)', type: 'textarea', required: false },
        { id: 'gn-2', label: 'Foto panel kontrol (deskripsi)', type: 'textarea', required: false },
        { id: 'gn-3', label: 'Foto mesin & sensor existing (deskripsi)', type: 'textarea', required: false },
        { id: 'gn-4', label: 'Masalah / temuan di lapangan', type: 'textarea', required: true },
        { id: 'gn-5', label: 'Rekomendasi solusi awal', type: 'textarea', required: false },
        { id: 'gn-6', label: 'Item yang perlu dikonfirmasi ulang', type: 'textarea', required: false },
      ]
    }
  ]
};

// Combined IT+OT Project Template
export const COMBINED_CHECKLIST = {
  id: 'combined',
  title: 'IT + OT Combined Assessment',
  description: 'Assessment lengkap untuk project yang melibatkan IT dan OT',
  outputType: 'both', // Generate both BoM and Quotation
  sections: [
    ...IT_PRD_CHECKLIST.sections,
    ...OT_GENBA_CHECKLIST.sections.filter(s => s.id !== 'site-info'), // Skip duplicate company info
  ]
};

export const CHECKLIST_TEMPLATES = {
  'it-prd': IT_PRD_CHECKLIST,
  'ot-genba': OT_GENBA_CHECKLIST,
  'combined': COMBINED_CHECKLIST,
};
