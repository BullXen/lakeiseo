import React from 'react';
import { X, Clock, User, Heart, Share2, BookOpen } from 'lucide-react';
import { StoryArticle } from '../types';

interface StoryModalProps {
  story: StoryArticle | null;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo */}
        <div className="relative aspect-[16/8] w-full bg-slate-900 shrink-0">
          <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-[#1D3D4F] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
              {story.category}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl sm:text-2xl font-bold font-display leading-tight">
              {story.title}
            </h2>
            <p className="text-xs text-[#E6DCC4] mt-1 line-clamp-1">{story.subtitle}</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{story.author}</span>
              <span>•</span>
              <span>{story.authorRole}</span>
              <span>•</span>
              <span>{story.date}</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-[#1D3D4F]">
              <Clock className="w-3.5 h-3.5" />
              <span>{story.readTime}</span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line font-sans">
            {story.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Heart className="w-4 h-4 text-rose-500 fill-current" />
            <span>{story.likes} persone hanno apprezzato questo articolo</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1D3D4F] text-white text-xs font-bold hover:bg-[#2A5269] transition-colors"
          >
            Chiudi Articolo
          </button>
        </div>
      </div>
    </div>
  );
};
