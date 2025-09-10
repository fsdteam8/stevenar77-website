
import {AboutCommunity} from '@/components/website/community/AboutCommunity'
import CommunityHero from '@/components/website/community/CommunityHero'
import OurPartners from '@/components/website/community/OurPartners'
import React from 'react'

const page = () => {
  return (
    <div>
        <CommunityHero />
        <AboutCommunity />
        <OurPartners />
       
    </div>
  )
}

export default page