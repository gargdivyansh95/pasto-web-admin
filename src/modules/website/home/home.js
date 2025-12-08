"use client"
import React from 'react'
import { Banner, Faqs, GetApp, GrowBusiness, HowItWorks, Testimonials, WeServe } from './components';
import { Footer, Header } from '@/shared';

export const Home = () => {

    return (
        <div>
            <Header />
            <Banner />
            <WeServe />
            <HowItWorks />
            <GetApp />
            <GrowBusiness />
            <Faqs />
            <Testimonials />
            <Footer />
        </div>
    )
}
