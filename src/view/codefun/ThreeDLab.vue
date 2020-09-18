<template>
    <div class="three-lab full no-scrollbar">
		<div class="operation-panel" v-if="false">
			<el-form :model="form" label-width="80px">
				<el-form-item label="z-index">
					<el-input v-model="form.camera.zIndex" clearable></el-input>
				</el-form-item>
			</el-form>
		</div>
        <div ref="boxRef" class="full"></div>
    </div>
</template>

<script>
import * as Three from 'three';

export default {
	name: 'ThreeDLab',
	data () {
		return {
			camera: null,
			scene: null,
			renderer: null,
			mesh: null,
			line: null,
			cube: null,
			border: null,
			form: {
				camera: {
					zIndex: 1
				}
			}
		};
	},
	methods: {
		init: function () {
			let container = this.$refs.boxRef;
			this.camera = new Three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 500);
			this.camera.position.set(0, 0, 100);
			this.camera.lookAt(0, 0, 0);

			this.scene = new Three.Scene();
			let geometry = new Three.BoxGeometry(10, 10, 10);
			let material = new Three.MeshNormalMaterial();
			this.mesh = new Three.Mesh(geometry, material);
			this.mesh.position.x = -40;
			this.scene.add(this.mesh);

			let lineMaterial = new Three.LineBasicMaterial({ color: 0xffffff });
			let lineGeometry = new Three.Geometry();
			lineGeometry.vertices.push(new Three.Vector3(-10, 0, 0));
			lineGeometry.vertices.push(new Three.Vector3(0, 10, 0));
			lineGeometry.vertices.push(new Three.Vector3(10, 0, 0));
			lineGeometry.vertices.push(new Three.Vector3(-10, 0, 0));
			this.line = new Three.Line(lineGeometry, lineMaterial);
			this.line.position.x = 40;
			this.scene.add(this.line);

			// 设置长宽高 以及对应长宽高的分段，在使用线模式({wireframe:true})进行渲染的时候可以看到效果
			let cubeGeometry = new Three.BoxGeometry(20, 10, 15, 2, 3, 1);
			// 材质
			let cubeMaterial = new Three.MeshNormalMaterial({wireframe: true});
			this.cube = new Three.Mesh(cubeGeometry, cubeMaterial);
			this.border = new Three.EdgesHelper(this.cube, 0xffff00); // 添加边框
			this.scene.add(this.cube);
			this.scene.add(this.border);

			this.renderer = new Three.WebGLRenderer({antialias: true});
			this.renderer.setSize(container.clientWidth, container.clientHeight);
			container.appendChild(this.renderer.domElement);
		},
		animate: function () {
			requestAnimationFrame(this.animate);
			this.mesh.rotation.x += 0.01;
			this.mesh.rotation.y += 0.02;
			this.line.rotation.x += 0.01;
			this.line.rotation.y += 0.02;
			this.cube.rotation.x += 0.01;
			this.cube.rotation.y += 0.01;
			this.border.rotation.x += 0.01;
			this.border.rotation.y += 0.01;
			this.renderer.render(this.scene, this.camera);
		}
	},
	mounted () {
		this.init();
		this.animate();
	}
};
</script>
<style lang="scss" scoped>
	.three-lab{
		.operation-panel{
			position: absolute;
			height: 200px;
			width: 400px;
			border: 1px dashed #fff;
			margin: 20px;
			padding: 10px;
		}
	}
</style>
