import Vue from 'vue'
import SvgIcon from 'vue-svgicon'

Vue.use(SvgIcon, {
    tagName: 'svg-loader'
})
let handleOutsideClick;
Vue.directive('out-click', {
    bind (el, binding, vnode) {

        handleOutsideClick = (e) => {
            e.stopPropagation()
            const handler = binding.value
            
            if (!el.contains(e.target)) {
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