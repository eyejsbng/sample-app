<template>
	<div>
			<span :style="skeletonSize" class="skeleton-loader"></span>	
	</div>
</template>
<script>
export default {
	props:['width', 'height'],
	computed: {
		skeletonSize() {
				return {
					'--skeleton-width' : `${this.width}px`,
					'--skeleton-height' : `${this.height}px`,
				}
		}
	}
}
</script>
<style scoped>
.skeleton-loader {
  width: var(--skeleton-width);
  height: var(--skeleton-height);
  display: block;
	border-radius: 10px;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}

@keyframes shine {
  to {
    background-position: 100% 0;
  }
}
</style>