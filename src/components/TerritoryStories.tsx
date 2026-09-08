import React from 'react';
import { 
  BookOpen, 
  Clock, 
  User, 
  Eye, 
  Heart, 
  ArrowRight, 
  Sparkles,
  Share2
} from 'lucide-react';
import { StoryArticle } from '../types';

interface TerritoryStoriesProps {
  stories: StoryArticle[];
  onSelectStory: (story: StoryArticle) => void;
}

export const TerritoryStories: React.FC<TerritoryStoriesProps> = ({
  stories,
  onSelectStory
}) => {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D3D4F]/10 border border-[#1D3D4F]/20 text-[#1D3D4F] text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#D9383A]" />
            Magazine & Racconti del Sebino
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3D4F] font-display">
            Racconti dal Territorio
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Guide autentiche, itinerari segreti, tradizioni e ricette storiche del Lago d’Iseo
          </p>
        </div>

        <span className="text-xs font-bold text-[#D9383A] bg-rose-50 px-3 py-1 rounded-full border border-rose-100 self-start md:self-auto">
          Rubriche Editoriali Ufficiali
        </span>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Photo & Category */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="bg-[#1D3D4F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                    {story.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#E6DCC4]" />
                    {story.readTime}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Eye className="w-3 h-3 text-[#E6DCC4]" />
                    {story.views}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-slate-700">{story.author}</span>
                  <span>•</span>
                  <span>{story.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#1D3D4F] font-display line-clamp-2 group-hover:text-[#D9383A] transition-colors mb-2 leading-snug">
                  {story.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {story.subtitle}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1D3D4F] group-hover:text-[#D9383A] flex items-center gap-1">
                <span>Leggi Articolo Completo</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </span>

              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>{story.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
