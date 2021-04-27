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
    padding:0 vr(1);
    max-width:$max-width-sm;
    @include breakpoint(xl) {
      max-width:$max-width-md;
    }
    @include breakpoint(xxl) {
      max-width:$max-width-lg;
    }
    @include breakpoint(xxxl) {
      max-width:$max-width-xl;
    }
  }


  .container-fluid {
    padding-right: vr(2);
    padding-left: vr(2);
  }

  @include breakpoint(lg) {
  .container--doublePadding {
    padding:0 vr(2);
    .row {
      margin-right: vr(0.5);
      margin-left: vr(0.5);
      max-width:calc(var(--baseline) * 2 + 100%);
    }
    .col-* { 
      padding-right: vr(1) !important;
      padding-left: vr(1) !important;
    }
  }
}
</style>
