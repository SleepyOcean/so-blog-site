<template>
	<div class="full post-page mavon-style">
		<div class="pp-frame full">
			<el-page-header @back="goBack" class="pp-title">
				<so-editable-label slot="content" v-model="form.title" placeholder="请输入标题"></so-editable-label>
			</el-page-header>
			<mavon-editor ref="editorRef" v-loading="loading.article" class="pp-article-editor" v-model="form.content" :font-size="'18px'" :toolbars="toolbars" @imgAdd="addImg" @imgDel="delImg" placeholder="✍ 开始你的创作吧~"/>
		</div>
		<div class="float-button" @click="dialShowing = true">
			<i class="icon-ios-checkmark"></i>
		</div>
		<el-dialog width="890px" :visible.sync="dialShowing" :show-close="false">
			<div slot="title" style="display: none;"></div>
			<div class="modal-box word-cannot-selected">
				<div class="form-panel full-height">
					<div class="form-header">文章信息</div>
					<el-form class="form-style" :model="form">
						<el-form-item>
							<el-input class="input-title" placeholder="文章标题" v-model="form.title"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input type="textarea" placeholder="摘要" v-model="form.summary" maxlength="250" resize="none" :autosize="{ minRows: 5, maxRows: 6 }" show-word-limit></el-input>
						</el-form-item>
						<el-form-item>
							<tag-input v-model="form.tags" @tagChange="tagChange"></tag-input>
						</el-form-item>
						<el-form-item>
							<el-autocomplete
								class="full-width"
								popper-class="ai-input-content"
								v-model="collection.name"
								:trigger-on-focus="false"
								:fetch-suggestions="collectionSearch"
								placeholder="输入，搜索专栏"
								@select="collectionSelected"
								autofocus
							>
								<template slot-scope="{ item }">
									<div class="name">{{ item.name }}</div>
								</template>
							</el-autocomplete>
						</el-form-item>
						<el-form-item>
							<el-switch
								style="display: block"
								v-model="form.privacy"
								active-color="#c6c8ce"
								inactive-color="#13ce66"
								active-text="私密"
								inactive-text="公开">
							</el-switch>
						</el-form-item>
						<el-form-item>
							<template>
								<el-radio v-model="form.source" :label="1">原创</el-radio>
								<el-radio v-model="form.source" :label="2">转载</el-radio>
							</template>
						</el-form-item>
						<el-form-item v-if="form.source === 2">
							<el-input placeholder="转载出处url" v-model="form.sourceUrl"></el-input>
						</el-form-item>
					</el-form>
					<div class="form-option">
						<el-button type="primary" @click="save" :loading="loading.global" round>
							<template v-if="form.id">点我更新</template>
							<template v-else>点我发布</template>
						</el-button>
					</div>
				</div>
				<div class="preview-panel full-height">
					<div class="pp-mb-pp-row title"><span class="text-ellipsis">{{form.title}}</span></div>
					<div class="pp-mb-pp-row summary">
						<label-content class="full-width" label="概要" :content="form.summary" type="vertical"></label-content>
					</div>
					<div class="pp-mb-pp-row">
						<label-content class="full-width" label="标签" type="vertical">
							<div slot="content">
								<so-tag v-for="(tag, index) in previewTags" :key="index" :name="tag"></so-tag>
							</div>
						</label-content>
					</div>
					<div class="pp-mb-pp-row">
						<label-content class="full-width" label="专栏" type="vertical">
							<div slot="content" class="collection">
								<el-image v-if='collection.coverUrl' :src="collection.coverUrl" fit="cover" class="collection-cover full"></el-image>
								<div class="collection-name full">{{collection.name || "默认"}}</div>
							</div>
						</label-content>
					</div>
					<div class="pp-mb-pp-row privacy">
						<label-content class="full-width" label="是否公开" type="vertical">
							<template slot="content">
								<div class="content" v-if="form.privacy"><i class="icon-ios-eye-off reprinted"></i>私密</div>
								<div class="content" v-else><i class="icon-ios-eye origin"></i>公开</div>
							</template>
						</label-content>
					</div>
					<div class="pp-mb-pp-row source">
						<label-content class="full-width" label="文章来源" type="vertical">
							<template slot="content">
								<div class="content" v-if="form.source === 1"><i class="icon-ios-bulb origin"></i>沉洋原创</div>
								<div class="content" v-else>
									<i class="icon-ios-quote reprinted"></i>
									<span class="text-ellipsis">转自 <a :href="form.sourceUrl">{{form.sourceUrl}}</a></span>
								</div>
							</template>
						</label-content>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import 'mavon-editor/dist/css/index.css';
import DateUtil from '../../../../../../utils/date.js';
import Util from '../../../../../../utils/util.js';
import { saveArticle, getArticle, searchCollection } from '../../../../../service/postService';
import { uploadImg } from '../../../../../service/imgService';
import { mavonEditor } from 'mavon-editor';
import SoEditableLabel from '../../../../../components/base/SoEditableLabel';
import LabelContent from '../../../../../components/layout/LabelContent';
import SoTag from '../../../../../components/base/SoTag';
const TagInput = () => import('./component/TagInput');


export default {
	name: 'post-page',
	data () {
		return {
			dialShowing: false,
			loading: {
				global: false,
				article: false
			},
			form: {
				id: '',
				title: '',
				summary: '',
				content: '',
				tags: '',
				coverImg: '',
				collection: '架构师之路',
				privacy: false,
				source: 1,
				sourceUrl: ''
			},
			tags: [],
			collection: {
				name: ''
			},
			inputVisible: false,
			inputValue: '',
			timeTaskId: '',
			toolbars: {
				bold: true, // 粗体
				italic: true, // 斜体
				header: true, // 标题
				underline: true, // 下划线
				strikethrough: true, // 中划线
				mark: true, // 标记
				superscript: true, // 上角标
				subscript: true, // 下角标
				quote: true, // 引用
				ol: true, // 有序列表
				ul: true, // 无序列表
				link: true, // 链接
				imagelink: true, // 图片链接
				code: true, // code
				table: true, // 表格
				fullscreen: true, // 全屏编辑
				readmodel: true, // 沉浸式阅读
				htmlcode: true, // 展示html源码
				help: true, // 帮助
				/* 1.3.5 */
				undo: true, // 上一步
				redo: true, // 下一步
				trash: true, // 清空
				/* 1.4.2 */
				navigation: true, // 导航目录
				/* 2.1.8 */
				alignleft: true, // 左对齐
				aligncenter: true, // 居中
				alignright: true, // 右对齐
				/* 2.2.1 */
				subfield: true, // 单双栏模式
				preview: true // 预览
			},
			imgUrlConvertMap: {}
		};
	},
	components: {
		SoTag,
		LabelContent,
		SoEditableLabel,
		TagInput,
		mavonEditor
	},
	computed: {
		previewTags: function () {
			return this.form.tags.split(',');
		}
	},
	mounted () {
		let self = this;
		if (this.$route.params.id) {
			let editorParams = {
				id: this.$route.params.id.split('=')[1]
			};
			self.loading.article = true;
			getArticle(editorParams)
				.then(data => {
					self.loading.article = false;
					let article = data.result;
					self.form.id = editorParams.id;
					self.form.title = article.title;
					self.form.summary = article.summary;
					article.tags && (self.form.tags = article.tags);
					article.coverImg && (self.form.coverImg = article.coverImg);
					self.form.content = Util.imgUrlRectify(article.content);
				})
				.finally(() => {
					self.loading.article = false;
				});
		} else {
			if (sessionStorage.getItem('title')) {
				self.form.title = sessionStorage.getItem('title');
			}
			if (sessionStorage.getItem('article')) {
				self.form.content = sessionStorage.getItem('article');
			}
			if (sessionStorage.getItem('summary')) {
				self.form.summary = sessionStorage.getItem('summary');
			}
			if (sessionStorage.getItem('tags')) {
				self.form.tags = sessionStorage.getItem('tags');
			}
			if (sessionStorage.getItem('coverImg')) {
				self.form.coverImg = sessionStorage.getItem('coverImg');
			}
			if (sessionStorage.getItem('imgConvertMap')) {
				self.imgUrlConvertMap = JSON.parse(sessionStorage.getItem('imgConvertMap'));
			}
		}
		self.timeTaskId = window.setInterval(() => {
			if (self.form.content && self.form.content != '') {
				sessionStorage.setItem('imgConvertMap', JSON.stringify(self.imgUrlConvertMap));
				sessionStorage.setItem('article', self.form.content);
				sessionStorage.setItem('title', self.form.title);
				sessionStorage.setItem('summary', self.form.summary);
				sessionStorage.setItem('tags', self.form.tags);
				sessionStorage.setItem('coverImg', self.form.coverImg);
			}
		}, 100);

		// 标签刷新或关闭提醒
		window.onbeforeunload = function (e) {
			if (self.$route.fullPath.indexOf('/sys/post') === 0) {
				return false;
			}
		};
	},
	destroyed () {
		window.clearInterval(this.timeTaskId);
	},
	methods: {
		save () {
			let self = this;
			if (!this.form.title || this.form.title == '') {
				return;
			}
			let params = {
				title: this.form.title,
				content: Util.imgUrlRectifyFallback(this.form.content),
				summary: this.form.summary,
				coverImg: this.form.coverImg,
				contentImg: Util.imgUrlRectifyFallback(Object.keys(this.imgUrlConvertMap).join(',')),
				collection: this.collection.id,
				privacy: this.form.privacy ? '1' : '0',
				source: this.form.source === 1 ? '原创' : this.form.sourceUrl,
				tags: this.form.tags,
				date: DateUtil.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
			};
			if (this.$route.params.id) {
				params.id = this.$route.params.id.split('=')[1];
			}
			self.loading.global = true;
			saveArticle(params)
				.then(data => {
					if (data.status === 200) {
						self.$message.success('保存成功');
						let route = '';
						if (!self.form.id) {
							route = 'post/';
						}
						route += `${params.title}=${data.result}`;
						self.form.id = data.result;
						this.$router.push(route);
					} else {
						self.$notify.error('服务器内部异常: ' + data.message);
					}
				})
				.catch(e => {
					self.$message.error('页面出错: ' + e.message);
				})
				.finally(() => {
					self.loading.global = false;
					self.dialShowing = false;
				});
		},
		addImg (pos, file) {
			let params = {
				imgOfBase64: file.miniurl,
				alias: `《${this.form.title || '未命名博文'}》内容-${pos}`,
				describeInfo: `文章内容:《${this.form.title || '未命名博文'}》`
			};
			uploadImg(params)
				.then(data => {
					let rectifyUrl = Util.imgUrlRectify(data.url);
					this.imgUrlConvertMap[rectifyUrl] = data.url;
					this.$refs['editorRef'].$img2Url(pos, rectifyUrl);
				})
				.catch(e => {
					console.error(e);
					this.$message.error('上传图片失败!');
				});
		},
		delImg (pos) {
			console.log(pos);
		},
		tagChange (tags) {
			this.form.tags = tags.join(',');
		},
		goBack () {
			this.$router.replace('/sys/dash');
		},
		collectionSearch (queryString, cb) {
			if (queryString) {
				let params = {
					collectionKeyword: queryString
				};
				searchCollection(params).then(data => {
					let collections = data.resultList;
					cb(collections);
				});
			}
		},
		collectionSelected (item) {
			this.collection = JSON.parse(JSON.stringify(item));
			this.form.collection = item.id;
		}
	}
};
</script>

<style lang="scss">
.post-page {
	position: absolute;
	top: 0;
	background: white;
	height: 100%;
	padding: 0 10px 10px;
	.pp-frame {
		.pp-title {
			height: 60px;
			font-size: 24px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f5f5f5;
		}
		.pp-article-editor {
			box-shadow: unset !important;
			height: calc(100% - 60px);
		}
		.so-editable-label {
			min-width: 250px;
			width: 500px;
			.edit-box .el-input__inner {
				text-align: left;
				padding: unset;
			}
		}
	}

	.float-button {
		position: absolute;
		bottom: 50px;
		right: 50px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: #1a48cb;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

		&:hover {
			background: #5d82ed;
		}

		&:active {
			background: #1a48cb;
		}

		i {
			font-size: 48px;
			color: white;
			font-weight: bold;
		}
	}

	.modal-box {
		height: 700px;
		.form-panel {
			width: calc(100% - 300px);
			float: left;
			.form-header {
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 18px;
				&:before {
					content: '#';
					margin-right: 10px;
					text-align: center;
					color: green;
					font-weight: bolder;
				}
			}
			.form-style {
				height: calc(100% - 60px - 80px);
				padding: 0px 40px;
				overflow: auto;

				.post-tag {
					cursor: pointer;
					margin-right: 5px;
					margin-bottom: 5px;

					&.selected {
						background: #409eff;
						color: white;
					}
				}
			}
			.form-option {
				height: 80px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.preview-panel {
			width: 300px;
			float: left;
			background: #fbfbfb;
			padding: 10px 20px;
			.pp-mb-pp-row {
				width: 100%;
				.label {

				}
			}
			.title {
				display: flex;
				align-items: center;
				height: 60px;
				font-size: 20px;
				font-weight: bold;
				justify-content: center;
				&:before {
					content: '#';
					margin-right: 10px;
					text-align: center;
					color: green;
					font-weight: bolder;
				}
			}
			.collection {
				width: 160px;
				height: 200px;
				border-radius: 4px;
				position: relative;
				background: bisque;
				box-shadow: 6px 6px 6px 0px #aaa;
				.collection-cover {
					border-radius: 4px;
					filter: brightness(.6);
				}
				.collection-name {
					color: white;
					font-size: 20px;
					padding: 40px 10px 0;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					position: absolute;
					top: 0;
					text-shadow: 0 0 4px black;
				}
			}
			.privacy {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				i {
					font-size: 24px;
					margin-right: 6px;
					&.origin {
						color: #13ce66;
					}
					&.reprinted {
						color: #c6c8ce;
					}
				}
			}
			.source {
				.content {
					width: 100%;
					display: flex;
					align-items: center;
				}
				i {
					font-size: 24px;
					margin-right: 6px;
					&.origin {
						color: #13ce66;
					}
					&.reprinted {
						color: #c6c8ce;
					}
				}
			}
		}
	}

	.custom-toolbar {
		height: 60px;
		line-height: 60px;
		width: 100%;

		.title-box {
			padding: 0 10px;

			.input-title {
				float: left;
				width: 400px;
			}

			.tag-popover {
				height: 100%;
				display: flex;
				align-items: center;

				.tag-popover-btn {
					float: left;
					margin-left: 10px;
				}
			}
		}
	}

	.article-editor {
		height: 100%;
	}
}
</style>

<style lang="scss">
.tag-popover-popper {
	.tags-box {
		height: 400px;
		overflow: auto;

		.post-tag {
			cursor: pointer;
			margin: 0 5px 5px;
			width: 80px;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&.selected {
				background: #409eff;
				color: white;
			}
		}

		.button-new-tag {
			margin-right: 10px;
			height: 32px;
			line-height: 30px;
			padding-top: 0;
			padding-bottom: 0;
		}

		.input-new-tag {
			width: auto;
			margin-right: 10px;
			vertical-align: bottom;
		}
	}
}
.post-page {
	.pp-frame .pp-title .el-page-header__content {
	}
}
</style>
