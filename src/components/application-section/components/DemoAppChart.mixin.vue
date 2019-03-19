<script>
import { easeQuadOut as d3Easing } from "d3-ease";
import "d3-transition";

export default {
    methods: {
        applyTransition(selection) {
            selection = selection
                .transition()
                .ease(d3Easing)
                .duration(500)

            return selection;
        },
    }
}
</script>
