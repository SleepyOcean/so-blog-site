<template>
	<div class="tag-input">
		<el-autocomplete
				v-model="selectedTag"
				:fetch-suggestions="querySearch"
				placeholder="输入标签"
				:trigger-on-focus="false"
				@select="handleSelect"
				@keypress.enter.native="handleEnter"
		></el-autocomplete>
		<div class="ti-tag-group">
			<so-tag class="ti-tag" v-for="(tag, index) in selectedTags" :key="index" :name="tag" @close="handleDelete(index)" show-close></so-tag>
		</div>
	</div>
</template>

<script>
import SoTag from '../../../../../../components/base/SoTag';
import {getTags} from '../../../../../../service/postService';
export default {
	name: 'TagInput',
	components: {SoTag},
	data () {
		return {
			selectedTag: '',
			selectedTags: []
		};
	},
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	mounted () {
		if (this.value) {
			this.selectedTags = this.value.split(',');
		}
	},
	methods: {
		querySearch (queryString, cb) {
			let params = {
				keyword: queryString
			};
			getTags(params).then(data => {
				if (data.status === 200) {
					let result = data.resultList.map(tag => {
						return {
							value: tag
						};
					});
					cb(result);
				} else {
					this.$message(`搜索tag失败，${data.message}`);
				}
			});
		},
		handleSelect (item) {
			if (this.selectedTags.length < 4) {
				if (this.selectedTags.indexOf(item.value) < 0) {
					this.selectedTags.push(item.value);
					this.$emit('tagChange', this.selectedTags);
				}
			} else {
				this.$message('tag最多选择4个');
			}
			this.selectedTag = '';
		},
		handleEnter () {
			if (this.selectedTags.length < 4) {
				if (this.selectedTags.indexOf(this.selectedTag) < 0) {
					this.selectedTags.push(this.selectedTag);
					this.$emit('tagChange', this.selectedTags);
				}
			} else {
				this.$message('tag最多选择4个');
			}
			this.selectedTag = '';
		},
		handleDelete (index) {
			this.selectedTags.splice(index, 1);
			this.$emit('tagChange', this.selectedTags);
		}
	}
};
</script>

<style lang="scss">
.tag-input {
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	.ti-tag-group {
		height: 40px;
		display: flex;
		align-items: center;
		.ti-tag {
			max-width: 160px;
		}
	}
}
</style>
