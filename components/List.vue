<template>
    <component :is="ordered ? 'ol' : 'ul'" class="list" :class="{'list--ordered':ordered, 'list--unordered':!ordered,'list--features':features}">
      <slot></slot>
    </component>
</template>

<script>
export default {
  props: {
    ordered: {
      required:false,
      type:Boolean
    },
    features: {
      required:false,
      type:Boolean
    }
  }
};
</script>

<style lang="scss">
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: list;
  margin-bottom:vr(1);
  display:block;
  &__item {
    padding-left:vr(1.25);
    line-height:vr(1);
    position:relative;
    counter-increment: list;
    margin-bottom:vr(0.5);
    &::before {
      position:absolute;
      height:vr(1);
      width:vr(1);
      left:0;
      top:0;
      content:"";
      color:red;
    }
  }
  &--ordered {
    .list__item {
      &::before {
        content:counter(list)' ';
        letter-spacing: 0.2em;
        font-weight:600;
      }
    }
  }
  &--unordered {
    .list__item {
      &::before {
        content:'• ';
        letter-spacing: 0.2em;
        font-weight:600;
      }
    }
  }
  &--features {
    .list__item {
      &::before {
        background-size:1rem;
        background-repeat:no-repeat;
        background-position:center;
        background-color:red;
        display:inline-block;
        content:'';
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' width='24' viewBox='0 0 24 24'%3E%3Cg stroke-linecap='square' stroke-width='2' fill='none' stroke='black' stroke-linejoin='miter' class='nc-icon-wrapper' stroke-miterlimit='10'%3E%3Cpolyline points='6,12 10,16 18,8 '%3E%3C/polyline%3E%3C/g%3E%3C/svg%3E") center center no-repeat;
      }
    }
  }
}

.align-center {
  .list:not(.align-left):not(.align-right) {
    .list__item {
      margin:0 auto;
      display:inline-block;
      text-align:center;
    }
  }
}
</style>