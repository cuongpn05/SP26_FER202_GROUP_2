import React from "react";

const Footer = () => {
    const links = {
        Company: ["About Us", "Careers", "Press", "Blog"],
        Products: ["Medicines", "Vitamins", "Skincare", "Equipment"],
        Support: ["Help Center", "Contact Us", "Shipping Info", "Returns"],
        Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    };

    const socials = [
        {
            name: "Facebook",
            href: "#",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        {
            name: "Instagram",
            href: "#",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
        {
            name: "Twitter",
            href: "#",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
    ];

    return (
        <footer id="contact" className="bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                {/* Top Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-white">
                                Pharmacy<span className="text-primary-400">Life</span>
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
                            Your trusted online pharmacy. Quality medicines, fast delivery, and professional health advice 24/7.
                        </p>
                        {/* Socials */}
                        <div className="flex gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    aria-label={s.name}
                                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(links).map(([title, items]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                {title}
                            </h4>
                            <ul className="space-y-2.5">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="text-sm text-slate-400 hover:text-primary-400 transition-colors duration-200"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Bar */}
                <div className="border-t border-slate-800 pt-8 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: "📍", label: "123 Health Street, Hanoi, Vietnam" },
                            { icon: "📞", label: "+84 (0) 123 456 789" },
                            { icon: "✉️", label: "support@pharmacylife.vn" },
                        ].map(({ icon, label }) => (
                            <div key={label} className="flex items-center gap-3 text-sm text-slate-400">
                                <span className="text-base">{icon}</span>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
                    <p>© 2025 PharmacyLife. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
