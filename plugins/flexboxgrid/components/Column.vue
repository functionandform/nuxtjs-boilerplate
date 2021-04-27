<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    firstXxs: { type: Boolean, default: false },
    firstXs: { type: Boolean, default: false },
    lastXs: { type: Boolean, default: false },
    firstSm: { type: Boolean, default: false },
    lastSm: { type: Boolean, default: false },
    firstMd: { type: Boolean, default: false },
    lastMd: { type: Boolean, default: false },
    firstLg: { type: Boolean, default: false },
    lastLg: { type: Boolean, default: false },
    lastxl: { type: Boolean, default: false },
    lastxxl: { type: Boolean, default: false },
    xxsOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    xsOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    smOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    mdOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    lgOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    xlOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    xxlOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    xxs: { type: String, default: '12', validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    xs: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    sm: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    md: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    lg: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    xl: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
    xxl: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } }
  },
  computed: {
    classes () {
      let c = 'col'
      c += this.firstXxs ? ' first-xxs' : (this.lastXs ? ' last-xxs' : '')
      c += this.firstXs ? ' first-xs' : (this.lastXs ? ' last-xs' : '')
      c += this.firstSm ? ' first-sm' : (this.lastSm ? ' last-sm' : '')
      c += this.firstMd ? ' first-md' : (this.lastMd ? ' last-md' : '')
      c += this.firstLg ? ' first-lg' : (this.lastLg ? ' last-lg' : '')
      c += this.firstXl ? ' first-xl' : (this.lastLg ? ' last-xl' : '')
      c += this.firstXxl ? ' first-xxl' : (this.lastLg ? ' last-xxl' : '')
      c += this.xxsOffset ? ' col-xxs-offset-' + this.xxsOffset : ''
      c += this.xsOffset ? ' col-xs-offset-' + this.xsOffset : ''
      c += this.smOffset ? ' col-sm-offset-' + this.smOffset : ''
      c += this.mdOffset ? ' col-md-offset-' + this.mdOffset : ''
      c += this.lgOffset ? ' col-lg-offset-' + this.lgOffset : ''
      c += this.xlOffset ? ' col-xl-offset-' + this.xlOffset : ''
      c += this.xxlOffset ? ' col-xxl-offset-' + this.xxlOffset : ''
      c += this.xxs ? ' col-xxs-' + this.xxs : ''
      c += this.xs ? ' col-xs-' + this.xs : ''
      c += this.sm ? ' col-sm-' + this.sm : ''
      c += this.md ? ' col-md-' + this.md : ''
      c += this.lg ? ' col-lg-' + this.lg : ''
      c += this.xl ? ' col-xl-' + this.xl : ''
      c += this.xxl ? ' col-xxl-' + this.xxl : ''
      return c
    }
  }
}
</script>

<style lang="scss">

.col.reverse {
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  -ms-flex-direction: column-reverse;
  flex-direction: column-reverse;
}


div[class^='col-'], div[class*=' col-'] { 
  width:100%;
  padding-right: vr(0.5);
  padding-left: vr(0.5);
  //margin-right:0;
  //margin-left:0;
}



.col-xxs,
div[class^='col-xxs-'], div[class*=' col-xxs-'] {
  box-sizing: border-box;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

.col-xxs {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  max-width: 100%;
}

.col-xxs-1 {
  -ms-flex-preferred-size: 8.33333333%;
  flex-basis: 8.33333333%;
  max-width: 8.33333333%;
}

.col-xxs-2 {
  -ms-flex-preferred-size: 16.66666667%;
  flex-basis: 16.66666667%;
  max-width: 16.66666667%;
}

.col-xxs-3 {
  -ms-flex-preferred-size: 25%;
  flex-basis: 25%;
  max-width: 25%;
}

.col-xxs-4 {
  -ms-flex-preferred-size: 33.33333333%;
  flex-basis: 33.33333333%;
  max-width: 33.33333333%;
}

.col-xxs-5 {
  -ms-flex-preferred-size: 41.66666667%;
  flex-basis: 41.66666667%;
  max-width: 41.66666667%;
}

.col-xxs-6 {
  -ms-flex-preferred-size: 50%;
  flex-basis: 50%;
  max-width: 50%;
}

.col-xxs-7 {
  -ms-flex-preferred-size: 58.33333333%;
  flex-basis: 58.33333333%;
  max-width: 58.33333333%;
}

.col-xxs-8 {
  -ms-flex-preferred-size: 66.66666667%;
  flex-basis: 66.66666667%;
  max-width: 66.66666667%;
}

.col-xxs-9 {
  -ms-flex-preferred-size: 75%;
  flex-basis: 75%;
  max-width: 75%;
}

.col-xxs-10 {
  -ms-flex-preferred-size: 83.33333333%;
  flex-basis: 83.33333333%;
  max-width: 83.33333333%;
}

.col-xxs-11 {
  -ms-flex-preferred-size: 91.66666667%;
  flex-basis: 91.66666667%;
  max-width: 91.66666667%;
}

.col-xxs-12 {
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
  max-width: 100%;
}

.col-xxs-offset-0 {
  margin-left: 0;
}

.col-xxs-offset-1 {
  margin-left: 8.33333333%;
}

.col-xxs-offset-2 {
  margin-left: 16.66666667%;
}

.col-xxs-offset-3 {
  margin-left: 25%;
}

.col-xxs-offset-4 {
  margin-left: 33.33333333%;
}

.col-xxs-offset-5 {
  margin-left: 41.66666667%;
}

.col-xxs-offset-6 {
  margin-left: 50%;
}

.col-xxs-offset-7 {
  margin-left: 58.33333333%;
}

.col-xxs-offset-8 {
  margin-left: 66.66666667%;
}

.col-xxs-offset-9 {
  margin-left: 75%;
}

.col-xxs-offset-10 {
  margin-left: 83.33333333%;
}

.col-xxs-offset-11 {
  margin-left: 91.66666667%;
}

@include breakpoint(xs) {
  .col-xs,
  div[class^='col-xs-'], div[class*=' col-xs-'] {
    box-sizing: border-box;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }

  .col-xs {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .col-xs-1 {
    -ms-flex-preferred-size: 8.33333333%;
    flex-basis: 8.33333333%;
    max-width: 8.33333333%;
  }

  .col-xs-2 {
    -ms-flex-preferred-size: 16.66666667%;
    flex-basis: 16.66666667%;
    max-width: 16.66666667%;
  }

  .col-xs-3 {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .col-xs-4 {
    -ms-flex-preferred-size: 33.33333333%;
    flex-basis: 33.33333333%;
    max-width: 33.33333333%;
  }

  .col-xs-5 {
    -ms-flex-preferred-size: 41.66666667%;
    flex-basis: 41.66666667%;
    max-width: 41.66666667%;
  }

  .col-xs-6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .col-xs-7 {
    -ms-flex-preferred-size: 58.33333333%;
    flex-basis: 58.33333333%;
    max-width: 58.33333333%;
  }

  .col-xs-8 {
    -ms-flex-preferred-size: 66.66666667%;
    flex-basis: 66.66666667%;
    max-width: 66.66666667%;
  }

  .col-xs-9 {
    -ms-flex-preferred-size: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .col-xs-10 {
    -ms-flex-preferred-size: 83.33333333%;
    flex-basis: 83.33333333%;
    max-width: 83.33333333%;
  }

  .col-xs-11 {
    -ms-flex-preferred-size: 91.66666667%;
    flex-basis: 91.66666667%;
    max-width: 91.66666667%;
  }

  .col-xs-12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }

  .col-xs-offset-0 {
    margin-left: 0;
  }

  .col-xs-offset-1 {
    margin-left: 8.33333333%;
  }

  .col-xs-offset-2 {
    margin-left: 16.66666667%;
  }

  .col-xs-offset-3 {
    margin-left: 25%;
  }

  .col-xs-offset-4 {
    margin-left: 33.33333333%;
  }

  .col-xs-offset-5 {
    margin-left: 41.66666667%;
  }

  .col-xs-offset-6 {
    margin-left: 50%;
  }

  .col-xs-offset-7 {
    margin-left: 58.33333333%;
  }

  .col-xs-offset-8 {
    margin-left: 66.66666667%;
  }

  .col-xs-offset-9 {
    margin-left: 75%;
  }

  .col-xs-offset-10 {
    margin-left: 83.33333333%;
  }

  .col-xs-offset-11 {
    margin-left: 91.66666667%;
  }
}


@include breakpoint(sm) {

  .col-sm,
  div[class^='col-sm-'], div[class*=' col-sm-'] {
    box-sizing: border-box;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }

  .col-sm {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .col-sm-1 {
    -ms-flex-preferred-size: 8.33333333%;
    flex-basis: 8.33333333%;
    max-width: 8.33333333%;
  }

  .col-sm-2 {
    -ms-flex-preferred-size: 16.66666667%;
    flex-basis: 16.66666667%;
    max-width: 16.66666667%;
  }

  .col-sm-3 {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .col-sm-4 {
    -ms-flex-preferred-size: 33.33333333%;
    flex-basis: 33.33333333%;
    max-width: 33.33333333%;
  }

  .col-sm-5 {
    -ms-flex-preferred-size: 41.66666667%;
    flex-basis: 41.66666667%;
    max-width: 41.66666667%;
  }

  .col-sm-6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .col-sm-7 {
    -ms-flex-preferred-size: 58.33333333%;
    flex-basis: 58.33333333%;
    max-width: 58.33333333%;
  }

  .col-sm-8 {
    -ms-flex-preferred-size: 66.66666667%;
    flex-basis: 66.66666667%;
    max-width: 66.66666667%;
  }

  .col-sm-9 {
    -ms-flex-preferred-size: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .col-sm-10 {
    -ms-flex-preferred-size: 83.33333333%;
    flex-basis: 83.33333333%;
    max-width: 83.33333333%;
  }

  .col-sm-11 {
    -ms-flex-preferred-size: 91.66666667%;
    flex-basis: 91.66666667%;
    max-width: 91.66666667%;
  }

  .col-sm-12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }

  .col-sm-offset-0 {
    margin-left: 0;
  }

  .col-sm-offset-1 {
    margin-left: 8.33333333%;
  }

  .col-sm-offset-2 {
    margin-left: 16.66666667%;
  }

  .col-sm-offset-3 {
    margin-left: 25%;
  }

  .col-sm-offset-4 {
    margin-left: 33.33333333%;
  }

  .col-sm-offset-5 {
    margin-left: 41.66666667%;
  }

  .col-sm-offset-6 {
    margin-left: 50%;
  }

  .col-sm-offset-7 {
    margin-left: 58.33333333%;
  }

  .col-sm-offset-8 {
    margin-left: 66.66666667%;
  }

  .col-sm-offset-9 {
    margin-left: 75%;
  }

  .col-sm-offset-10 {
    margin-left: 83.33333333%;
  }

  .col-sm-offset-11 {
    margin-left: 91.66666667%;
  }
}

@include breakpoint(md) {

  .col__sticky-content {
    z-index:1;
    position:sticky;
    top:vr(3);
    margin-bottom:vr(1);
  }

  .col-md,
  div[class^='col-md-'], div[class*=' col-md-'] {
    box-sizing: border-box;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }

  .col-md {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .col-md-1 {
    -ms-flex-preferred-size: 8.33333333%;
    flex-basis: 8.33333333%;
    max-width: 8.33333333%;
  }

  .col-md-2 {
    -ms-flex-preferred-size: 16.66666667%;
    flex-basis: 16.66666667%;
    max-width: 16.66666667%;
  }

  .col-md-3 {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .col-md-4 {
    -ms-flex-preferred-size: 33.33333333%;
    flex-basis: 33.33333333%;
    max-width: 33.33333333%;
  }

  .col-md-5 {
    -ms-flex-preferred-size: 41.66666667%;
    flex-basis: 41.66666667%;
    max-width: 41.66666667%;
  }

  .col-md-6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .col-md-7 {
    -ms-flex-preferred-size: 58.33333333%;
    flex-basis: 58.33333333%;
    max-width: 58.33333333%;
  }

  .col-md-8 {
    -ms-flex-preferred-size: 66.66666667%;
    flex-basis: 66.66666667%;
    max-width: 66.66666667%;
  }

  .col-md-9 {
    -ms-flex-preferred-size: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .col-md-10 {
    -ms-flex-preferred-size: 83.33333333%;
    flex-basis: 83.33333333%;
    max-width: 83.33333333%;
  }

  .col-md-11 {
    -ms-flex-preferred-size: 91.66666667%;
    flex-basis: 91.66666667%;
    max-width: 91.66666667%;
  }

  .col-md-12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }

  .col-md-offset-0 {
    margin-left: 0;
  }

  .col-md-offset-1 {
    margin-left: 8.33333333%;
  }

  .col-md-offset-2 {
    margin-left: 16.66666667%;
  }

  .col-md-offset-3 {
    margin-left: 25%;
  }

  .col-md-offset-4 {
    margin-left: 33.33333333%;
  }

  .col-md-offset-5 {
    margin-left: 41.66666667%;
  }

  .col-md-offset-6 {
    margin-left: 50%;
  }

  .col-md-offset-7 {
    margin-left: 58.33333333%;
  }

  .col-md-offset-8 {
    margin-left: 66.66666667%;
  }

  .col-md-offset-9 {
    margin-left: 75%;
  }

  .col-md-offset-10 {
    margin-left: 83.33333333%;
  }

  .col-md-offset-11 {
    margin-left: 91.66666667%;
  }
}

@include breakpoint(lg) {
  .col-lg,
  div[class^='col-lg-'], div[class*=' col-lg-'] {
    box-sizing: border-box;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }

  .col-lg {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .col-lg-1 {
    -ms-flex-preferred-size: 8.33333333%;
    flex-basis: 8.33333333%;
    max-width: 8.33333333%;
  }

  .col-lg-2 {
    -ms-flex-preferred-size: 16.66666667%;
    flex-basis: 16.66666667%;
    max-width: 16.66666667%;
  }

  .col-lg-3 {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .col-lg-4 {
    -ms-flex-preferred-size: 33.33333333%;
    flex-basis: 33.33333333%;
    max-width: 33.33333333%;
  }

  .col-lg-5 {
    -ms-flex-preferred-size: 41.66666667%;
    flex-basis: 41.66666667%;
    max-width: 41.66666667%;
  }

  .col-lg-6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .col-lg-7 {
    -ms-flex-preferred-size: 58.33333333%;
    flex-basis: 58.33333333%;
    max-width: 58.33333333%;
  }

  .col-lg-8 {
    -ms-flex-preferred-size: 66.66666667%;
    flex-basis: 66.66666667%;
    max-width: 66.66666667%;
  }

  .col-lg-9 {
    -ms-flex-preferred-size: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .col-lg-10 {
    -ms-flex-preferred-size: 83.33333333%;
    flex-basis: 83.33333333%;
    max-width: 83.33333333%;
  }

  .col-lg-11 {
    -ms-flex-preferred-size: 91.66666667%;
    flex-basis: 91.66666667%;
    max-width: 91.66666667%;
  }

  .col-lg-12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }

  .col-lg-offset-0 {
    margin-left: 0;
  }

  .col-lg-offset-1 {
    margin-left: 8.33333333%;
  }

  .col-lg-offset-2 {
    margin-left: 16.66666667%;
  }

  .col-lg-offset-3 {
    margin-left: 25%;
  }

  .col-lg-offset-4 {
    margin-left: 33.33333333%;
  }

  .col-lg-offset-5 {
    margin-left: 41.66666667%;
  }

  .col-lg-offset-6 {
    margin-left: 50%;
  }

  .col-lg-offset-7 {
    margin-left: 58.33333333%;
  }

  .col-lg-offset-8 {
    margin-left: 66.66666667%;
  }

  .col-lg-offset-9 {
    margin-left: 75%;
  }

  .col-lg-offset-10 {
    margin-left: 83.33333333%;
  }

  .col-lg-offset-11 {
    margin-left: 91.66666667%;
  }

  .start-lg {
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    text-align: start;
  }

  .center-lg {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
  }

  .end-lg {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    text-align: end;
  }

  .top-lg {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .middle-lg {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .bottom-lg {
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
  }

  .around-lg {
    -ms-flex-pack: distribute;
    justify-content: space-around;
  }

  .between-lg {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .first-lg {
    -webkit-box-ordinal-group: 0;
    -ms-flex-order: -1;
    order: -1;
  }

  .last-lg {
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1;
  }
}

@include breakpoint(xl) {
  .col-xl,
  div[class^='col-xl-'], div[class*=' col-xl-'] {
    box-sizing: border-box;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }

  .col-xl {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .col-xl-1 {
    -ms-flex-preferred-size: 8.33333333%;
    flex-basis: 8.33333333%;
    max-width: 8.33333333%;
  }

  .col-xl-2 {
    -ms-flex-preferred-size: 16.66666667%;
    flex-basis: 16.66666667%;
    max-width: 16.66666667%;
  }

  .col-xl-3 {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .col-xl-4 {
    -ms-flex-preferred-size: 33.33333333%;
    flex-basis: 33.33333333%;
    max-width: 33.33333333%;
  }

  .col-xl-5 {
    -ms-flex-preferred-size: 41.66666667%;
    flex-basis: 41.66666667%;
    max-width: 41.66666667%;
  }

  .col-xl-6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .col-xl-7 {
    -ms-flex-preferred-size: 58.33333333%;
    flex-basis: 58.33333333%;
    max-width: 58.33333333%;
  }

  .col-xl-8 {
    -ms-flex-preferred-size: 66.66666667%;
    flex-basis: 66.66666667%;
    max-width: 66.66666667%;
  }

  .col-xl-9 {
    -ms-flex-preferred-size: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .col-xl-10 {
    -ms-flex-preferred-size: 83.33333333%;
    flex-basis: 83.33333333%;
    max-width: 83.33333333%;
  }

  .col-xl-11 {
    -ms-flex-preferred-size: 91.66666667%;
    flex-basis: 91.66666667%;
    max-width: 91.66666667%;
  }

  .col-xl-12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }

  .col-xl-offset-0 {
    margin-left: 0;
  }

  .col-xl-offset-1 {
    margin-left: 8.33333333%;
  }

  .col-xl-offset-2 {
    margin-left: 16.66666667%;
  }

  .col-xl-offset-3 {
    margin-left: 25%;
  }

  .col-xl-offset-4 {
    margin-left: 33.33333333%;
  }

  .col-xl-offset-5 {
    margin-left: 41.66666667%;
  }

  .col-xl-offset-6 {
    margin-left: 50%;
  }

  .col-xl-offset-7 {
    margin-left: 58.33333333%;
  }

  .col-xl-offset-8 {
    margin-left: 66.66666667%;
  }

  .col-xl-offset-9 {
    margin-left: 75%;
  }

  .col-xl-offset-10 {
    margin-left: 83.33333333%;
  }

  .col-xl-offset-11 {
    margin-left: 91.66666667%;
  }
}

@include breakpoint(xxl) {

  .col-xxl,
  div[class^='col-xxl-'], div[class*=' col-xxl-'] {
    box-sizing: border-box;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }

  .col-xxl {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .col-xxl-1 {
    -ms-flex-preferred-size: 8.33333333%;
    flex-basis: 8.33333333%;
    max-width: 8.33333333%;
  }

  .col-xxl-2 {
    -ms-flex-preferred-size: 16.66666667%;
    flex-basis: 16.66666667%;
    max-width: 16.66666667%;
  }

  .col-xxl-3 {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .col-xxl-4 {
    -ms-flex-preferred-size: 33.33333333%;
    flex-basis: 33.33333333%;
    max-width: 33.33333333%;
  }

  .col-xxl-5 {
    -ms-flex-preferred-size: 41.66666667%;
    flex-basis: 41.66666667%;
    max-width: 41.66666667%;
  }

  .col-xxl-6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .col-xxl-7 {
    -ms-flex-preferred-size: 58.33333333%;
    flex-basis: 58.33333333%;
    max-width: 58.33333333%;
  }

  .col-xxl-8 {
    -ms-flex-preferred-size: 66.66666667%;
    flex-basis: 66.66666667%;
    max-width: 66.66666667%;
  }

  .col-xxl-9 {
    -ms-flex-preferred-size: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .col-xxl-10 {
    -ms-flex-preferred-size: 83.33333333%;
    flex-basis: 83.33333333%;
    max-width: 83.33333333%;
  }

  .col-xxl-11 {
    -ms-flex-preferred-size: 91.66666667%;
    flex-basis: 91.66666667%;
    max-width: 91.66666667%;
  }

  .col-xxl-12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }

  .col-xxl-offset-0 {
    margin-left: 0;
  }

  .col-xxl-offset-1 {
    margin-left: 8.33333333%;
  }

  .col-xxl-offset-2 {
    margin-left: 16.66666667%;
  }

  .col-xxl-offset-3 {
    margin-left: 25%;
  }

  .col-xxl-offset-4 {
    margin-left: 33.33333333%;
  }

  .col-xxl-offset-5 {
    margin-left: 41.66666667%;
  }

  .col-xxl-offset-6 {
    margin-left: 50%;
  }

  .col-xxl-offset-7 {
    margin-left: 58.33333333%;
  }

  .col-xxl-offset-8 {
    margin-left: 66.66666667%;
  }

  .col-xxl-offset-9 {
    margin-left: 75%;
  }

  .col-xxl-offset-10 {
    margin-left: 83.33333333%;
  }

  .col-xxl-offset-11 {
    margin-left: 91.66666667%;
  }
}
</style>
