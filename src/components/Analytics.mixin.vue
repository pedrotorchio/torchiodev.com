<script>
export default {
    methods: {
        whoAmIClick(position) {
            const ga = window.ga
            if (ga)
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'button',
                    eventAction: 'click',
                    eventLabel: 'WhoAmI'
                });       
        }
    }
}
</script>
