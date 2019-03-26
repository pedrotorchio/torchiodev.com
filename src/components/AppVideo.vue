<template lang="pug">
    video.video( ref="video" :autoplay="autoplay" muted loop playsinline @canplaythrough="mayAutoplayAction" @load="mayAutoplayAction" )
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
        }
    }
}
</script>
