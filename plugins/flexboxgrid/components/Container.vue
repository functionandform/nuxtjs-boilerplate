<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hero: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    overflowScrollLessThan: { type:String }
  },
  computed: {
    classes () {
      let c = this.fluid ? 'container-fluid ' : 'container '
      c += this.hero ? 'hero' : ''
      c += this.overflowScrollLessThan ? ' overflow-scroll-less-than-' + this.overflowScrollLessThan : ''
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

.container {
  &.overflow-scroll-less-than-lg {
      @include breakpoint-less-than(lg) {
        overflow:hidden;
        padding:0;
        & > .row {
          width:100%;
          margin:0;
          flex-wrap:nowrap;
          scroll-snap-type:x mandatory;
          overflow:hidden;
          overflow-x:scroll;
          & > div[class^='col-'], & > div[class*=' col-'] { 
            scroll-snap-align:start;
            transform:none !important;
            flex:0 0 auto;
            margin-right:0;
            padding-right:0;
            padding-left:vr(1);
            &:last-child {
              margin-right:vr(1);
            }
          }
          & > .col-xxs-1 {
            flex-basis: 8.33333333vw;
            max-width: 8.33333333vw;
          }

          & > .col-xxs-2 {
            flex-basis: 16.66666667vw;
            max-width: 16.66666667vw;
          }

          & > .col-xxs-3 {
            -ms-flex-preferred-size: 25vw;
            flex-basis: 25vw;
            max-width: 25vw;
          }

          & > .col-xxs-4 {
            flex-basis: 33.33333333vw;
            max-width: 33.33333333vw;
          }

          & > .col-xxs-5 {
            flex-basis: 41.66666667vw;
            max-width: 41.66666667vw;
          }

          & > .col-xxs-6 {
            flex-basis: 50vw;
            max-width: 50vw;
          }

          & > .col-xxs-7 {
            flex-basis: 58.33333333vw;
            max-width: 58.33333333vw;
          }

          & > .col-xxs-8 {
            flex-basis: 66.66666667vw;
            max-width: 66.66666667vw;
          }

          & > .col-xxs-9 {
            flex-basis: 75vw;
            max-width: 75vw;
          }

          & > .col-xxs-10 {
            flex-basis: 83.33333333vw;
            max-width: 83.33333333vw;
          }

          & > .col-xxs-11 {
            flex-basis: 91.66666667vw;
            max-width: 91.66666667vw;
          }

          & > .col-xxs-12 {
            flex-basis: 100vw;
            max-width: 100vw;
          }
        }
      }
    }
    &.overflow-scroll-less-than-md {
      @include breakpoint-less-than(md) {
        overflow:hidden;
        padding:0;
        & > .row {
          width:100%;
          margin:0;
          flex-wrap:nowrap;
          scroll-snap-type:x mandatory;
          overflow:hidden;
          overflow-x:scroll;
          & > div[class^='col-'], & > div[class*=' col-'] { 
            scroll-snap-align:start;
            flex:0 0 auto;
            margin-right:0;
            transform:none !important;
            padding-right:0;
            padding-left:vr(1);
            &:last-child {
              margin-right:vr(1);
            }
          }
          & > .col-xxs-1 {
            flex-basis: 8.33333333vw;
            max-width: 8.33333333vw;
          }

          & > .col-xxs-2 {
            flex-basis: 16.66666667vw;
            max-width: 16.66666667vw;
          }

          & > .col-xxs-3 {
            -ms-flex-preferred-size: 25vw;
            flex-basis: 25vw;
            max-width: 25vw;
          }

          & > .col-xxs-4 {
            flex-basis: 33.33333333vw;
            max-width: 33.33333333vw;
          }

          & > .col-xxs-5 {
            flex-basis: 41.66666667vw;
            max-width: 41.66666667vw;
          }

          & > .col-xxs-6 {
            flex-basis: 50vw;
            max-width: 50vw;
          }

          & > .col-xxs-7 {
            flex-basis: 58.33333333vw;
            max-width: 58.33333333vw;
          }

          & > .col-xxs-8 {
            flex-basis: 66.66666667vw;
            max-width: 66.66666667vw;
          }

          & > .col-xxs-9 {
            flex-basis: 75vw;
            max-width: 75vw;
          }

          & > .col-xxs-10 {
            flex-basis: 83.33333333vw;
            max-width: 83.33333333vw;
          }

          & > .col-xxs-11 {
            flex-basis: 91.66666667vw;
            max-width: 91.66666667vw;
          }

          & > .col-xxs-12 {
            flex-basis: 100vw;
            max-width: 100vw;
          }
        }
      }
    }
  }
</style>
