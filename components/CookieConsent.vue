<template>
	<div>
		<transition name="cookie-consent-transition" appear>
			<div :class="'cookie-consent cookie-consent--'+position" v-if="show">
				<div class="cookie-consent__bg"></div>
				<div class="cookie-consent__dialogue">
					<img src="~assets/images/other/cookie.png" alt="Cookies" title="Cookies" with="200" height="198" class="cookie-consent__cookie">
					<div>
						<p><strong>Cookies help us improve your experience on our website.</strong> Is this okay? For more information, see our <nuxt-link :to="privacyPolicyPath" class="nowrap">privacy policy</nuxt-link></p>
					</div>
					<div>
						<v-button weight="primary" @click.native="acceptCookieConsent">Sure, I love cookies</v-button>
						<v-button v-if="declineAllowed" weight="tertiary" @click.native="declineCookieConsent">No cookies for me</v-button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				show:false
			}
		},
		mounted() {
			const ctx = this;
			if (process.client) {
				if (ctx.isCookieConsentAccepted) {
					this.show = false;
					this.allowTracking();
				} else {
					this.show = true;
				}
			}
		},
		props: {
			position: {
				type:String,
				required:false,
				default:'bottom-left'
			},
			privacyPolicyPath: {
				required:false,
				type:String,
				default:'/legal/privacy-policy'
			},
			declineAllowed: {
				required:false,
				type:Boolean,
				default:false
			}
		},
		methods: {
			acceptCookieConsent() {
				localStorage.setItem('cookieConsentAccepted', true);
				this.show = false;
				this.allowTracking();
			},
			declineCookieConsent() {
				localStorage.setItem('cookieConsentAccepted', false);
				this.show = false;
			},
			showCookieConsent() {
				this.show = true;
			},
			allowTracking() {
				// for this to work, you must have nuxt-community/gtm-module installed but with autoInit set to false in nuxt.config https://github.com/nuxt-community/gtm-module
				this.$gtm.init();
			}
		},
		computed: {
			isCookieConsentAccepted() {
				const storedAccept = localStorage.getItem('cookieConsentAccepted');
				let isAccepted = false;
				console.log('Cookie Consent: '+storedAccept);
				if (storedAccept === 'true' || storedAccept === true) {
					isAccepted = true;
				}
				return isAccepted;
			}
		}
	}

</script>

<style lang="scss">
	.cookie-consent {
		position:fixed;
		z-index: 200;
		bottom:0;
		left:0;
		width:100%;
		height:100%;
		display:flex;
		align-items: center;
		justify-content: center;
		pointer-events:none;
		&__bg {
			display:block;
			position:absolute;
			top:0; left:0; width:100%; height:100%;
			background-color:rgba(0,0,0,0.5);
			pointer-events:none;
		}
		&__dialogue {
			position:relative;
			background-color:white;
			text-align:center;
			padding:vr(1) vr(1) 0 vr(1);
			margin:vr(1);
			max-width:300px;
			pointer-events:all;

		}
		&__cookie {
			margin:0 auto vr(1) auto;
			display:block;
			width:vr(3);
		}
		&--top-left {
			@include breakpoint(lg) {
				align-items: flex-start;
				justify-content: flex-start;
			}
		}
		&--top-right {
			@include breakpoint(lg) {
				align-items: flex-start;
				justify-content: flex-end;
			}
		}
		&--bottom-left {
			@include breakpoint(lg) {
				align-items: flex-end;
				justify-content: flex-start;
			}
		}
		&--bottom-right {
			@include breakpoint(lg) {
				align-items: flex-end;
				justify-content: flex-end;
			}
		}
	}

	.cookie-consent-transition-enter-active {
		transition:all 0.5s $ease-in-out-expo;
		.cookie-consent__bg {
			transition:0.5s $ease-in-out-expo;
		}
		.cookie-consent__dialogue {
			transition:0.2s $elastic 0.2s;
		}
	}

	.cookie-consent-transition-leave-active {
		transition:all 0.5s $ease-in-out-expo;
		.cookie-consent__bg {
			transition:0.5s $ease-in-out-expo;
		}
		.cookie-consent__dialogue {
			transition:0.2s $elastic;
		}
	}

	.cookie-consent-transition-enter, .cookie-consent-transition-leave-to {
		.cookie-consent__bg {
			opacity:0;
		}
		.cookie-consent__dialogue {
			opacity:0;
			transform:scale(0.9);
		}
	}

</style>