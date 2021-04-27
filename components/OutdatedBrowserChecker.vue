<template>
  <div>
    <client-only>
      <div class="outdated-browser" v-if="outdatedBrowser">
        <div class="outdated-browser__banner">
          <h3 class="align-center">
            Sorry, your browser is too old to support our website
          </h3>
          <p class="align-center">
            Some things get better with age, but not browsers. Using an old browser can leave you and your data at risk as well as prevent you from experiencing the best of the modern web. To use our website, we'd recommend switching to one of the following:
          </p>
          <container>
            <row centerXs>
              <column xxs="6" sm="3" lg="2">
                <a href="https://www.google.com/chrome" target="_blank" title="Chrome" class="browser">
                  <img src="~/assets/images/browsers/chrome.png" alt="Chrome" class="responsive-image browser__logo">
                  <span class="browser__label">Switch to Chrome</span>
                </a>
              </column>
              <column xxs="6" sm="3" lg="2">
                <a href="https://support.apple.com/safari" target="_blank" title="Safari" class="browser">
                  <img src="~/assets/images/browsers/safari.png" alt="Safari" class="responsive-image browser__logo">
                  <span class="browser__label">Switch to Safari<br>(Mac users only)</span>
                </a>
              </column>
              <column xxs="6" sm="3" lg="2">
                <a href="https://www.mozilla.org/en-US/firefox/new" target="_blank" title="Firefox" class="browser">
                  <img src="~/assets/images/browsers/firefox.png" alt="Firefox" class="responsive-image browser__logo">
                  <span class="browser__label">Switch to Firefox</span>
                </a>
              </column>
              <column xxs="6" sm="3" lg="2">
                <a href="https://www.microsoft.com/en-us/edge/" target="_blank" title="Edge" class="browser">
                  <img src="~/assets/images/browsers/edge.png" alt="Edge" class="responsive-image browser__logo">
                  <span class="browser__label">Switch to Edge</span>
                </a>
              </column>
            </row>
          </container>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outdatedBrowser: false,
    };
  },
  mounted() {
    this.isBrowserOutdated();
  },
  methods: {
    isBrowserOutdated() {
      const ctx = this;
      let outdated = false;
      if (!CSS.supports("display", "grid")) {
        console.log("Your browser does not support CSS Grid");
        outdated = true;
      } else if (!CSS.supports("display", "flex")) {
        console.log("Your browser does not support CSS Flexbox");
        outdated = true;
      } else if (!CSS.supports("color", "var(--fake-var)")) {
        console.log("Your browser does not support CSS Variables");
        outdated = true;
      } else if (!CSS.supports("object-fit", "contain")) {
        console.log("Your browser does not support object fit");
        outdated = true;
      }
      if (outdated) {
        ctx.outdatedBrowser = true;
        ctx.lockBody();
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

<style lang="scss" scoped>
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
  background-color: $white;
  width: 100%;
  height: 100%;
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
    }
  }
}
</style>