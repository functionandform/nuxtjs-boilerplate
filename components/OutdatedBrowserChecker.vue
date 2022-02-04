<template>
  <div>
    
    <div class="outdated-browser-display" v-if="outdatedBrowser">
        <!--googleoff: all-->
          <div class="outdated-browser">
            <div class="outdated-browser__banner">
              <h3 class="align-center">
                Sorry, your browser is too old to support our website
              </h3>
              <p class="align-center">
                Some things get better with age, but not browsers. Using an old browser can leave you and your data at risk as well as prevent you from experiencing the best of the modern web. To use our website, we'd recommend switching to, or upgrading one of the following:
              </p>
              <container>
                <row centerXs>
                  <column xxs="6" sm="3" lg="2" class="align-center">
                    <a href="https://www.google.com/chrome" target="_blank" title="Chrome" class="outdated-browser__link">
                      <!-- <img src="~/assets/images/browsers/chrome.png" alt="Chrome" class="responsive-image browser__logo" loading="lazy"> -->
                      Switch to Chrome
                    </a>
                  </column>
                  <column xxs="6" sm="3" lg="2" class="align-center">
                    <a href="https://support.apple.com/safari" target="_blank" title="Safari" class="outdated-browser__link">
                      <!-- <img src="~/assets/images/browsers/safari.png" alt="Safari" class="responsive-image browser__logo" loading="lazy"> -->
                      Switch to Safari
                    </a>
                  </column>
                  <column xxs="6" sm="3" lg="2" class="align-center">
                    <a href="https://www.mozilla.org/en-US/firefox/new" target="_blank" title="Firefox" class="outdated-browser__link">
                      <!-- <img src="~/assets/images/browsers/firefox.png" alt="Firefox" class="responsive-image browser__logo" loading="lazy"> -->
                      Switch to Firefox
                    </a>
                  </column>
                  </column>
                  <column xxs="6" sm="3" lg="2" class="align-center">
                    <a href="https://www.microsoft.com/en-us/edge/" target="_blank" title="Edge" class="outdated-browser__link">
                      <!-- <img src="~/assets/images/browsers/edge.png" alt="Edge" class="responsive-image browser__logo" loading="lazy"> -->
                      Switch to Edge
                    </a>
                  </column>
                </row>
              </container>
            </div>
          </div>
        <!--googleon: all-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outdatedBrowser: true,
    };
  },
  mounted() {
    // this solution didn't work because some browsers are so old even Vue JS methods don't work properly. So we now always return the message in the dom but set it to display none depending on css @support checks.
    //this.isBrowserOutdated();
  },

  methods: {
    isBrowserOutdated() {
      const ctx = this;
      let outdated = true;
      if (CSS.supports("display", "flex") && CSS.supports("color", "var(--fake-var)") && CSS.supports("object-fit", "contain")) {
        outdated = false;
      }
      if (outdated) {
        ctx.outdatedBrowser = true;
        ctx.lockBody();
      } else {
        ctx.releaseBody();
        ctx.outdatedBrowser = false;
      }
    },
    lockBody() {
      const body = document.querySelector("body");
      body.classList.add("modal-open");
    },
    releaseBody() {
      const body = document.querySelector("body");
      body.classList.remove("modal-open");
    },
  },
};
</script>

<style lang="scss">
  .outdated-browser-display {
    display:block;
  }
  @supports (display: flex) and (object-fit:contain) and (display:grid) {
    .outdated-browser-display {
      display:none;
    }
  }

  .browser {
    display:block;
    &__logo {
      max-width:100px;
      margin:0 auto 24px auto;
    }
    &__label {
      font-size:16px;
      line-height:24px;
      text-align:center;
      display:block;
      margin:0 auto 24px auto;
    }
  }
  .outdated-browser {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &__link {
      
    }
    &__banner {
      width: 100%;
      padding: vr(1);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h3, p {
        max-width:500px;
        margin:0 auto 24px auto;
        color:$black;
        color:var(--contrast);
      }
    }
  }


</style>