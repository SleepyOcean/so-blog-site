<template>
  <div class="so-frame">
    <slot></slot>
  </div>
</template>
<script>
export default {
	name: 'SoFrame'
};
</script>
<style>
::-webkit-scrollbar{width:0.3rem;}
::-webkit-scrollbar-track{background-color:#f5f7fa;}
::-webkit-scrollbar-thumb{background-color:#cccccc;}
::-webkit-scrollbar-thumb:hover {background-color:#cccccc}
::-webkit-scrollbar-thumb:active {background-color:#cccccc}
.so-frame{
  overflow: auto;
}
</style>