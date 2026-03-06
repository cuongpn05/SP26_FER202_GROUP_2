import React, { useState, useEffect } from "react";
import { getCategories } from "../../services/pharmacyService";

// Map màu theo thứ tự, dùng vòng lặp nếu có nhiều hơn
const categoryStyles = [
    { color: "bg-blue-50 border-blue-100", iconBg: "bg-primary-50", iconColor: "text-primary-500" },
    { color: "bg-green-50 border-green-100", iconBg: "bg-green-50", iconColor: "text-green-600" },
    { color: "bg-purple-50 border-purple-100", iconBg: "bg-purple-50", iconColor: "text-purple-500" },
    { color: "bg-pink-50 border-pink-100", iconBg: "bg-pink-50", iconColor: "text-pink-500" },
    { color: "bg-orange-50 border-orange-100", iconBg: "bg-orange-50", iconColor: "text-orange-500" },
    { color: "bg-teal-50 border-teal-100", iconBg: "bg-teal-50", iconColor: "text-teal-500" },
    { color: "bg-yellow-50 border-yellow-100", iconBg: "bg-yellow-50", iconColor: "text-yellow-600" },
    { color: "bg-cyan-50 border-cyan-100", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
    { color: "bg-red-50 border-red-100", iconBg: "bg-red-50", iconColor: "text-red-500" },
    { color: "bg-indigo-50 border-indigo-100", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
];

// Fallback SVG icon khi ảnh không load được
const FallbackIcon = ({ className }) => (
    <svg className={className || "w-7 h-7"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

// Component hiển thị ảnh danh mục với fallback
const CategoryImage = ({ categoryId, categoryName, iconColor }) => {
    const [imgError, setImgError] = useState(false);
    const imgSrc = `${process.env.PUBLIC_URL}/assets/img/category/${categoryId}.png`;

    if (imgError) {
        return <FallbackIcon className={`w-8 h-8 ${iconColor}`} />;
    }

    return (
        <img
            src={imgSrc}
            alt={categoryName}
            className="w-10 h-10 object-contain"
            onError={() => setImgError(true)}
        />
    );
};

const getStyle = (index) => categoryStyles[index % categoryStyles.length];

// Skeleton card khi loading
const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col items-center gap-3 animate-pulse">
        <div className="w-14 h-14 bg-slate-200 rounded-2xl" />
        <div className="w-24 h-3 bg-slate-200 rounded" />
        <div className="w-16 h-2 bg-slate-100 rounded" />
    </div>
);

// Giới hạn hiển thị tên danh mục cho gọn
const truncateName = (name, maxLength = 28) =>
    name.length > maxLength ? name.slice(0, maxLength) + "…" : name;

const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                setError("Cannot load categories. Please check if json-server is running.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <section id="categories" className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block text-xs font-semibold text-primary-500 tracking-widest uppercase bg-primary-50 px-4 py-1.5 rounded-full mb-4">
                        Browse Categories
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                        Find What You Need
                    </h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        Explore our comprehensive range of health products across all major categories.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="text-center py-8 text-red-500 bg-red-50 rounded-2xl border border-red-100">
                        <svg className="w-8 h-8 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {loading
                        ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
                        : categories.map((cat, idx) => {
                            const style = getStyle(idx);
                            return (
                                <a
                                    key={cat.CategoryId}
                                    href="#products"
                                    id={`category-card-${cat.CategoryId}`}
                                    className={`card group border ${style.color} p-5 flex flex-col items-center text-center gap-3`}
                                >
                                    <div
                                        className={`${style.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <CategoryImage
                                            categoryId={cat.CategoryId}
                                            categoryName={cat.CategoryName}
                                            iconColor={style.iconColor}
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-700 text-sm leading-tight">
                                            {truncateName(cat.CategoryName)}
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                                            {cat.CategoryCode}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-primary-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        View all
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </a>
                            );
                        })}
                </div>

                {/* Category count */}
                {!loading && !error && (
                    <p className="text-center text-xs text-slate-400 mt-6">
                        {categories.length} categories available
                    </p>
                )}
            </div>
        </section>
    );
};

export default CategoriesSection;
