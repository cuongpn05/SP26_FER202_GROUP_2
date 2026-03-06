import React from "react";

const features = [
    {
        id: "trusted-quality",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: "Certified & Authentic",
        desc: "All products are licensed by the Ministry of Health and sourced directly from authorized distributors.",
        color: "bg-primary-50 text-primary-500",
    },
    {
        id: "fast-delivery",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "2-Hour Express Delivery",
        desc: "Order before 10PM and receive your medicines within 2 hours. Available in 20+ cities.",
        color: "bg-green-50 text-accent",
    },
    {
        id: "pharmacist-support",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
        title: "24/7 Pharmacist Chat",
        desc: "Get free consultations from licensed pharmacists anytime. Your health questions answered instantly.",
        color: "bg-purple-50 text-purple-500",
    },
    {
        id: "easy-returns",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        title: "Easy Returns & Refunds",
        desc: "Not satisfied? Return within 7 days for a full refund. No questions asked.",
        color: "bg-orange-50 text-orange-500",
    },
];

const WhyUs = () => {
    return (
        <section id="about" className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block text-xs font-semibold text-primary-100 tracking-widest uppercase bg-white/10 px-4 py-1.5 rounded-full mb-4">
                        Why PharmacyLife
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Healthcare You Can Trust
                    </h2>
                    <p className="text-primary-100 max-w-md mx-auto">
                        We are committed to delivering the highest quality healthcare products and services.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f) => (
                        <div
                            key={f.id}
                            id={f.id}
                            className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-default group"
                        >
                            <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                                {f.icon}
                            </div>
                            <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                            <p className="text-primary-100 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-14">
                    <a
                        href="#products"
                        id="why-us-cta-btn"
                        className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                    >
                        Start Shopping Now
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
