import React from "react";

const HeroSection = () => {
    const statsData = [
        { value: "10,000+", label: "Products" },
        { value: "50,000+", label: "Customers" },
        { value: "24/7", label: "Support" },
        { value: "2-Hour", label: "Delivery" },
    ];

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 pt-20"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-0 -left-24 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-30" />
                {/* Grid dots */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #4F81E1 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="animate-fade-up">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                            Trusted by 50,000+ customers nationwide
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                            Your Health{" "}
                            <span className="relative">
                                <span className="text-primary-500">Partner</span>
                                <svg
                                    className="absolute -bottom-1 left-0 w-full"
                                    viewBox="0 0 200 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 5.5C50 1.5 100 7 150 3.5C170 2 185 4 199 5.5"
                                        stroke="#4F81E1"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        opacity="0.4"
                                    />
                                </svg>
                            </span>
                            ,{" "}
                            <br className="hidden sm:block" />
                            Online Pharmacy
                        </h1>

                        <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                            Access over 10,000 medicines and health products. Get professional consultation,
                            fast delivery, and authentic medicines — all from the comfort of your home.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mb-12">
                            <a href="#products" id="hero-shop-now-btn" className="btn-primary text-base">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 7H4l1-7z" />
                                </svg>
                                Shop Now
                            </a>
                            <a href="#categories" id="hero-browse-btn" className="btn-outline text-base">
                                Browse Categories
                            </a>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {statsData.map(({ value, label }) => (
                                <div key={label} className="text-center sm:text-left">
                                    <div className="text-2xl font-bold text-primary-500">{value}</div>
                                    <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative flex justify-center items-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        {/* Main Card */}
                        <div className="relative w-full max-w-sm">
                            {/* Floating Card: Delivery */}
                            <div className="absolute -top-6 -left-6 z-10 bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 animate-slide-in">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-slate-700">Order Delivered!</div>
                                    <div className="text-[11px] text-slate-400">2 hours express delivery</div>
                                </div>
                            </div>

                            {/* Floating Card: Discount */}
                            <div
                                className="absolute -bottom-4 -right-4 z-10 bg-primary-500 text-white rounded-2xl shadow-lg p-4 animate-slide-in"
                                style={{ animationDelay: "0.3s" }}
                            >
                                <div className="text-2xl font-extrabold leading-none">20%</div>
                                <div className="text-xs opacity-90 mt-0.5">OFF First Order</div>
                                <div className="text-[10px] opacity-70">Use code: PHARMA20</div>
                            </div>

                            {/* Hero Image từ banner */}
                            <div className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl bg-gradient-to-br from-primary-100 to-blue-100">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/img/banner/Banner1.png`}
                                    alt="PharmacyLife Banner"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display = "flex";
                                    }}
                                />
                                {/* Fallback nếu ảnh lỗi */}
                                <div className="hidden w-full h-full items-center justify-center text-center p-8">
                                    <div className="w-32 h-32 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6">
                                        <svg className="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div className="text-xl font-bold text-slate-700 mb-2">PharmacyLife</div>
                                    <div className="text-sm text-slate-500">Premium Health Products</div>
                                    <div className="flex justify-center gap-2 mt-6">
                                        {["bg-primary-400", "bg-accent", "bg-amber-400"].map((color, i) => (
                                            <div key={i} className={`${color} w-8 h-4 rounded-full opacity-80`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
                        fill="#F8FAFF"
                    />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
