import ClientSourcing from '@/components/organisms/Landing/ClientSourcing'
import HeroSection from '@/components/organisms/Landing/Hero'
import HowITWorks from '@/components/organisms/Landing/HowITWorks'
import InfoBanner from '@/components/organisms/Landing/InfoBanner'
import React from 'react'
import BaseTemplate from '../BaseTemplate'
import ProfessionalsSection from '@/components/organisms/Landing/ProfessionalsSection'
import RecentsEvents from '@/components/organisms/Landing/RecentsEvents'

function LandingTemplate() {
  return (
    <BaseTemplate>
        <HeroSection />
        <InfoBanner />
        <RecentsEvents />
        <ProfessionalsSection />
        <HowITWorks />
        <ClientSourcing />
    </BaseTemplate>
  )
}

export default LandingTemplate