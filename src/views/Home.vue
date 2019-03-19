<template lang="pug">
  div#home-page
    corporate-section
    ecommerce-section
    application-section
    services-section
</template>

<script>
import CorporateSection from '@/components/CorporateSection'
import EcommerceSection from '@/components/EcommerceSection'
import ApplicationSection from '@/components/ApplicationSection'
import ServicesSection from '@/components/ServicesSection'


export default {
  name: 'home',
  components: {
    CorporateSection,
    EcommerceSection,
    ApplicationSection,
    ServicesSection
  }
}
</script>
