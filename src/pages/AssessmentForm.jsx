import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CHECKLIST_TEMPLATES } from '../data/checklistTemplates';
import {
  ChevronLeft, ChevronRight, Check, CheckCircle2, Circle,
  Building2, Server, AlertTriangle, Code, Brain, FileText,
  Factory, Cpu, Monitor, Gauge, Network, Cog, Shield, Camera,
  Save, ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  Building2, Server, AlertTriangle, Code, Brain, FileText,
  Factory, Cpu, Monitor, Gauge, Network, Cog, Shield, Camera,
};

export default function AssessmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assessments, saveResponse, updateAssessment, setCurrentAssessment } = useApp();

  const assessment = assessments.find(a => a.id === id);
  const [activeSection, setActiveSection] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (assessment) setCurrentAssessment(assessment);
  }, [id]);

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

  const template = CHECKLIST_TEMPLATES[assessment.type];
  const sections = template?.sections || [];
  const currentSection = sections[activeSection];
  const responses = assessment.responses || {};

  const progress = useMemo(() => {
    const allRequired = sections.flatMap(s => s.items.filter(i => i.required));
    const filled = allRequired.filter(item => {
      const val = responses[item.id];
      if (Array.isArray(val)) return val.length > 0;
      return val && val.toString().trim() !== '';
    });
    return { total: allRequired.length, done: filled.length, pct: allRequired.length > 0 ? Math.round((filled.length / allRequired.length) * 100) : 0 };
  }, [responses, sections]);

  const sectionProgress = (section) => {
    const required = section.items.filter(i => i.required);
    const filled = required.filter(item => {
      const val = responses[item.id];
      if (Array.isArray(val)) return val.length > 0;
      return val && val.toString().trim() !== '';
    });
    return { total: required.length, done: filled.length };
  };

  const handleFinish = () => {
    updateAssessment(id, { status: 'completed' });
    navigate(`/result/${id}`);
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar - Section Navigator */}
      <div className={`${showSidebar ? 'fixed inset-0 z-40 bg-black/50 md:relative md:bg-transparent' : 'hidden'} md:block md:w-72 flex-shrink-0`}>
        <div className="bg-ragda-card border border-ragda-border rounded-xl p-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Progress */}
          <div className="mb-4 pb-4 border-b border-ragda-border">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/60">Progress</span>
              <span className="text-ragda-accent font-bold">{progress.pct}%</span>
            </div>
            <div className="w-full bg-ragda-dark rounded-full h-2">
              <div
                className="bg-ragda-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.pct}%` }}
              />
            </div>
            <p className="text-xs text-white/40 mt-1">{progress.done}/{progress.total} required fields</p>
          </div>

          {/* Section List */}
          <div className="space-y-1">
            {sections.map((section, idx) => {
              const sp = sectionProgress(section);
              const IconComp = ICON_MAP[section.icon] || FileText;
              const isComplete = sp.total > 0 && sp.done === sp.total;
              return (
                <button
                  key={section.id}
                  onClick={() => { setActiveSection(idx); setShowSidebar(false); }}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                    idx === activeSection
                      ? 'bg-ragda-accent/20 text-ragda-accent border border-ragda-accent/30'
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  <IconComp className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 truncate">{section.title}</span>
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : sp.total > 0 ? (
                    <span className="text-[10px] text-white/30">{sp.done}/{sp.total}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Customer Info Bar */}
        <div className="bg-ragda-card border border-ragda-border rounded-xl p-4 mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-white">{assessment.customerName}</h2>
            <p className="text-xs text-white/40">{assessment.industry} &middot; {assessment.visitDate}</p>
          </div>
          <button
            className="md:hidden bg-ragda-border px-3 py-2 rounded-lg text-xs text-white"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            Sections
          </button>
        </div>

        {/* Section Content */}
        {currentSection && (
          <div className="bg-ragda-card border border-ragda-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const IconComp = ICON_MAP[currentSection.icon] || FileText;
                return <IconComp className="w-6 h-6 text-ragda-accent" />;
              })()}
              <h3 className="text-lg font-bold text-white">{currentSection.title}</h3>
            </div>

            <div className="space-y-5">
              {currentSection.items.map(item => (
                <FormField
                  key={item.id}
                  item={item}
                  value={responses[item.id]}
                  onChange={(val) => saveResponse(id, item.id, val)}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-ragda-border">
              <button
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/60 hover:bg-white/5 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {activeSection === sections.length - 1 ? (
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-2 bg-ragda-success text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
                >
                  <Check className="w-5 h-5" />
                  Selesai & Generate Output
                </button>
              ) : (
                <button
                  onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
                  className="flex items-center gap-2 bg-ragda-accent text-ragda-dark font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FormField({ item, value, onChange }) {
  switch (item.type) {
    case 'text':
      return (
        <div>
          <label className="block text-sm text-white/70 mb-1">
            {item.label} {item.required && <span className="text-ragda-danger">*</span>}
          </label>
          <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={item.placeholder || ''}
            className="w-full bg-ragda-dark border border-ragda-border rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:border-ragda-accent focus:outline-none"
          />
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label className="block text-sm text-white/70 mb-1">
            {item.label} {item.required && <span className="text-ragda-danger">*</span>}
          </label>
          <textarea
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={item.placeholder || ''}
            rows={3}
            className="w-full bg-ragda-dark border border-ragda-border rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:border-ragda-accent focus:outline-none resize-none"
          />
        </div>
      );

    case 'select':
      return (
        <div>
          <label className="block text-sm text-white/70 mb-1">
            {item.label} {item.required && <span className="text-ragda-danger">*</span>}
          </label>
          <select
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-ragda-dark border border-ragda-border rounded-lg px-4 py-2.5 text-white text-sm focus:border-ragda-accent focus:outline-none"
          >
            <option value="">Pilih...</option>
            {item.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );

    case 'checklist':
      const selected = Array.isArray(value) ? value : [];
      return (
        <div>
          <label className="block text-sm text-white/70 mb-2">
            {item.label} {item.required && <span className="text-ragda-danger">*</span>}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {item.options?.map(opt => {
              const isChecked = selected.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => {
                    if (isChecked) {
                      onChange(selected.filter(s => s !== opt));
                    } else {
                      onChange([...selected, opt]);
                    }
                  }}
                  className={`flex items-center gap-2 text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                    isChecked
                      ? 'bg-ragda-accent/10 border-ragda-accent/50 text-ragda-accent'
                      : 'bg-ragda-dark border-ragda-border text-white/60 hover:border-white/30'
                  }`}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 flex-shrink-0" />
                  )}
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      );

    default:
      return null;
  }
}
