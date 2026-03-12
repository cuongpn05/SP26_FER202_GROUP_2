import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { getAllCategories } from '../../../api/courses';

const FilterBar = ({ selectedCategory, setSelectedCategory, selectedLevel, setSelectedLevel }) => {
  const [categories, setCategories] = useState([]);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories([{ id: 'all', name: 'Tất cả danh mục' }, ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat.id === 'all' ? '' : cat.name);
    setShowCatDropdown(false);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level === 'All Levels' ? '' : level);
    setShowLevelDropdown(false);
  };

  return (
    <div className="w-full bg-white border-b border-gray-100 py-4 shadow-sm sticky top-20 z-40 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2 text-[#5F6368] font-bold mr-4">
            <Filter size={18} />
            <span className="text-sm">Lọc theo:</span>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setShowCatDropdown(!showCatDropdown); setShowLevelDropdown(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                selectedCategory ? 'bg-[#E8F0FE] text-[#1A73E8] border-[#1A73E8]/30' : 'bg-gray-50 text-[#202124] border-transparent hover:bg-gray-100'
              }`}
            >
              <span>{selectedCategory || 'Danh mục'}</span>
              <ChevronDown size={16} className={`transition-transform ${showCatDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showCatDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="py-2 max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-[#E8F0FE] hover:text-[#1A73E8] transition-colors font-medium border-l-4 border-transparent hover:border-[#1A73E8]"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Level Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setShowLevelDropdown(!showLevelDropdown); setShowCatDropdown(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                selectedLevel ? 'bg-[#E8F0FE] text-[#1A73E8] border-[#1A73E8]/30' : 'bg-gray-50 text-[#202124] border-transparent hover:bg-gray-100'
              }`}
            >
              <span>{selectedLevel || 'Cấp độ'}</span>
              <ChevronDown size={16} className={`transition-transform ${showLevelDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showLevelDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="py-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => handleSelectLevel(level)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-[#E8F0FE] hover:text-[#1A73E8] transition-colors font-medium border-l-4 border-transparent hover:border-[#1A73E8]"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Pills */}
          <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
            {selectedCategory && (
              <span className="flex items-center space-x-1 bg-[#E8F0FE] text-[#1A73E8] px-3 py-1.5 rounded-full text-xs font-bold border border-[#1A73E8]/20 animate-fade-in shrink-0">
                <span>{selectedCategory}</span>
                <X size={14} className="cursor-pointer hover:scale-110 active:scale-90" onClick={() => setSelectedCategory('')} />
              </span>
            )}
            {selectedLevel && (
              <span className="flex items-center space-x-1 bg-[#E8F0FE] text-[#1A73E8] px-3 py-1.5 rounded-full text-xs font-bold border border-[#1A73E8]/20 animate-fade-in shrink-0">
                <span>{selectedLevel}</span>
                <X size={14} className="cursor-pointer hover:scale-110 active:scale-90" onClick={() => setSelectedLevel('')} />
              </span>
            )}
            {(selectedCategory || selectedLevel) && (
              <button 
                onClick={() => { setSelectedCategory(''); setSelectedLevel(''); }}
                className="text-xs text-[#5F6368] hover:text-[#1A73E8] font-bold px-2 py-1 transition-colors underline underline-offset-4"
              >
                Xóa tất cả lọc
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
