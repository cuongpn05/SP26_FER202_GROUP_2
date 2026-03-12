import React from 'react';
import { PlayCircle, CheckCircle } from 'lucide-react';

const CurriculumAccordion = ({ lessons, currentLessonId, onLessonSelect }) => {
  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500 rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 bg-blue-50/30">
        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Danh sách bài học</h4>
        <p className="text-[10px] text-slate-400 mt-1">{lessons.length} bài học</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {lessons.map((lesson, index) => (
          <button 
            key={lesson.id}
            onClick={() => onLessonSelect(lesson)}
            className={`
              w-full flex items-center gap-4 p-4 text-left transition-all duration-300 border-l-2 group
              ${currentLessonId === lesson.id 
                ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-inner' 
                : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <div className="shrink-0 flex flex-col items-center">
              <span className={`text-[10px] font-black mb-1 transition-colors ${currentLessonId === lesson.id ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              {currentLessonId === lesson.id ? (
                <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                  <PlayCircle size={16} fill="currentColor" fillOpacity={0.2} />
                </div>
              ) : (
                <div className="p-1 text-slate-200">
                  <CheckCircle size={16} className="group-hover:text-slate-400 transition-colors" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-black leading-tight truncate tracking-tight ${currentLessonId === lesson.id ? 'text-blue-600' : 'text-slate-700'}`}>{lesson.title}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className={`text-[10px] flex items-center gap-1 font-bold ${currentLessonId === lesson.id ? 'text-blue-400' : 'text-slate-400'}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {lesson.duration}
                </span>
                {currentLessonId === lesson.id && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-black uppercase tracking-tighter shadow-sm shadow-blue-100">Đang học</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurriculumAccordion;
