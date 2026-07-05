import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { generateBoM, generateQuotation, formatCurrency, calculateTotal } from '../data/catalogData';
import { ChevronLeft, Download, Printer, CheckCircle2, Building2, Calendar, User, FileText, Package } from 'lucide-react';
import { useMemo } from 'react';

export default function AssessmentResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assessments } = useApp();

  const assessment = assessments.find(a => a.id === id);

  const output = useMemo(() => {
    if (!assessment) return null;
    const data = { sections: assessment.responses };
    
    if (assessment.outputType === 'bom') {
      return { type: 'bom', items: generateBoM(data) };
    } else if (assessment.outputType === 'quotation') {
      return { type: 'quotation', items: generateQuotation(data) };
    } else if (assessment.outputType === 'both') {
      return {
        type: 'both',
        bom: generateBoM(data),
        quotation: generateQuotation(data),
      };
    }
    return null;
  }, [assessment]);

  if (!assessment) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50">Assessment tidak ditemukan</p>
        <button onClick={() => navigate('/')} className="mt-4 text-ragda-accent underline">
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const data = {
      assessment: {
        customerName: assessment.customerName,
        industry: assessment.industry,
        picName: assessment.picName,
        visitDate: assessment.visitDate,
        type: assessment.type,
      },
      responses: assessment.responses,
      output,
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-${assessment.customerName.replace(/\s/g, '-')}-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="no-print mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-ragda-card border border-ragda-border rounded-lg text-white/80 hover:border-white/30 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-ragda-accent text-ragda-dark font-bold rounded-lg hover:bg-amber-400 transition-colors text-sm"
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 mb-6 flex items-center gap-4">
        <CheckCircle2 className="w-12 h-12 text-white flex-shrink-0" />
        <div>
          <h2 className="text-xl font-bold text-white">Assessment Completed!</h2>
          <p className="text-white/80 text-sm mt-1">Output telah di-generate berdasarkan data assessment Anda</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-ragda-card border border-ragda-border rounded-xl p-6 mb-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-ragda-accent" />
          Informasi Customer
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-white/40 mb-1">Customer</p>
            <p className="text-white font-medium">{assessment.customerName}</p>
          </div>
          <div>
            <p className="text-white/40 mb-1">Industri</p>
            <p className="text-white font-medium">{assessment.industry || 'N/A'}</p>
          </div>
          <div>
            <p className="text-white/40 mb-1">PIC</p>
            <p className="text-white font-medium">{assessment.picName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-white/40 mb-1">Tanggal Visit</p>
            <p className="text-white font-medium">{assessment.visitDate}</p>
          </div>
        </div>
      </div>

      {/* Output Display */}
      {output?.type === 'bom' && <BomTable items={output.items} />}
      {output?.type === 'quotation' && <QuotationTable items={output.items} />}
      {output?.type === 'both' && (
        <>
          <BomTable items={output.bom} />
          <div className="my-8" />
          <QuotationTable items={output.quotation} />
        </>
      )}

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-ragda-card border border-ragda-border rounded-lg text-xs text-white/40 text-center no-print">
        <p>Generated by Ragdalion Assessment Tool &middot; {new Date().toLocaleDateString('id-ID')}</p>
        <p className="mt-1">PT Ragdalion Revolusi Industri &middot; www.ragdalion.com</p>
      </div>
    </div>
  );
}

function BomTable({ items }) {
  const total = calculateTotal(items);
  
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-ragda-card border border-ragda-border rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 p-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <Package className="w-5 h-5" />
          Request Bill of Materials (BoM) - OT/IoT
        </h3>
        <p className="text-white/70 text-sm mt-1">Daftar material dan perangkat yang dibutuhkan</p>
      </div>

      <div className="p-6 space-y-6">
        {Object.entries(grouped).map(([category, catItems]) => (
          <div key={category}>
            <h4 className="text-ragda-accent font-bold mb-3 uppercase text-sm">{category}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ragda-border">
                    <th className="text-left text-white/60 font-medium pb-2">Item</th>
                    <th className="text-left text-white/60 font-medium pb-2">Deskripsi</th>
                    <th className="text-right text-white/60 font-medium pb-2 w-20">Qty</th>
                    <th className="text-left text-white/60 font-medium pb-2 w-16">Unit</th>
                    <th className="text-right text-white/60 font-medium pb-2 w-32">Harga (Rp)</th>
                    <th className="text-right text-white/60 font-medium pb-2 w-32">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {catItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-ragda-border/50 last:border-0">
                      <td className="py-3 text-white font-medium">{item.name}</td>
                      <td className="py-3 text-white/60 text-xs">{item.desc}</td>
                      <td className="py-3 text-right text-white">{item.qty}</td>
                      <td className="py-3 text-white/60">{item.unit}</td>
                      <td className="py-3 text-right text-white/80 font-mono text-xs">{formatCurrency(item.price)}</td>
                      <td className="py-3 text-right text-white font-medium font-mono text-xs">{formatCurrency(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="pt-4 border-t-2 border-ragda-accent/30">
          <div className="flex justify-between items-center">
            <span className="text-white font-bold text-lg">TOTAL ESTIMASI</span>
            <span className="text-ragda-accent font-bold text-2xl font-mono">{formatCurrency(total)}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">* Harga dapat berubah sewaktu-waktu. Belum termasuk PPN 11%.</p>
        </div>
      </div>
    </div>
  );
}

function QuotationTable({ items }) {
  const total = calculateTotal(items);
  
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-ragda-card border border-ragda-border rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Quotation - IT Services & Software Development
        </h3>
        <p className="text-white/70 text-sm mt-1">Penawaran jasa dan pengembangan software</p>
      </div>

      <div className="p-6 space-y-6">
        {Object.entries(grouped).map(([category, catItems]) => (
          <div key={category}>
            <h4 className="text-blue-400 font-bold mb-3 uppercase text-sm">{category}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ragda-border">
                    <th className="text-left text-white/60 font-medium pb-2">Item / Layanan</th>
                    <th className="text-left text-white/60 font-medium pb-2">Deskripsi</th>
                    <th className="text-right text-white/60 font-medium pb-2 w-20">Qty</th>
                    <th className="text-left text-white/60 font-medium pb-2 w-20">Unit</th>
                    <th className="text-right text-white/60 font-medium pb-2 w-32">Harga (Rp)</th>
                    <th className="text-right text-white/60 font-medium pb-2 w-32">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {catItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-ragda-border/50 last:border-0">
                      <td className="py-3 text-white font-medium">{item.name}</td>
                      <td className="py-3 text-white/60 text-xs">{item.desc}</td>
                      <td className="py-3 text-right text-white">{item.qty}</td>
                      <td className="py-3 text-white/60">{item.unit}</td>
                      <td className="py-3 text-right text-white/80 font-mono text-xs">{formatCurrency(item.price)}</td>
                      <td className="py-3 text-right text-white font-medium font-mono text-xs">{formatCurrency(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="pt-4 border-t-2 border-blue-500/30">
          <div className="flex justify-between items-center">
            <span className="text-white font-bold text-lg">TOTAL ESTIMASI</span>
            <span className="text-blue-400 font-bold text-2xl font-mono">{formatCurrency(total)}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">* Harga dapat berubah sewaktu-waktu. Belum termasuk PPN 11%.</p>
        </div>
      </div>
    </div>
  );
}
