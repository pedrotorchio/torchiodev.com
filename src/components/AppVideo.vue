<template lang="pug">
    .video( :class="{ running }" )
        video( ref="video" :autoplay="autoplay" 
            muted  playsinline 
            :loop="loop"
            @canplaythrough="mayAutoplayAction" 
            @load="mayAutoplayAction"
            @ended="ended"
            v-on="listeners"
            v-bind="attrs" )
            source( :src="src" type="video/mp4" )
</template>
<script>
export default {
    props: {
        rate: {
            type: Number,
            default: 1
        },
        src: {
            type: String,
            required: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: false
        }
    },
    data: () =>({
        running: false
    }),
    computed: {
        listeners() {
            const { ended, ...listeners } = this.$listeners;
            return listeners;
        },
        attrs() {
            const { rate, src, autoplay, loop, ...attrs } = this.$attrs;
            return attrs
        }
    },
    methods: {
        mayAutoplayAction() {
            if (this.autoplay)
                this.play()
        },
        play() {
            if (this.$refs['video'].playbackRate)
                this.$refs['video'].playbackRate = this.rate
            this.$refs['video'].play()
            this.running = true
        },
        stop() {
            const vid = this.$refs['video'];
            vid.pause(); 
            vid.currentTime = 0;
            this.running = false
        },
        ended() {
            this.running = false
            this.$emit('ended')
        }
    }
}
</script>
<style lang="sass" scoped>
.video
    position: relative
    overflow: hidden
video
    position: absolute
    height: 100%
    width: 100%
    object-fit: cover
</style>
