<template>
	<div class="test-box">
		<svg width="168px" height="144px" v-if="false">
			<polygon
				fill="white"
				id="polygon"
				points="42,0,126,0,168,77,126,144,42,144,0,77"
			></polygon>
		</svg>
		<div class="sticky-ball full" v-if="false">
			<div class="effect">
				<div class="ball1" v-drag></div>
				<div class="ball2" v-drag></div>
			</div>
		</div>
		<div class="full" v-if="false">
			<div
				style="height: 40px;width: 40px;background: #1d193a;position:absolute;top: 0"
				@click="changeIframeStyle"
			></div>
			<iframe
				id="testFrame"
				name="testFrame"
				class="full"
				src="http://www.internetke.com/jsEffects/2016020107/index.html"
			></iframe>
		</div>
		<div class="ball-transition-box full">
			<div class="ball" v-drag></div>
		</div>
		<div class="row-scroll-test" v-if="false">
			<div class="row-box">
				<div
					class="column-item"
					v-for="(item, index) in [1, 2, 3, 4, 5, 6]"
					:key="index"
				>
					{{ item }}
				</div>
			</div>
		</div>
		<div class="full center-box" v-if="false">
			<canvas
				ref="canvasRef"
				width="1920"
				height="600"
				style="z-index: 1"
			></canvas>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TestPage',
	data () {
		return {
			imgSrc: 'http://localhost:9999/resource/img/12.jpg'
		};
	},
	mounted () {
		let arrs = [];
		let a1 = {
			name: 'Bob',
			age: 12
		};
		let a2 = {
			name: 'Lily',
			age: 11
		};
		arrs.push(a1);
		arrs.push(a2);
		this.changeParams(arrs);
		console.log(arrs);
	},
	methods: {
		changeParams (arrs) {
			arrs.forEach(a => {
				a.id = `id_${a.age}`;
			});
		},
		canvasInit () {
			let self = this;
			let c = self.$refs.canvasRef;
			let context = c.getContext('2d');
			let cW = c.width;
			let cH = c.height;
			let img = new Image();

			img.onload = function onImageLoad () {
				let imgW = img.width;
				let imgH = img.height;
				let sx, sy, swidth, sheight;
				if (cH / cW > imgH / imgW) {
					sx = (imgW - (cW * imgH) / cH) / 2;
					sy = 0;
					swidth = (imgH * cW) / cH;
					sheight = imgH;
				} else {
					sx = 0;
					sy = (imgH - (cH * imgW) / cW) / 2;
					swidth = imgW;
					sheight = (imgW * cH) / cW;
				}
				context.drawImage(img, sx, sy, swidth, sheight, 0, 0, cW, cH);
			};
			img.src = self.imgSrc;
		},
		changeIframeStyle () {
			let frameDoc = document.getElementById('testFrame');
			let frameInner =
				frameDoc.contentDocument || frameDoc.contentWindow.document;
			let title = frameInner.getElementsByClassName('keTitle');
			title.style.color = '#0f0';
		}
	},
	// 自定义指令
	directives: {
		drag (el, bindings) {
			el.onmousedown = function (e) {
				let disx = e.pageX - el.offsetLeft;
				let disy = e.pageY - el.offsetTop;
				document.onmousemove = function (e) {
					let left = e.pageX - disx;
					let top = e.pageY - disy;
					el.style.left = left + 'px';
					el.style.top = top + 'px';
					e.preventDefault();
					e.stopPropagation();
				};
				document.onmouseup = function (e) {
					let disx = e.pageX - el.offsetLeft;
					let disy = e.pageY - el.offsetTop;
					let left = e.pageX - disx;
					let top = e.pageY - disy;
					if (left != 0) {
						let timeout = (1 / 8) * Math.abs(left);
						el.style.transition = 'all ' + timeout + 'ms ease-out';
						el.style.left = -10 + 'px';
						setTimeout(() => {
							el.style.transition = 'unset';
							el.style.animation = 'jello .8s ease';
							setTimeout(() => {
								el.style.animation = 'unset';
							}, 800);
						}, timeout - 100 / timeout);
					}
					let maxHeight = document.documentElement.offsetHeight - 60;
					if (top < 20 || top > maxHeight) {
						el.style.top = top < 20 ? 20 + 'px' : maxHeight + 'px';
					} else {
						el.style.top = top + 'px';
					}
					e.preventDefault();
					e.stopPropagation();
					document.onmousemove = document.onmouseup = null;
				};
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.test-box {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	.row-scroll-test {
		width: 400px;
		height: 80px;
		border: 1px solid #1d193a;
		overflow: hidden;

		.row-box {
			white-space: nowrap;
			position: relative;
			left: -18px;

			.column-item {
				height: 80px;
				width: 80px;
				border: 1px dotted #0b638f;
				box-sizing: border-box;
				display: inline-block;
				background: aqua;
			}
		}
	}

	.sticky-ball {
		.effect {
			width: 100%;
			height: 100%;
			padding-top: 50px;
			filter: contrast(10);
			background: #fff;
		}

		.ball1,
		.ball2 {
			width: 80px;
			height: 80px;
			background: #417bf1;
			padding: 10px;
			border-radius: 50%;
			position: absolute;
			top: 230px;
			z-index: 2;
			filter: blur(8px);
		}

		.ball1 {
			left: 0;
			animation: bball1 6s infinite;
		}

		.ball2 {
			left: 240px;
			animation: bball2 6s infinite;
		}

		@keyframes bball1 {
			0%,
			100% {
				left: 0;
				top: 230px;
				width: 80px;
				height: 80px;
			}
			20% {
				top: 230px;
				width: 80px;
				height: 80px;
			}
			85% {
				top: 230px;
				left: 75px;
				width: 90px;
				height: 70px;
			}
			90% {
				top: 228px;
				width: 75px;
				height: 85px;
			}
			50% {
				top: 215px;
				left: 110px;
				width: 110px;
				height: 110px;
			}
		}
		@keyframes bball2 {
			0%,
			100% {
				left: 240px;
				top: 230px;
				width: 80px;
				height: 80px;
			}
			20% {
				top: 230px;
				width: 80px;
				height: 80px;
			}
			85% {
				top: 230px;
				left: 165px;
				width: 90px;
				height: 70px;
			}
			90% {
				top: 228px;
				width: 75px;
				height: 85px;
			}
			50% {
				left: 110px;
				top: 215px;
				width: 110px;
				height: 110px;
			}
		}
	}

	.ball-transition-box {
		.ball {
			position: absolute;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: #417bf1;
			box-shadow: 0 0.05rem 0.3rem 0 rgb(125, 125, 125);
		}
	}
	.center-box {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
