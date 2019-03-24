import Vue from 'vue'
import SvgIcon from 'vue-svgicon'

Vue.use(SvgIcon, {
    tagName: 'svg-loader'
})
let handleOutsideClick;
Vue.directive('out-click', {
    bind (el, binding, vnode) {

        handleOutsideClick = e => {
            e.stopPropagation()
            let issame = false
            if (!el.contains(e.target)) {
                issame = true
                el.dispatchEvent(new Event('out-click'))
            }
        }

        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('touchstart', handleOutsideClick)
    },
    unbind () {
        document.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
    }
})

import SmoothScroll from 'smooth-scroll'
new SmoothScroll('a[href*="#"]', {
    clip: true,
    offset: 100,
    ease: 'easeOutQuint'
});