import React from "react";

const mockData = {
  categories: [
    {
      id: 1,
      name: "Prescription",
      count: 1248,
      color: "bg-blue-50 border-blue-100",
      iconBg: "bg-primary-100",
      iconColor: "text-primary-500",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Vitamins & Supplements",
      count: 632,
      color: "bg-green-50 border-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-accent",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Personal Care",
      count: 410,
      color: "bg-purple-50 border-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Baby & Mom",
      count: 289,
      color: "bg-pink-50 border-pink-100",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 5,
      name: "Medical Devices",
      count: 175,
      color: "bg-orange-50 border-orange-100",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      ),
    },
    {
      id: 6,
      name: "Eye & Ear Care",
      count: 198,
      color: "bg-teal-50 border-teal-100",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-500",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: 7,
      name: "Dermatology",
      count: 321,
      color: "bg-yellow-50 border-yellow-100",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      id: 8,
      name: "Orthopaedic",
      count: 143,
      color: "bg-cyan-50 border-cyan-100",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
    },
  ],

  products: [
    {
      id: 1,
      name: "Paracetamol 500mg",
      brand: "PharmaGen",
      price: 45000,
      originalPrice: 55000,
      category: "Prescription",
      badge: "Best Seller",
      badgeColor: "bg-primary-500 text-white",
      rating: 4.8,
      reviews: 2341,
      inStock: true,
    },
    {
      id: 2,
      name: "Vitamin C 1000mg Effervescent",
      brand: "NutriMax",
      price: 120000,
      originalPrice: 150000,
      category: "Vitamins",
      badge: "20% OFF",
      badgeColor: "bg-accent text-white",
      rating: 4.9,
      reviews: 1872,
      inStock: true,
    },
    {
      id: 3,
      name: "Omega-3 Fish Oil 1200mg",
      brand: "OceanHealth",
      price: 235000,
      originalPrice: 270000,
      category: "Supplements",
      badge: "New",
      badgeColor: "bg-purple-500 text-white",
      rating: 4.7,
      reviews: 943,
      inStock: true,
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      brand: "MediCheck",
      price: 850000,
      originalPrice: 990000,
      category: "Medical Devices",
      badge: "Hot",
      badgeColor: "bg-orange-500 text-white",
      rating: 4.6,
      reviews: 567,
      inStock: true,
    },
    {
      id: 5,
      name: "Amoxicillin 250mg",
      brand: "PharmLife",
      price: 68000,
      originalPrice: 75000,
      category: "Prescription",
      badge: null,
      badgeColor: null,
      rating: 4.5,
      reviews: 1254,
      inStock: true,
    },
    {
      id: 6,
      name: "Cetirizine 10mg Allergy Relief",
      brand: "AllerClear",
      price: 85000,
      originalPrice: 95000,
      category: "Prescription",
      badge: "Limited",
      badgeColor: "bg-red-500 text-white",
      rating: 4.8,
      reviews: 789,
      inStock: false,
    },
    {
      id: 7,
      name: "Collagen Peptide 5000mg",
      brand: "SkinGlow",
      price: 420000,
      originalPrice: 500000,
      category: "Supplements",
      badge: "15% OFF",
      badgeColor: "bg-pink-500 text-white",
      rating: 4.9,
      reviews: 2109,
      inStock: true,
    },
    {
      id: 8,
      name: "Multivitamin Daily Pack",
      brand: "VitaLife",
      price: 185000,
      originalPrice: 210000,
      category: "Vitamins",
      badge: "Popular",
      badgeColor: "bg-teal-500 text-white",
      rating: 4.7,
      reviews: 1456,
      inStock: true,
    },
  ],
};

export default mockData;
