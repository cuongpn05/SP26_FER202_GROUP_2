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
    { label: "Miễn phí", value: "free" },
    { label: "Dưới 400.000đ", value: "under-400" },
    { label: "400.000đ - 600.000đ", value: "400-600" },
    { label: "Trên 600.000đ", value: "above-600" }
  ];

  return (
    <aside className="sticky top-24 animate-fade-in lg:pr-4">
      <div className="bg-white rounded-3xl shadow-premium border border-gray-100/50 overflow-hidden">
        {/* Header - Sidebar Title */}
        <div className="p-6 bg-gray-50/50 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <Filter size={20} />
            </div>
            <h3 className="text-lg font-black text-text-main">Bộ lọc tìm kiếm</h3>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Categories Section */}
          <section>
            <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-4">Danh mục</h4>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                  selectedCategory === 'all' 
                  ? 'bg-primary-light border-primary/20 text-primary shadow-sm' 
                  : 'bg-white border-transparent text-text-muted hover:bg-gray-50 hover:text-text-main'
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
                    ? 'bg-primary-light border-primary/20 text-primary shadow-sm' 
                    : 'bg-white border-transparent text-text-muted hover:bg-gray-50 hover:text-text-main'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {selectedCategory === cat ? <Check size={16} /> : <ChevronRight size={16} className="opacity-40" />}
                </button>
              ))}
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Level Section */}
          <section>
            <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-4">Trình độ</h4>
            <div className="flex flex-wrap gap-2.5">
              {levels.map((level) => (
                <button
                   key={level}
                   onClick={() => setSelectedLevel(selectedLevel === level ? 'all' : level)}
                   className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                     selectedLevel === level 
                     ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                     : 'bg-gray-50 border-gray-100 text-text-muted hover:border-primary/40 hover:text-primary hover:bg-white'
                   }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Price Section */}
          <section>
            <h4 className="text-xs font-black uppercase tracking-widest text-text-muted mb-4">Học phí</h4>
            <div className="space-y-3.5">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="price" 
                      className="peer appearance-none w-5 h-5 rounded-full border-2 border-gray-200 checked:border-primary checked:bg-white transition-all outline-none"
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
          </section>

          <div className="pt-4">
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSelectedPriceRange('all');
              }}
              className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest text-primary bg-primary/5 hover:bg-primary/10 transition-all active:scale-95 border border-primary/10"
            >
              Làm mới bộ lọc
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
