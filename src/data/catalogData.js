// BoM & Quotation Generator from Assessment Data

const OT_ITEM_CATALOG = {
  // IoT Gateway & Edge
  'gateway-basic': { name: 'IoT Gateway (Basic)', category: 'Gateway', unit: 'pcs', price: 5500000, desc: 'Industrial IoT Gateway, 2x Ethernet, RS485, WiFi' },
  'gateway-pro': { name: 'IoT Gateway (Pro)', category: 'Gateway', unit: 'pcs', price: 12000000, desc: 'Edge Computing Gateway, 4x Ethernet, 2x RS485, 4G, Docker support' },
  'edge-server': { name: 'Edge Server', category: 'Server', unit: 'pcs', price: 35000000, desc: 'Industrial Edge Server, Intel i7, 16GB, 512GB SSD, fanless' },

  // Sensors
  'temp-sensor': { name: 'Temperature Sensor (PT100)', category: 'Sensor', unit: 'pcs', price: 850000, desc: 'PT100 RTD Temperature Sensor, -50~400°C' },
  'pressure-sensor': { name: 'Pressure Sensor', category: 'Sensor', unit: 'pcs', price: 2500000, desc: 'Industrial Pressure Transmitter, 4-20mA output' },
  'vibration-sensor': { name: 'Vibration Sensor', category: 'Sensor', unit: 'pcs', price: 3500000, desc: 'Industrial Vibration Sensor, 3-axis, 4-20mA/Modbus' },
  'current-sensor': { name: 'Current Transformer', category: 'Sensor', unit: 'pcs', price: 450000, desc: 'Split-core CT, 0-100A, 4-20mA output' },
  'flow-sensor': { name: 'Flow Sensor', category: 'Sensor', unit: 'pcs', price: 4500000, desc: 'Electromagnetic Flow Meter, DN25-DN100' },
  'level-sensor': { name: 'Level Sensor (Ultrasonic)', category: 'Sensor', unit: 'pcs', price: 3000000, desc: 'Ultrasonic Level Sensor, 0-5m range' },
  'proximity-sensor': { name: 'Proximity Sensor', category: 'Sensor', unit: 'pcs', price: 350000, desc: 'Inductive Proximity Sensor, M18, NPN/PNP' },
  'humidity-sensor': { name: 'Humidity & Temp Sensor', category: 'Sensor', unit: 'pcs', price: 1200000, desc: 'Industrial Humidity & Temperature Transmitter' },
  'camera-vision': { name: 'Industrial Camera', category: 'Vision', unit: 'pcs', price: 15000000, desc: 'Industrial Vision Camera, 5MP, GigE, with lens' },
  'rfid-reader': { name: 'RFID Reader', category: 'RFID', unit: 'pcs', price: 8500000, desc: 'UHF RFID Reader, long range, Ethernet' },
  'rfid-tag': { name: 'RFID Tag (pack 100)', category: 'RFID', unit: 'pack', price: 1500000, desc: 'UHF RFID Tag, IP65, pack of 100 pcs' },
  'barcode-scanner': { name: 'Industrial Barcode Scanner', category: 'Barcode', unit: 'pcs', price: 5000000, desc: 'Fixed-mount 2D Barcode Scanner, Ethernet' },
  'gas-detector': { name: 'Gas Detector', category: 'Sensor', unit: 'pcs', price: 7500000, desc: 'Industrial Gas Detector, multi-gas' },

  // HMI
  'hmi-7': { name: 'HMI 7" Touchscreen', category: 'HMI', unit: 'pcs', price: 6500000, desc: '7" TFT HMI, Ethernet, RS485, 800x480' },
  'hmi-10': { name: 'HMI 10.1" Touchscreen', category: 'HMI', unit: 'pcs', price: 9500000, desc: '10.1" TFT HMI, Ethernet, RS485, 1024x600' },
  'hmi-15': { name: 'HMI 15" Touchscreen', category: 'HMI', unit: 'pcs', price: 18000000, desc: '15" TFT HMI, 2x Ethernet, RS485, 1366x768' },

  // Network
  'switch-industrial': { name: 'Industrial Ethernet Switch', category: 'Network', unit: 'pcs', price: 3500000, desc: '8-port Managed Industrial Switch, DIN rail' },
  'cable-eth-100m': { name: 'Kabel Ethernet Cat6 (100m)', category: 'Cable', unit: 'roll', price: 850000, desc: 'Cat6 UTP Cable, industrial grade, 100m' },
  'cable-rs485-100m': { name: 'Kabel RS485 (100m)', category: 'Cable', unit: 'roll', price: 450000, desc: 'Shielded RS485 Cable, 100m roll' },
  'panel-box': { name: 'Panel Box IP65', category: 'Enclosure', unit: 'pcs', price: 2500000, desc: 'Industrial Panel Box, 400x300x200mm, IP65' },
  'cable-tray': { name: 'Cable Tray (per meter)', category: 'Cable', unit: 'meter', price: 85000, desc: 'Perforated Cable Tray, 200mm width' },

  // PLC
  'plc-basic': { name: 'PLC Basic (16 I/O)', category: 'PLC', unit: 'pcs', price: 8500000, desc: 'Compact PLC, 16 I/O, Ethernet, RS485' },
  'plc-medium': { name: 'PLC Medium (32 I/O)', category: 'PLC', unit: 'pcs', price: 15000000, desc: 'Modular PLC, 32 I/O, Ethernet, expandable' },
  'io-module': { name: 'I/O Expansion Module', category: 'PLC', unit: 'pcs', price: 3500000, desc: '16-ch Digital I/O or 8-ch Analog I/O module' },
};

const IT_SERVICE_CATALOG = {
  // Software Development
  'web-app-basic': { name: 'Web Application Development (Basic)', category: 'Software Dev', unit: 'project', price: 75000000, desc: 'Web app, 5-10 modules, responsive, standard features' },
  'web-app-medium': { name: 'Web Application Development (Medium)', category: 'Software Dev', unit: 'project', price: 150000000, desc: 'Web app, 10-20 modules, API integration, advanced features' },
  'web-app-enterprise': { name: 'Web Application Development (Enterprise)', category: 'Software Dev', unit: 'project', price: 300000000, desc: 'Enterprise web app, 20+ modules, full integration' },
  'mobile-app': { name: 'Mobile Application Development', category: 'Software Dev', unit: 'project', price: 100000000, desc: 'Cross-platform mobile app (Android + iOS)' },
  'api-development': { name: 'API & Integration Development', category: 'Software Dev', unit: 'project', price: 50000000, desc: 'RESTful API development & system integration' },

  // Dashboard & Analytics
  'dashboard-basic': { name: 'Dashboard & Monitoring (Basic)', category: 'Dashboard', unit: 'project', price: 35000000, desc: 'Real-time dashboard, 5-10 widgets, basic analytics' },
  'dashboard-advanced': { name: 'Dashboard & Analytics (Advanced)', category: 'Dashboard', unit: 'project', price: 75000000, desc: 'Advanced dashboard, AI analytics, predictive' },

  // AI/ML
  'ai-predictive': { name: 'AI Predictive Analytics', category: 'AI/ML', unit: 'project', price: 120000000, desc: 'Machine learning model development & deployment' },
  'ai-vision': { name: 'AI Computer Vision', category: 'AI/ML', unit: 'project', price: 150000000, desc: 'Computer vision inspection/detection system' },
  'ai-nlp': { name: 'AI NLP / Chatbot', category: 'AI/ML', unit: 'project', price: 80000000, desc: 'NLP chatbot / virtual assistant development' },
  'ai-anomaly': { name: 'AI Anomaly Detection', category: 'AI/ML', unit: 'project', price: 100000000, desc: 'Anomaly detection system for production/quality' },

  // Infrastructure
  'server-setup': { name: 'Server Setup & Configuration', category: 'Infrastructure', unit: 'project', price: 15000000, desc: 'Server setup, OS, database, security configuration' },
  'cloud-setup': { name: 'Cloud Infrastructure Setup', category: 'Infrastructure', unit: 'project', price: 25000000, desc: 'Cloud deployment (AWS/GCP/Azure), CI/CD pipeline' },

  // Services
  'training': { name: 'User Training', category: 'Service', unit: 'session', price: 5000000, desc: 'Training session (1 day, max 15 participants)' },
  'maintenance-yearly': { name: 'Maintenance & Support (1 Year)', category: 'Service', unit: 'tahun', price: 36000000, desc: 'Annual maintenance, bug fix, minor updates, support' },
  'consulting': { name: 'IT Consulting', category: 'Service', unit: 'hari', price: 5000000, desc: 'IT consulting & requirement analysis per day' },
};

const OT_SERVICE_CATALOG = {
  'installation': { name: 'Instalasi & Commissioning', category: 'Service', unit: 'project', price: 15000000, desc: 'Pemasangan, wiring, testing, commissioning' },
  'programming-plc': { name: 'PLC Programming', category: 'Service', unit: 'project', price: 25000000, desc: 'PLC program development & debugging' },
  'programming-hmi': { name: 'HMI/SCADA Development', category: 'Service', unit: 'project', price: 20000000, desc: 'HMI screen design & SCADA configuration' },
  'integration-ot': { name: 'System Integration OT', category: 'Service', unit: 'project', price: 30000000, desc: 'OT system integration, protocol conversion' },
  'training-ot': { name: 'Training Operator OT', category: 'Service', unit: 'session', price: 5000000, desc: 'Training operator & maintenance team' },
  'maintenance-ot': { name: 'Maintenance OT (1 Year)', category: 'Service', unit: 'tahun', price: 24000000, desc: 'Annual OT maintenance & preventive check' },
};

export function generateBoM(assessmentData) {
  const items = [];
  const sections = assessmentData.sections || {};

  // Check sensors needed
  const sensorsNeeded = sections['sn-2'] || [];
  const sensorCount = parseInt(sections['sn-3']) || 1;

  const sensorMap = {
    'Temperature Sensor': 'temp-sensor',
    'Pressure Sensor': 'pressure-sensor',
    'Vibration Sensor': 'vibration-sensor',
    'Current/Voltage Sensor': 'current-sensor',
    'Flow Sensor': 'flow-sensor',
    'Level Sensor': 'level-sensor',
    'Proximity Sensor': 'proximity-sensor',
    'Humidity Sensor': 'humidity-sensor',
    'Vision/Camera': 'camera-vision',
    'RFID Reader': 'rfid-reader',
    'Barcode Scanner': 'barcode-scanner',
    'Gas Detector': 'gas-detector',
  };

  sensorsNeeded.forEach(sensor => {
    const catalogId = sensorMap[sensor];
    if (catalogId && OT_ITEM_CATALOG[catalogId]) {
      items.push({
        ...OT_ITEM_CATALOG[catalogId],
        qty: Math.max(1, Math.ceil(sensorCount / sensorsNeeded.length)),
        catalogId,
      });
    }
  });

  // RFID tags if RFID reader is selected
  if (sensorsNeeded.includes('RFID Reader')) {
    items.push({ ...OT_ITEM_CATALOG['rfid-tag'], qty: 1, catalogId: 'rfid-tag' });
  }

  // HMI based on condition & size
  const hmiCondition = sections['hmi-5'];
  const hmiSize = sections['hmi-4'];
  if (hmiCondition === 'Perlu ganti' || hmiCondition === 'Belum ada HMI' || hmiCondition === 'Perlu upgrade') {
    const hmiKey = hmiSize?.includes('10') ? 'hmi-10' : hmiSize?.includes('15') || hmiSize?.includes('> 15') ? 'hmi-15' : 'hmi-7';
    const hmiCount = parseInt(sections['hmi-2']) || 1;
    items.push({ ...OT_ITEM_CATALOG[hmiKey], qty: hmiCount, catalogId: hmiKey });
  }

  // Gateway / Edge based on needs
  const edgeNeed = sections['ni-3'];
  if (edgeNeed === 'Ya, perlu IoT Gateway') {
    items.push({ ...OT_ITEM_CATALOG['gateway-basic'], qty: 1, catalogId: 'gateway-basic' });
  } else if (edgeNeed === 'Ya, perlu Edge Server') {
    items.push({ ...OT_ITEM_CATALOG['edge-server'], qty: 1, catalogId: 'edge-server' });
  }

  // Network equipment
  const networkNeeds = sections['ni-4'] || [];
  if (networkNeeds.includes('Ethernet Cat5e/Cat6')) {
    const cableLength = parseInt(sections['ni-5']) || 100;
    const rolls = Math.ceil(cableLength / 100);
    items.push({ ...OT_ITEM_CATALOG['cable-eth-100m'], qty: rolls, catalogId: 'cable-eth-100m' });
    items.push({ ...OT_ITEM_CATALOG['switch-industrial'], qty: 1, catalogId: 'switch-industrial' });
  }
  if (networkNeeds.includes('RS485 Cable')) {
    items.push({ ...OT_ITEM_CATALOG['cable-rs485-100m'], qty: 1, catalogId: 'cable-rs485-100m' });
  }
  if (networkNeeds.includes('Panel Box')) {
    items.push({ ...OT_ITEM_CATALOG['panel-box'], qty: 1, catalogId: 'panel-box' });
  }
  if (networkNeeds.includes('Cable Tray/Conduit')) {
    const length = parseInt(sections['ni-5']) || 50;
    items.push({ ...OT_ITEM_CATALOG['cable-tray'], qty: length, catalogId: 'cable-tray' });
  }

  // PLC if needed
  const plcCondition = sections['plc-7'];
  if (plcCondition === 'Perlu diganti') {
    const machineCount = parseInt(sections['mi-2']) || 1;
    if (machineCount <= 2) {
      items.push({ ...OT_ITEM_CATALOG['plc-basic'], qty: 1, catalogId: 'plc-basic' });
    } else {
      items.push({ ...OT_ITEM_CATALOG['plc-medium'], qty: 1, catalogId: 'plc-medium' });
    }
  }

  // OT Services
  if (items.length > 0) {
    items.push({ ...OT_SERVICE_CATALOG['installation'], qty: 1, catalogId: 'installation' });
  }
  if (plcCondition === 'Perlu diganti' || sections['plc-6'] === 'Ya, ada source code') {
    items.push({ ...OT_SERVICE_CATALOG['programming-plc'], qty: 1, catalogId: 'programming-plc' });
  }
  if (hmiCondition === 'Perlu ganti' || hmiCondition === 'Belum ada HMI') {
    items.push({ ...OT_SERVICE_CATALOG['programming-hmi'], qty: 1, catalogId: 'programming-hmi' });
  }
  items.push({ ...OT_SERVICE_CATALOG['training-ot'], qty: 1, catalogId: 'training-ot' });

  return items;
}

export function generateQuotation(assessmentData) {
  const items = [];
  const sections = assessmentData.sections || {};

  // Determine project scope
  const platforms = sections['tr-1'] || [];
  const aiNeeds = sections['ai-1'] || [];
  const reportNeeds = sections['rq-5'] || [];
  const budgetRange = sections['rq-9'] || 'Belum ditentukan';

  // Software development
  if (platforms.includes('Web Application')) {
    const hasAPI = sections['cs-6']?.includes('terintegrasi') || sections['rq-7'];
    const moduleCount = (reportNeeds.length || 0) + (aiNeeds.length || 0) + platforms.length;
    if (moduleCount > 15) {
      items.push({ ...IT_SERVICE_CATALOG['web-app-enterprise'], qty: 1, catalogId: 'web-app-enterprise' });
    } else if (moduleCount > 8 || hasAPI) {
      items.push({ ...IT_SERVICE_CATALOG['web-app-medium'], qty: 1, catalogId: 'web-app-medium' });
    } else {
      items.push({ ...IT_SERVICE_CATALOG['web-app-basic'], qty: 1, catalogId: 'web-app-basic' });
    }
  }

  if (platforms.includes('Mobile App (Android)') || platforms.includes('Mobile App (iOS)')) {
    items.push({ ...IT_SERVICE_CATALOG['mobile-app'], qty: 1, catalogId: 'mobile-app' });
  }

  if (platforms.includes('API/Backend Only')) {
    items.push({ ...IT_SERVICE_CATALOG['api-development'], qty: 1, catalogId: 'api-development' });
  }

  // Dashboard
  if (reportNeeds.includes('Real-time Dashboard')) {
    if (aiNeeds.length > 0) {
      items.push({ ...IT_SERVICE_CATALOG['dashboard-advanced'], qty: 1, catalogId: 'dashboard-advanced' });
    } else {
      items.push({ ...IT_SERVICE_CATALOG['dashboard-basic'], qty: 1, catalogId: 'dashboard-basic' });
    }
  }

  // AI/ML Services
  if (aiNeeds.includes('Predictive Analytics') || aiNeeds.includes('Recommendation System')) {
    items.push({ ...IT_SERVICE_CATALOG['ai-predictive'], qty: 1, catalogId: 'ai-predictive' });
  }
  if (aiNeeds.includes('Computer Vision / Image Recognition')) {
    items.push({ ...IT_SERVICE_CATALOG['ai-vision'], qty: 1, catalogId: 'ai-vision' });
  }
  if (aiNeeds.includes('Natural Language Processing') || aiNeeds.includes('Chatbot/Virtual Assistant')) {
    items.push({ ...IT_SERVICE_CATALOG['ai-nlp'], qty: 1, catalogId: 'ai-nlp' });
  }
  if (aiNeeds.includes('Anomaly Detection')) {
    items.push({ ...IT_SERVICE_CATALOG['ai-anomaly'], qty: 1, catalogId: 'ai-anomaly' });
  }

  // Infrastructure
  const infraType = sections['cs-3'];
  if (infraType === 'Cloud' || infraType === 'Hybrid') {
    items.push({ ...IT_SERVICE_CATALOG['cloud-setup'], qty: 1, catalogId: 'cloud-setup' });
  } else {
    items.push({ ...IT_SERVICE_CATALOG['server-setup'], qty: 1, catalogId: 'server-setup' });
  }

  // Standard services
  items.push({ ...IT_SERVICE_CATALOG['training'], qty: 2, catalogId: 'training' });
  items.push({ ...IT_SERVICE_CATALOG['maintenance-yearly'], qty: 1, catalogId: 'maintenance-yearly' });

  return items;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

export { OT_ITEM_CATALOG, IT_SERVICE_CATALOG, OT_SERVICE_CATALOG };
