import Vue from 'vue';
import Router from 'vue-router';
import Dash from '@/view/background/blog/views/dash/DashBoard';
import Post from '@/view/background/blog/views/post/PostPage';
import Manager from '@/view/background/blog/views/post/PostManager';
import User from '@/view/background/blog/views/UserPage';

Vue.use(Router);

let backPrefix = '后台管理 | ';
let brandName = '沉洋 | ';

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: () => import('@/view/background/Login'),
			meta: {
				title: '登录'
			}
		},
		{
			path: '/sys',
			name: 'Home',
			component: () => import('@/view/background/Home'),
			redirect: '/sys/dash',
			children: [
				{
					path: 'dash',
					component: Dash,
					meta: {
						title: backPrefix + '仪表盘'
					}
				},
				{
					path: 'post/:id?',
					component: Post,
					meta: {
						title: backPrefix + '文章撰写'
					}
				},
				{
					path: 'manage',
					component: Manager,
					meta: {
						title: backPrefix + '文章管理'
					}
				},
				{
					path: 'user',
					component: User,
					meta: {
						title: backPrefix + '用户中心'
					}
				},
				{
					path: 'setting',
					component: () => import('@/view/background/blog/views/setting/Setting.vue'),
					meta: {
						title: backPrefix + '设置'
					}
				},
				{
					path: 'user',
					component: () => import('@/view/background/blog/views/UserPage.vue'),
					meta: {
						title: backPrefix + '用户信息'
					}
				}
			]
		},
		{
			path: '/',
			name: 'Blog',
			component: () => import('@/view/front/Blog'),
			redirect: '/home',
			children: [
				{
					path: 'home',
					component: () => import('@/view/front/HomePage')
				},
				{
					path: 'article/:id',
					component: () => import('@/view/front/ArticlePage'),
					meta: {
						title: brandName + '阅读'
					}
				},
				{
					path: '/lab',
					component: () => import('@/view/front/LabPage'),
					meta: {
						title: '趣味实验室'
					}
				},
				{
					path: '/about',
					component: () => import('@/view/front/AboutPage'),
					meta: {
						title: '了解此项目'
					}
				},
				{
					path: '/about-me',
					component: () => import('@/view/front/AboutMePage'),
					meta: {
						title: '关于作者'
					}
				}
			]
		},
		{
			path: '/theater',
			component: () => import('@/view/codefun/movie/MovieTheater'),
			redirect: '/theater/home',
			children: [{
				path: 'home',
				component: () => import('@/view/codefun/movie/MovieOnlinePage'),
				meta: {
					title: brandName + '私人影院'
				}
			}, {
				path: 'detail/:id',
				component: () => import('@/view/codefun/movie/MovieDetail'),
				meta: {
					title: brandName + '影视详情'
				}
			}]
		},
		{
			path: '/css-layout',
			component: () => import('@/view/codefun/LayoutLab'),
			meta: {
				title: brandName + 'CSS布局'
			}
		},
		{
			path: '/idea-lab',
			component: () => import('@/view/codefun/TestPage'),
			meta: {
				title: brandName + 'Idea实验室'
			}
		},
		{
			path: '/time',
			component: () => import('@/view/codefun/TimeLocker'),
			meta: {
				title: '时钟锁屏'
			}
		},
		{
			path: '/imgServer',
			component: () => import('@/view/codefun/ImgServerPage'),
			meta: {
				title: '沉洋图床'
			}
		},
		{
			path: '/3D',
			component: () => import('@/view/codefun/ThreeDLab'),
			meta: {
				title: '3D实验室'
			}
		},
		{
			path: '/typing',
			component: () => import('@/view/codefun/TypeFun'),
			meta: {
				title: '打字练习'
			}
		},
		{
			path: '/typingChinese',
			component: () => import('@/view/codefun/TypeFunForChinese'),
			meta: {
				title: '打字练习（中文版）'
			}
		},
		{
			path: '/fileSystem',
			component: () => import('@/view/codefun/filesystem/FileSystem'),
			meta: {
				title: '文件管理系统'
			}
		},
		{
			path: '/store',
			name: 'Store',
			component: () => import('@/view/codefun/goods/OrderList'),
			meta: {
				title: '封鑫小店 - 订单列表'
			}
		},
		{
			path: '/postAlien',
			name: 'PostAlien',
			component: () => import('@/view/codefun/PostAlienOnline'),
			meta: {
				title: 'PostAlien - 请求发射器'
			}
		},
		{
			path: '/*',
			name: 'notfound',
			component: () => import('@/components/base/NotFound'),
			meta: {
				title: brandName + '404'
			}
		}
	]
});
