import Vue from "vue";
import { mapMutations } from 'vuex';

if (!Vue.globalMixin) {
	Vue.globalMixin = true
	
	Vue.mixin({
		data() {
			return {
				prevScrollTop:null
			}
		},
		methods: {
			...mapMutations([
		      'setIsTop',
		      'setIsBottom',
		      'setScrollDirection'
		    ]),
		    pushDataLayer(variables) {
				const ctx = this;
				if (window && window.dataLayer && variables) {
				  window.dataLayer.push(variables);
				}
			},
			applyScrollPosition(element) {
			    if (process.client) {
			    	var scrollTop = element.scrollTop || document.body.scrollTop || document.documentElement.scrollTop;
			    	var scrollHeight = element.scrollHeight || document.body.scrollHeight || document.documentElement.scrollHeight;
					const ctx = this;
					if (scrollTop < 5) {
					ctx.setIsTop(true);
					ctx.setIsBottom(false);
					} else if (scrollTop + window.innerHeight >= scrollHeight) {
					ctx.setIsTop(false);
					ctx.setIsBottom(true);
					} else {
					ctx.setIsTop(false);
					ctx.setIsBottom(false);
					}
					if (this.prevScrollTop === null) {
						ctx.setScrollDirection(null);
					} else if (scrollTop && scrollTop > 48 && scrollTop > this.prevScrollTop) {
						ctx.setScrollDirection('down')
					} else if (scrollTop < this.prevScrollTop) {
						ctx.setScrollDirection('up')
					} else {
						ctx.setScrollDirection(null);
					}
					ctx.prevScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
			  }
		    },
			svgPlaceholder(width,height) {
				if (width && height) {
					const widthNumber = parseInt(width, 10);
					const heightNumber = parseInt(height, 10);
					return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${widthNumber}' height='${heightNumber}'%3E%3C/svg%3E`
				}
			},
			readTime(content) {
		      let minutes = 0
		      if (content) {
			      const contentAsString = JSON.stringify(content)
			      const words = contentAsString.split(' ').length
			      const wordsPerMinute = 200
			      
			      minutes = Math.ceil(words / wordsPerMinute)
			  }
		      
		      return minutes
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
		    },
		    compileSeomatic(seomatic) {
		    	if (seomatic) {
			        // Stops JSON.parse() failing
			        delete seomatic["__typename"];

			        // Convert the graphql JSON data to an object so we can work with it
			        const {
			          metaTitleContainer,
			          metaTagContainer,
			          metaLinkContainer,
			          metaScriptContainer,
			          metaJsonLdContainer,
			          metaSiteVarsContainer,
			        } = Object.entries(seomatic).reduce((acc, [key, value]) => {
			          acc[key] = JSON.parse(value);
			          return acc;
			        }, {});

			        // Flattern metaTitleContainer to string
			        const title = metaTitleContainer.title.title;

			        // Flatten metaTagContainer values into string
			        const meta = metaTagContainer
			          ? Object.values(metaTagContainer).reduce((flat, next) => {
			              if (next.name === "description") {
			                // Override description tag with updated description
			                next.hid = "description";
			              }
			              return flat.concat(next);
			            }, [])
			          : null;

			        // Flatten metaLinkContainer values into string
			        const link = metaLinkContainer
			          ? Object.values(metaLinkContainer).reduce(
			              (flat, next) => flat.concat(next),
			              []
			            )
			          : null;

			        // Convert script data to script tags
			        const metaScripts = metaScriptContainer
			          ? Object.values(metaScriptContainer).map(({ script }) => ({
			              innerHTML: script,
			            }))
			          : [];

			        // Convert JsonLd to type="application/ld+json" script tag
			        const jsonLd = metaJsonLdContainer
			          ? Object.entries(metaJsonLdContainer).map((value) => ({
			              type: "application/ld+json",
			              innerHTML: JSON.stringify(value[1]),
			            }))
			          : [];
			        
			        // Convert metaSiteVars to type="application/ld+json" script tag
			        const metaSiteVars = metaSiteVarsContainer
			          ? Object.entries(metaSiteVarsContainer).map((value) => ({
			              type: "application/ld+json",
			              innerHTML: JSON.stringify(value[1]),
			            }))
			          : [];

			        // Combine processed script data
			        const script = [...metaScripts, ...jsonLd, ...metaSiteVars];

			        const rebuiltSeoData = {
			          ...(title && { title }),
			          ...(meta && { meta }),
			          ...(link && { link }),
			          script,
			          __dangerouslyDisableSanitizers: ["script"],
			        };

			        return rebuiltSeoData;
			    }
			    else {
			    	console.error('no seo data available')
			    	return null
			    }
		    }
		}
	})
}