<template>
	<article-viewer class="about-page" :content="aboutContent"></article-viewer>
</template>

<script>
import ArticleViewer from '../../components/layout/ArticleViewer';
import CommonContent from '../../../static/common-cotent.json';
export default {
	name: 'AboutPage',
	components: {ArticleViewer},
	data () {
		return {
			aboutContent: ''
		};
	},
	mounted () {
		this.aboutContent = CommonContent.about;
	}
};
</script>

<style lang="scss">
.about-page {
	max-width: 900px;
}
</style>
