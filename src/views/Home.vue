<template lang="pug">
  div#home-page
    corporate-section
    ecommerce-section
    application-section
    services-section
    portfolio-section
    me-section
    email-section
</template>

<script>
import CorporateSection from '@/components/CorporateSection'
import EcommerceSection from '@/components/EcommerceSection'
import ApplicationSection from '@/components/ApplicationSection'
import ServicesSection from '@/components/ServicesSection'
import PortfolioSection from '@/components/PortfolioSection'
import MeSection from '@/components/MeSection'
import EmailSection from '@/components/EmailSection'


export default {
  name: 'home',
  components: {
    CorporateSection,
    EcommerceSection,
    ApplicationSection,
    ServicesSection,
    PortfolioSection,
    MeSection,
    EmailSection
  }
}
</script>
