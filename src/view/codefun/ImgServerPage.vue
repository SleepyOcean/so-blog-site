<template>
	<div class="img-server-page full" ref="imgUploadBoxRef">
		<div class="isp-left-box">
			<div
				class="isp-ilb-menu-item"
				:class="{ active: currentMenu === 0 }"
				@click="currentMenu = 0"
			>
				全部
			</div>
			<div
				class="isp-ilb-menu-item"
				:class="{ active: currentMenu === 1 }"
				@click="currentMenu = 1"
			>
				最近一个月（暂未开放）
			</div>
			<div
				class="isp-ilb-menu-item"
				:class="{ active: currentMenu === 2 }"
				@click="currentMenu = 2"
			>
				回收站（暂未开放）
			</div>
			<div class="isp-ilb-upload-item" v-if="1">
				<div class="pic-upload-box">
					<picture-input
						@change="picChange"
						hideChangeButton
						plain
						title="点击、拖拽或粘贴，添加图片"
					></picture-input>
					<div class="upload-img-info">
						点击、拖拽或粘贴，添加图片
					</div>
					<img class="pic-upload-preview" :src="imgOfBase64" v-if="imgOfBase64"/>
				</div>
				<el-button class="iiub-bt" type="text" @click="upload" :loading="loading.upload">上传</el-button>
			</div>
		</div>
		<div class="isp-content-box word-cannot-selected" ref="contentRef">
			<div class="icb-option-bar"></div>
			<div class="icb-img-container-box">
				<div class="icb-img-container" :class="{'selected': currentSelected === index}" :style="`width: ${imgWidth}px;`" v-for="(img, index) in imageList" :key="index">
					<div class="icb-img-box" @click="currentSelected = index" @dblclick="photoView = true">
						<el-image :src="getCompressImg(img.id)" :title="img.alias" class="full"/>
					</div>
				</div>
			</div>
			<pagination
				:layout="'total, sizes, prev, pager, next'" :page="page"
				:pageSizes="[30,60,90,120]"
				@pageChange="pageChange" @sizeChange="sizeChange"></pagination>
			<so-loading :show="loading.list"></so-loading>
		</div>
		<div class="isp-detail-box">
			<template>
				<div class="idb-img-box" title="点击查看大图" @click="photoView = true">
					<el-image class="full" :src="getImageUrl(currentImg.id)">
						<div slot="error" class="full">
							<i class="icon-ios-image image-slot"></i>
						</div>
					</el-image>
				</div>
				<template>
					<label-content title="基本属性"></label-content>
					<label-content
						label="别名"
						:content="currentImg.title"
					></label-content>
					<label-content
						label="分辨率"
						:content="currentImg.resolution"
					></label-content>
					<label-content
						label="体积"
						:content="currentImg.size"
					></label-content>
					<label-content
						label="格式"
						:content="currentImg.format"
					></label-content>
					<label-content
						label="发布时间"
						:content="formatTime(currentImg.uploadTime)"
					></label-content>
					<label-content label="图片地址">
						<span slot="content">
							<el-link
								class="iiub-url"
								type="primary"
								:href="getImageUrl(currentImg.id)"
								target="_blank"
								v-if="currentImg.id"
							>点击查看</el-link>
							<el-button
								type="primary"
								icon="el-icon-copy-document"
								size="mini"
								title="点击复制图片地址"
								@click="copyImgUrl"
								circle></el-button>
						</span>
					</label-content>
					<div class="idb-options-box">
						<el-popconfirm
							cancelButtonText='不用了'
							confirmButtonText='好的'
							icon="el-icon-info"
							iconColor="red"
							title="确定删除该图片吗？" @onConfirm="deleteImg"
						>
							<el-button slot="reference" type="danger">删除图片</el-button>
						</el-popconfirm>
						<el-button type="primary" @click="copyImgUrlForMarkdown">获取markdown引用</el-button>
					</div>
				</template>
			</template>
		</div>
		<div class="isp-photo-view" v-if="photoView" @click.stop="1">
			<i class="icon-ios-close-circle-out" @click="photoView = false"></i>
			<el-image :src="getImageUrl(currentImg.id)" fit="contain">
				<div slot="error" class="full center-box">
					<i class="icon-ios-image image-slot"></i>
				</div>
			</el-image>
		</div>
	</div>
</template>

<script>
import {deleteImg, searchImg, uploadImg} from '../../service/imgService';

const SoLoading = () => import('../../components/base/SoLoading');
const Pagination = () => import('../../components/layout/Pagination');
const LabelContent = () => import('../../components/layout/LabelContent');
const PictureInput = () => import('vue-picture-input');
export default {
	name: 'ImgServerPage',
	components: {
		SoLoading,
		Pagination,
		LabelContent,
		PictureInput
	},
	data () {
		return {
			galleryServerUrl: 'https://gallery.sleepyocean.cn/resource/img/',
			loading: {
				upload: false,
				list: false,
				detail: false
			},
			imgWidth: '',
			currentMenu: 0,
			imgOfBase64: '',
			imageList: [],
			currentSelected: '',
			photoView: false,
			page: {
				total: 0,
				size: 60,
				current: 1
			}
		};
	},
	mounted () {
		this.search();
		this.resize();
		let self = this;
		window.onresize = () => {
			return (() => {
				self.resize();
			})();
		};
		this.$refs['imgUploadBoxRef'].addEventListener('paste', e => {
			let fileItems = e.clipboardData.items;
			for (let i = 0; i < fileItems.length; i++) {
				if (fileItems[i].kind === 'file' && fileItems[i].type.indexOf('image/') > -1) {
					let blob = fileItems[i].getAsFile();
					let reader = new FileReader();
					reader.readAsDataURL(blob);
					reader.onload = function (e) {
						self.imgOfBase64 = e.target.result;
					};
				}
			}
		});
	},
	computed: {
		currentImg: function () {
			if (this.imageList && this.imageList.length && this.currentSelected !== '') {
				return this.imageList[this.currentSelected];
			} else {
				return {};
			}
		}
	},
	methods: {
		resize () {
			if (this.$refs) {
				let clientWidth = parseInt(this.$refs['contentRef'].clientWidth) - 20;

				if (clientWidth < 200) {
					this.imgWidth = '200';
				} else if (clientWidth < 1800) {
					this.imgWidth = (clientWidth - 100) / 5 - 1;
				} else {
					this.imgWidth = (clientWidth - 200) / 10 - 1;
				}
			}
		},
		pageChange (current) {
			this.page.current = current;
			this.search();
		},
		sizeChange (size) {
			this.page.size = size;
			this.search();
		},
		search () {
			let params = {
				pageSize: this.page.size,
				pageStart: (this.page.current - 1) * this.page.size
			};
			this.loading.list = true;
			searchImg(params).then(data => {
				this.imageList = data.resultList;
				setTimeout(() => {
					this.currentSelected = 0;
				}, 1000);
				this.page.total = data.total;
			}).finally(() => {
				this.loading.list = false;
			});
		},
		picChange (img) {
			this.imgOfBase64 = img;
		},
		upload () {
			this.$prompt('为图片取个别名吧', '命名', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({value}) => {
				let params = {
					alias: value,
					imgOfBase64: this.imgOfBase64
				};
				this.loading.upload = true;
				uploadImg(params)
					.then(data => {
						if (data.status === 200) {
							this.$message.success('上传成功');
							this.loading.list = true;
							this.imgOfBase64 = '';
						} else if (data.status === 406) {
							navigator.clipboard.writeText(this.getImageUrl(data.id))
								.then(() => {
									this.$message.info('重复上传。图片地址已复制到剪切板。');
								})
								.catch(e => {
									this.$message.error('复制图片地址失败！' + e);
								});
						} else if (data.status === 500) {
							this.$message.error('服务器内部错误，上传图片失败!');
						}
					})
					.catch(e => {
						console.error(e);
						this.$message.error('上传图片失败!');
					}).finally(() => {
						this.loading.upload = false;
						setTimeout(this.search, 1000);
					});
			});
		},
		formatTime (time) {
			return time ? time.substr(0, 19).replace('T', ' ') : '';
		},
		getImageUrl (id) {
			return id ? this.galleryServerUrl + id : '';
		},
		getCompressImg (id) {
			let url = this.galleryServerUrl + 'thumbnail/' + id;
			return url;
		},
		deleteImg () {
			let editCode = '';
			this.$prompt('请输入授权码', '鉴权', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({value}) => {
				editCode = value;
				let params = {
					editCode: editCode,
					imgIds: [this.currentImg.id]
				};
				deleteImg(params).then(data => {
					if (data === 'success') {
						this.currentSelected = '';
						this.$message.success('删除成功');
						this.loading.list = true;
						setTimeout(this.search, 3000);
					} else {
						this.$message.error('授权码错误，删除失败！');
					}
				}).catch(e => {
					this.$message.error('删除图片失败！' + e);
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消删除'
				});
			});
		},
		copyImgUrl () {
			navigator.clipboard.writeText(this.getImageUrl(this.currentImg.id))
				.then(() => {
					this.$message.success('复制图片地址成功');
				})
				.catch(e => {
					this.$message.error('复制图片地址失败！' + e);
				});
		},
		copyImgUrlForMarkdown () {
			let markdownUrl = `![${this.currentImg.title}](${this.getImageUrl(this.currentImg.id)})`;
			navigator.clipboard.writeText(markdownUrl)
				.then(() => {
					this.$message.success('获取markdown引用成功');
				})
				.catch(e => {
					this.$message.error('获取markdown引用失败！' + e);
				});
		}
	}
};
</script>

<style lang="scss">
.img-server-page {
	background: #fafafa;
	overflow: hidden;
	.isp-left-box {
		width: 300px;
		height: 100%;
		background: white;
		float: left;
		padding-top: 10%;
		position: relative;
		box-shadow: 5px 0px 13px 6px #f9f9f9;
		.isp-ilb-menu-item {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
			font-size: 14px;
			cursor: pointer;
			user-select: none;
			transition: all 0.1s linear;
			&.active {
				font-size: 18px;
				font-weight: bold;
				&::before {
					content: "";
					width: 4px;
					height: 12px;
					background: #4168fa;
					position: absolute;
					left: 0px;
				}
			}
			&:hover {
				color: #215f9e;
			}
		}
		.isp-ilb-upload-item {
			position: absolute;
			bottom: 80px;
			width: 100%;
			.pic-upload-box {
				margin: auto;
				width: 200px;
				height: 200px;
				position: relative;
				.upload-img-info {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					margin: 10px;
					border: 8px dashed #ebecf1;
					height: calc(100% - 20px);
					width: calc(100% - 20px);
					top: 0;
					font-size: 12px;
					font-weight: bold;
				}
			}
			.pic-upload-preview {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				z-index: 10;
			}
			.iiub-bt {
				margin-top: 10px;
			}
			.iiub-url {
				font-size: 14px;
			}
		}
	}
	.isp-content-box {
		position: relative;
		width: calc(100% - 600px);
		height: 100%;
		float: left;
		transition: all 0.4s ease-in-out;
		.icb-option-bar {
			height: 0px;
		}
		.icb-img-container-box {
			height: calc(100% - 60px - 0px);
			overflow-x: auto;
			padding: 10px;
			.icb-img-container {
				height: 200px;
				float: left;
				margin: 10px;
				&.selected {
					outline: 2px solid #4168fa;
				}
				.icb-img-box {
					height: 100%;
					width: 100%;
					box-shadow: 0 0 20px 1px #f7e6e6;
					img {
						object-fit: cover;
						border-radius: 4px;
						transition: all 0.3s ease-in-out;
						&:hover {
							filter: brightness(1.1);
						}
					}
				}
			}
		}
	}
	.isp-detail-box {
		width: 300px;
		height: 100%;
		background: white;
		position: relative;
		float: right;
		padding: 5px 10px;
		box-shadow: -5px 0px 13px 6px #f9f9f9;
		.idb-img-box {
			width: 100%;
			height: 300px;
			margin-bottom: 20px;
			cursor: pointer;
			img {
				object-fit: contain;
			}
			.image-slot {
				color: #9da0ef;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 64px;
				background: #f1f1f1;
				border-radius: 10px;
			}
		}
		.idb-options-box {
			margin-top: 20px;
			position: absolute;
			bottom: 20px;
			width: 100%;
		}
	}
	.isp-photo-view {
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000d;
		z-index: 11;
		.icon-ios-close-circle-out {
			position: absolute;
			right: 20px;
			top: 10px;
			font-size: 32px;
			color: white;
			z-index: 1;
			transition: color .2s linear;
			&:hover {
				color: #215f9e;
			}
		}
		.image-slot {
			color: #9da0ef;
			max-width: 800px;
			max-height: 800px;
			height: 60%;
			width: 60%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 120px;
			background: #f1f1f1;
			border-radius: 10px;
		}
	}
}
.picture-preview {
	z-index: 10 !important;
}
</style>
