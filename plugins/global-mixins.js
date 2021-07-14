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