import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, CheckCircle } from 'lucide-react';

const CurriculumAccordion = ({ chapters, lessons, currentLessonId, onLessonSelect }) => {
  const [expandedChapters, setExpandedChapters] = useState([chapters[0]?.id]);

  const toggleChapter = (chapterId) => {
    if (expandedChapters.includes(chapterId)) {
      setExpandedChapters(expandedChapters.filter(id => id !== chapterId));
    } else {
      setExpandedChapters([...expandedChapters, chapterId]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 border-l border-neutral-800 animate-in fade-in duration-500">
      {chapters.map((chapter) => (
        <div key={chapter.id} className="border-b border-neutral-800">
          {/* Chapter header */}
          <button 
            onClick={() => toggleChapter(chapter.id)}
            className="w-full flex items-center justify-between p-4 bg-neutral-800/20 hover:bg-neutral-800/40 transition-all duration-200"
          >
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest tracking-tighter">Chương {chapter.id}</span>
              <h4 className="font-semibold text-neutral-100 text-sm text-left line-clamp-1">{chapter.title}</h4>
            </div>
            {expandedChapters.includes(chapter.id) ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />}
          </button>

          {/* Lessons list */}
          {expandedChapters.includes(chapter.id) && (
            <div className="bg-neutral-900 overflow-hidden animate-in slide-in-from-top-1 duration-200">
              {lessons
                .filter(lesson => Number(lesson.chapterId) === Number(chapter.id))
                .map((lesson) => (
                  <button 
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson)}
                    className={`
                      w-full flex items-center gap-3 p-4 text-left transition-all duration-300 border-l-2
                      ${currentLessonId === lesson.id 
                        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
                        : 'border-transparent text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'}
                    `}
                  >
                    <div className="shrink-0">
                      {currentLessonId === lesson.id ? (
                        <PlayCircle size={18} fill="currentColor" fillOpacity={0.2} />
                      ) : (
                        <CheckCircle size={18} className="opacity-40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight truncate">{lesson.title}</p>
                      <span className="text-xs opacity-60 flex items-center gap-1 mt-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {lesson.duration}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CurriculumAccordion;
