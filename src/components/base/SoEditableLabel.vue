<template>
	<div class="so-editable-label" v-click-outside="() => editing = false" @click="editStatusChange(true)">
		<div class="label-box" :class="{'disabled': disabled}" v-show="!editing" title="点击修改">{{value || placeholder}}</div>
		<div class="edit-box" v-show="editing && !disabled">
			<el-input ref='labelInputRef' v-model="val" :placeholder="placeholder" :autofocus="true" @input="inputChange">
			</el-input>
			<el-button type="text" title="取消"></el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SoEditableLabel',
	props: {
		value: {
			type: String,
			default: '未命名'
		},
		placeholder: {
			type: String,
			default: '请输入'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			editing: false,
			val: ''
		};
	},
	mounted () {
		this.$nextTick(() => {
			this.val = this.value;
		});
	},
	watch: {
		value: function () {
			this.val = this.value;
		}
	},
	methods: {
		editStatusChange (status) {
			if (this.disabled) return;
			this.editing = status;
			if (status) {
				setTimeout(() => {
					this.$refs.labelInputRef.focus();
				}, 300);
			}
		},
		inputChange (input) {
			this.$emit('input', input);
		}
	}
};
</script>

<style lang="scss" scoped>
.so-editable-label {
	display: flex;
	align-items: center;
	height: 100%;
	.label-box {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		cursor: text;
		&.disabled {
			color: #bcbbc2;
			cursor: not-allowed;
		}
	}
	.edit-box {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;

		/deep/ .el-input__inner {
			height: 100%;
			width: 100%;
			text-align: center;
			background: unset;
			letter-spacing: unset;
		}

		/deep/ .el-input {
			height: 100%;
			font-size: inherit;
		}

		@keyframes twinkle {
			from {
				border-color: #483d8bff;
			}

			65% {
				border-color: #483d8b00;
			}

			to {
				border-color: #483d8bff;
			}
		}
	}
}
</style>
