import React from 'react';
import { 
  X, 
  Sliders, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { ElementorWidgetConfig, PersonaType } from '../types';

interface ElementorCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  widgets: ElementorWidgetConfig[];
  onToggleWidget: (id: string) => void;
  onMoveWidget: (index: number, direction: 'up' | 'down') => void;
  onResetWidgets: () => void;
  activePersona: PersonaType;
}

export const ElementorCustomizer: React.FC<ElementorCustomizerProps> = ({
  isOpen,
  onClose,
  widgets,
  onToggleWidget,
  onMoveWidget,
  onResetWidgets,
  activePersona
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-[#1D3D4F] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E6DCC4] text-[#1D3D4F] flex items-center justify-center font-black">
              E
            </div>
            <div>
              <h3 className="text-base font-bold font-display leading-none text-white">
                Elementor Hub Orchestrator
              </h3>
              <p className="text-[11px] text-[#E6DCC4] mt-1">
                Gestione modulare dei widget & priorità dinamiche Loop Grid
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info banner */}
        <div className="bg-[#F8F6F0] p-3.5 border-b border-[#E6DCC4] text-xs text-slate-700 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#1D3D4F] shrink-0 mt-0.5" />
          <div>
            <p>
              In base alle specifiche, <strong>ogni sezione è un widget Elementor Pro indipendente</strong>. Puoi riordinare i blocchi o disattivarli per personalizzare il cruscotto della home.
            </p>
          </div>
        </div>

        {/* Widget List */}
        <div className="p-5 overflow-y-auto space-y-2.5 flex-1">
          {widgets.map((widget, index) => {
            const isPriority = widget.priorityFor.includes(activePersona);

            return (
              <div
                key={widget.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  widget.visible 
                    ? 'bg-white border-slate-200 shadow-sm' 
                    : 'bg-slate-100/70 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-[#1D3D4F]/10 text-[#1D3D4F] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1D3D4F] truncate">
                        {widget.title}
                      </h4>
                      {isPriority && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          Priorità {activePersona}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {widget.subtitle}
                    </p>
                  </div>
                </div>

                {/* Actions: Move Up / Down & Toggle Visibility */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    disabled={index === 0}
                    onClick={() => onMoveWidget(index, 'up')}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Sposta su"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    disabled={index === widgets.length - 1}
                    onClick={() => onMoveWidget(index, 'down')}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Sposta giù"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleWidget(widget.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      widget.visible 
                        ? 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' 
                        : 'border-slate-200 text-slate-400 bg-slate-50 hover:bg-slate-100'
                    }`}
                    title={widget.visible ? 'Disattiva blocco' : 'Attiva blocco'}
                  >
                    {widget.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onResetWidgets}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ripristina Ordine Standard</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1D3D4F] text-white text-xs font-bold hover:bg-[#2A5269] transition-colors shadow"
          >
            Applica & Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
