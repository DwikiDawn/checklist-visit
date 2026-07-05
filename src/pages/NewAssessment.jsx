import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CHECKLIST_TEMPLATES } from '../data/checklistTemplates';
import { Server, Factory, Layers, ArrowRight, Building2, User } from 'lucide-react';

export default function NewAssessment() {
  const { createAssessment } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    type: '',
    customerName: '',
    industry: '',
    picName: '',
    visitDate: new Date().toISOString().split('T')[0],
  });

  const typeOptions = [
    {
      id: 'it-prd',
      title: 'IT Assessment (PRD)',
      desc: 'Checklist untuk kebutuhan software, web/mobile app, AI, dashboard, system integration',
      icon: Server,
      output: 'Quotation',
      color: 'from-blue-600 to-blue-800',
      borderColor: 'border-blue-500',
    },
    {
      id: 'ot-genba',
      title: 'OT/IoT Assessment (Genba)',
      desc: 'Checklist cek lapangan: PLC, HMI, sensor, network OT, mesin produksi',
      icon: Factory,
      output: 'Request BoM',
      color: 'from-orange-600 to-orange-800',
      borderColor: 'border-orange-500',
    },
    {
      id: 'combined',
      title: 'IT + OT Combined',
      desc: 'Assessment lengkap IT dan OT untuk project full-stack industrial',
      icon: Layers,
      output: 'BoM + Quotation',
      color: 'from-purple-600 to-purple-800',
      borderColor: 'border-purple-500',
    },
  ];

  const handleCreate = () => {
    const template = CHECKLIST_TEMPLATES[form.type];
    const assessment = createAssessment({
      type: form.type,
      customerName: form.customerName,
      industry: form.industry,
      picName: form.picName,
      visitDate: form.visitDate,
      templateTitle: template.title,
      outputType: template.outputType,
      status: 'in-progress',
    });
    navigate(`/assessment/${assessment.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-6">Assessment Baru</h2>

      {step === 1 && (
        <div>
          <p className="text-white/60 mb-4">Pilih jenis assessment:</p>
          <div className="space-y-4">
            {typeOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => { setForm(f => ({ ...f, type: opt.id })); setStep(2); }}
                className={`w-full text-left bg-gradient-to-r ${opt.color} rounded-xl p-5 border border-white/10 hover:border-white/30 transition-all group`}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <opt.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{opt.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{opt.desc}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">
                        Output: {opt.output}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors mt-2" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-ragda-card border border-ragda-border rounded-xl p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-ragda-accent" />
            Informasi Customer
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Nama Customer / Perusahaan *</label>
              <input
                type="text"
                value={form.customerName}
                onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                placeholder="Contoh: PT Toyota Motor Manufacturing"
                className="w-full bg-ragda-dark border border-ragda-border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-ragda-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Industri</label>
              <select
                value={form.industry}
                onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                className="w-full bg-ragda-dark border border-ragda-border rounded-lg px-4 py-3 text-white focus:border-ragda-accent focus:outline-none"
              >
                <option value="">Pilih industri...</option>
                <option>Automotive</option>
                <option>FMCG</option>
                <option>Electronics</option>
                <option>Chemical</option>
                <option>Alat Berat</option>
                <option>Warehouse</option>
                <option>Hospital</option>
                <option>Hotel</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">PIC / Contact Person</label>
              <input
                type="text"
                value={form.picName}
                onChange={e => setForm(f => ({ ...f, picName: e.target.value }))}
                placeholder="Nama PIC customer"
                className="w-full bg-ragda-dark border border-ragda-border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-ragda-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Tanggal Visit</label>
              <input
                type="date"
                value={form.visitDate}
                onChange={e => setForm(f => ({ ...f, visitDate: e.target.value }))}
                className="w-full bg-ragda-dark border border-ragda-border rounded-lg px-4 py-3 text-white focus:border-ragda-accent focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg border border-ragda-border text-white/60 hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCreate}
                disabled={!form.customerName}
                className="flex-1 bg-ragda-accent text-ragda-dark font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mulai Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
