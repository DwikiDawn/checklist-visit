import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PlusCircle, FileText, Trash2, Eye, Clock, Building2, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const { assessments, deleteAssessment, setCurrentAssessment } = useApp();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'it-prd': return { label: 'IT / PRD', color: 'text-blue-400' };
      case 'ot-genba': return { label: 'OT / Genba', color: 'text-orange-400' };
      case 'combined': return { label: 'IT + OT', color: 'text-purple-400' };
      default: return { label: type, color: 'text-gray-400' };
    }
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ragda-primary to-ragda-secondary rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Customer Visit Assessment</h2>
        <p className="text-white/70 mb-6">
          Checklist lengkap untuk assessment IT (PRD) dan OT (Genba) saat visit ke customer.
          Hasilkan Request BoM atau Quotation secara otomatis.
        </p>
        <button
          onClick={() => navigate('/new')}
          className="flex items-center gap-2 bg-ragda-accent text-ragda-dark px-6 py-3 rounded-xl font-bold hover:bg-amber-400 transition-all shadow-lg"
        >
          <PlusCircle className="w-5 h-5" />
          Mulai Assessment Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Assessment', value: assessments.length, color: 'text-white' },
          { label: 'Draft', value: assessments.filter(a => a.status === 'draft').length, color: 'text-yellow-400' },
          { label: 'In Progress', value: assessments.filter(a => a.status === 'in-progress').length, color: 'text-blue-400' },
          { label: 'Completed', value: assessments.filter(a => a.status === 'completed').length, color: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-ragda-card border border-ragda-border rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-white/50 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Assessment List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-ragda-accent" />
          Assessment History
        </h3>

        {assessments.length === 0 ? (
          <div className="bg-ragda-card border border-ragda-border rounded-xl p-12 text-center">
            <ClipboardIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-lg">Belum ada assessment</p>
            <p className="text-white/30 text-sm mt-1">Klik "Mulai Assessment Baru" untuk memulai</p>
          </div>
        ) : (
          assessments.map(assessment => {
            const typeInfo = getTypeLabel(assessment.type);
            return (
              <div
                key={assessment.id}
                className="bg-ragda-card border border-ragda-border rounded-xl p-4 hover:border-ragda-accent/50 transition-all cursor-pointer group"
                onClick={() => {
                  setCurrentAssessment(assessment);
                  if (assessment.status === 'completed') {
                    navigate(`/result/${assessment.id}`);
                  } else {
                    navigate(`/assessment/${assessment.id}`);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-white">{assessment.customerName || 'Untitled'}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(assessment.status)}`}>
                        {assessment.status}
                      </span>
                      <span className={`text-xs font-mono ${typeInfo.color}`}>{typeInfo.label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {assessment.industry || 'N/A'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(assessment.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Hapus assessment ini?')) deleteAssessment(assessment.id);
                      }}
                      className="p-2 text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-ragda-accent transition-colors" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function ClipboardIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}
