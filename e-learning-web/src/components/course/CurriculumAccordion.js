import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, CheckCircle } from 'lucide-react';

const CurriculumAccordion = ({ lessons, currentLessonId, onLessonSelect }) => {
  return (
    <div className="flex flex-col h-full bg-neutral-900 animate-in fade-in duration-500">
      <div className="p-4 border-b border-neutral-800 bg-neutral-800/10">
        <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Danh sách bài học</h4>
        <p className="text-[10px] text-neutral-500 mt-1">{lessons.length} bài học</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {lessons.map((lesson, index) => (
          <button 
            key={lesson.id}
            onClick={() => onLessonSelect(lesson)}
            className={`
              w-full flex items-center gap-4 p-4 text-left transition-all duration-300 border-l-2 group
              ${currentLessonId === lesson.id 
                ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
                : 'border-transparent text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'}
            `}
          >
            <div className="shrink-0 flex flex-col items-center">
              <span className={`text-[10px] font-black mb-1 transition-colors ${currentLessonId === lesson.id ? 'text-indigo-400' : 'text-neutral-600 group-hover:text-neutral-400'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              {currentLessonId === lesson.id ? (
                <div className="p-1 rounded-full bg-indigo-500/20">
                  <PlayCircle size={16} fill="currentColor" fillOpacity={0.4} />
                </div>
              ) : (
                <div className="p-1">
                  <CheckCircle size={16} className="opacity-20 group-hover:opacity-40 transition-opacity" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight truncate tracking-tight">{lesson.title}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[10px] opacity-60 flex items-center gap-1 font-bold">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {lesson.duration}
                </span>
                {currentLessonId === lesson.id && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-black uppercase tracking-tighter">Đang học</span>
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
