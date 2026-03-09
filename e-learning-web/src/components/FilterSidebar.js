import React from 'react';
import { Filter, ChevronRight, Check } from 'lucide-react';

const FilterSidebar = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedPriceRange,
  setSelectedPriceRange
}) => {
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const priceRanges = [
    { label: "Tất cả", value: "all" },
    { label: "Dưới 400.000đ", value: "under-400" },
    { label: "400.000đ - 600.000đ", value: "400-600" },
    { label: "Trên 600.000đ", value: "above-600" }
  ];

  return (
    <aside className="sticky top-24 space-y-8 animate-fade-in pr-6">
      {/* Categories Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-premium border border-gray-100/50">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <Filter size={20} />
          </div>
          <h3 className="text-xl font-extrabold text-text-main">Phân loại</h3>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
              selectedCategory === 'all' 
              ? 'bg-primary-light border-primary/20 text-primary shadow-sm ring-1 ring-primary/10' 
              : 'bg-gray-50/50 border-transparent text-text-muted hover:bg-gray-100 hover:text-text-main'
            }`}
          >
            <span>Tất cả danh mục</span>
            {selectedCategory === 'all' ? <Check size={16} /> : <ChevronRight size={16} className="opacity-40" />}
          </button>
          
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                selectedCategory === cat 
                ? 'bg-primary-light border-primary/20 text-primary shadow-sm ring-1 ring-primary/10' 
                : 'bg-gray-50/50 border-transparent text-text-muted hover:bg-gray-100 hover:text-text-main'
              }`}
            >
              <span className="truncate">{cat}</span>
              {selectedCategory === cat ? <Check size={16} /> : <ChevronRight size={16} className="opacity-40" />}
            </button>
          ))}
        </div>
      </div>

      {/* Level Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-premium border border-gray-100/50">
        <h3 className="text-xl font-extrabold text-text-main mb-6">Trình độ</h3>
        <div className="flex flex-wrap gap-3">
          {levels.map((level) => (
            <button
               key={level}
               onClick={() => setSelectedLevel(selectedLevel === level ? 'all' : level)}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                 selectedLevel === level 
                 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                 : 'bg-white border-gray-200 text-text-muted hover:border-primary/40 hover:text-primary'
               }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-premium border border-gray-100/50">
        <h3 className="text-xl font-extrabold text-text-main mb-6">Học phí</h3>
        <div className="space-y-4">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="radio" 
                  name="price" 
                  className="peer appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-primary checked:bg-white transition-all outline-none"
                  checked={selectedPriceRange === range.value}
                  onChange={() => setSelectedPriceRange(range.value)}
                />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-primary transform scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className={`text-sm font-bold transition-colors ${
                selectedPriceRange === range.value ? 'text-primary' : 'text-text-muted group-hover:text-text-main'
              }`}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button 
        onClick={() => {
          setSelectedCategory('all');
          setSelectedLevel('all');
          setSelectedPriceRange('all');
        }}
        className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest text-primary bg-white border-2 border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all active:scale-95"
      >
        Làm mới bộ lọc
      </button>
    </aside>
  );
};

export default FilterSidebar;
