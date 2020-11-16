import Vue from 'vue';
import App from './App';
import router from './router';
import Lang from '../lang';
import ElementUI from 'element-ui';
import './style/scss/socolor.scss';
import './assets/icon/ios/iconfont.css';
import './assets/font/font.css';
import './style/scss/common.scss';
import './style/scss/othercomponents.scss';
import './style/scss/soelement.scss';
import './style/css/animate.css';
import Config from '../utils/config';
import configJson from '../static/so-blog-config';
import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');

Vue.use(VideoPlayer);

Vue.use(ElementUI);
Vue.use(Lang);
Vue.config.productionTip = false;

// 初始化配置

Config.setConfig(configJson);

Vue.prototype.$config = Config;

router.beforeEach((to, from, next) => {
	console.log('欢迎来到沉睡的海洋');
	if (to.params.id) {
		window.document.title = to.params.id.split('=')[0];
	} else {
		window.document.title = to.meta.title ? to.meta.title : '沉洋';
	}
	if (!localStorage.token && to.fullPath.indexOf('/sys/') > -1) {
		next('/login');
	} else {
		next();
	}
});

// 提交验证
Vue.directive('clickOutside', {
	// 初始化指令
	bind (el, binding, vnode) {
		function clickHandler (e) {
			// 这里判断点击的元素是否是本身，是本身，则返回
			if (el.contains(e.target)) {
				return false;
			}
			// 判断指令中是否绑定了函数
			if (binding.expression) {
				// 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
				binding.value(e);
			}
		}
		// 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
		el.__vueClickOutside__ = clickHandler;
		document.addEventListener('click', clickHandler);
	},
	update () {},
	unbind (el, binding) {
		// 解除事件监听
		document.removeEventListener('click', el.__vueClickOutside__);
		delete el.__vueClickOutside__;
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
