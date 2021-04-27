import Vue from "vue";

if (!Vue.globalMixin) {
	Vue.globalMixin = true
	
	Vue.mixin({
		methods: {
			svgPlaceholder(width,height) {
				const widthNumber = parseInt(width, 10);;
				const heightNumber = parseInt(height, 10);;
				return 'https://placeholder.pics/svg/'+widthNumber+'x'+heightNumber+'/F4F8FA/F4F8FA'
			},
			getOrientation(width, height) {
		      let orientation = 'square';
		      if (height > width) {
		        orientation = 'portrait';
		      } else if (height < width) {
		      	orientation = 'landscape';
		      }
		      this.$emit('orientation', orientation)
		      return orientation
		    }
		}
	})
}