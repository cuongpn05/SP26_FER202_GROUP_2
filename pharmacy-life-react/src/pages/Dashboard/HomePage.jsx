import React from "react";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedProducts from "./FeaturedProducts";
import WhyUs from "./WhyUs";

const HomePage = () => {
    return (
        <main>
            <HeroSection />
            <CategoriesSection />
            <FeaturedProducts />
            <WhyUs />
        </main>
    );
};

export default HomePage;
