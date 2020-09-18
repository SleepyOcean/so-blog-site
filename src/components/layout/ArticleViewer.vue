<template>
	<div class='article-viewer mavon-style'>
		<mavon-editor ishljs
		ref='quillEditorRef'
		class='full'
		:toolbarsFlag='false'
		:editable='false'
		:subfield='false'
		:boxShadow='false'
		defaultOpen='preview'
		v-model='articleContent' />
	</div>
</template>

<script>
import 'mavon-editor/dist/css/index.css';
import { mavonEditor } from 'mavon-editor';
import Util from '../../../utils/util';

export default {
	name: 'ArticleViewer',
	components: {
		mavonEditor
	},
	props: {
		content: {
			type: String
		}
	},
	data () {
		return {
			articleContent: ''
		};
	},
	mounted () {
		this.content && (this.articleContent = Util.imgUrlRectify(this.content));
	},
	watch: {
		content: function (newVal, oldVal) {
			this.articleContent = Util.imgUrlRectify(newVal);
		}
	}
};
</script>

<style lang="scss" scoped>
.article-viewer {
	text-align: center;
	background-color: transparent;
	display: inline-block;
	vertical-align: bottom;
}
</style>

<style lang="scss">
.article-viewer {
	.v-note-wrapper .v-note-panel .v-note-navigation-wrapper {
		position: fixed;
		right: calc(20% + 30px);
		top: 480px;
		bottom: unset;
		border: unset;
		background: unset;
		.v-note-navigation-title {
			i {
				display: none;
			}
		}
	}

	&.mavon-style .markdown-body .v-note-navigation-wrapper {
		h1 {
			background: transparent;
		}
	}
}
</style>
