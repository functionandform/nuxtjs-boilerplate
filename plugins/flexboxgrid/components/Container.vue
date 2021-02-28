<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hero: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false }
  },
  computed: {
    classes () {
      let c = this.fluid ? 'container-fluid ' : 'container '
      c += this.hero ? 'hero' : ''
      return c
    }
  }
}
</script>

<style lang="scss">
  .container-fluid,
  .container {
    position:relative;
    margin-right: auto;
    margin-left: auto;
    width:100%;
    padding:0 $multiple;
    max-width:$max-width-sm;
    @include breakpoint(xl) {
      max-width:$max-width-md;
    }
    @include breakpoint(xxl) {
      max-width:$max-width-lg;
    }
  }


  .container-fluid {
    padding-right: $multiple * 2;
    padding-left: $multiple * 2;
  }

  @include breakpoint(lg) {
  .container--doublePadding {
    padding:0 ($multiple * 2);
    .row {
      margin-right: (-$multiple);
      margin-left: (-$multiple);
      max-width:calc(100% + #{$multiple * 2});
    }
    .col-* { 
      padding-right: $multiple !important;
      padding-left: $multiple !important;
    }
  }
}
</style>
