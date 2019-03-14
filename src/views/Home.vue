<template lang="pug">
  div#home-page
    corporate-section
    ecommerce-section
</template>

<script>
import CorporateSection from '@/components/CorporateSection'
import EcommerceSection from '@/components/EcommerceSection'

export default {
  name: 'home',
  components: {
    CorporateSection,
    EcommerceSection,
  }
}
</script>
