"use client";
import { useState } from "react";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import SocialProof from "@/components/sections/SocialProof";
import About from "@/components/sections/About";
import Podcast from "@/components/sections/Podcast";
import HowItWorks from "@/components/sections/HowItWorks";
import Membership from "@/components/sections/Membership";
import Testimonials from "@/components/sections/Testimonials";
import Offerings from "@/components/sections/Offerings";
import Sponsors from "@/components/sections/Sponsors";
import FAQ from "@/components/sections/FAQ";
import CTABand from "@/components/sections/CTABand";
import Footer from "@/components/layout/Footer";
import AppModal from "@/components/modals/AppModal";
import MembershipModal from "@/components/modals/MembershipModal";

export default function Home() {
    const [appModal, setAppModal] = useState(false);
    const [memberModal, setMemberModal] = useState(null);

    return (
        <>
            <Nav onApply={() => setAppModal(true)} />
            <Hero onApply={() => setAppModal(true)} />
            <Ticker />
            <SocialProof />
            <About />
            <Podcast />
            <HowItWorks onApply={() => setAppModal(true)} />
            <Membership onJoin={setMemberModal} />
            <Testimonials />
            <Offerings />
            <Sponsors />
            <FAQ />
            <CTABand onApply={() => setAppModal(true)} />
            <Footer />
            {appModal && <AppModal onClose={() => setAppModal(false)} />}
            {memberModal && <MembershipModal tierId={memberModal} onClose={() => setMemberModal(null)} />}
        </>
    );
}
