<template>
  <button
    :type="type"
    :class="
      'button button--' + weight + ' ' + addClass + ' ' + applyInvertClass"
    ref="button"
  >
    <span class="button__loading" v-if="loading">
      <loading-icon invert></loading-icon>
    </span>
    <span class="button__label" v-else>
      <slot></slot>
    </span><!-- label -->
    <div class="button__bg" v-if="weight !== 'tertiary'"></div>
  </button>
</template>

<script>

export default {
  created() {},
  props: {
    weight: {
      required: true,
      type: String,
    },
    type: {
      required: false,
      type: String,
      default: 'button',
    },
    meta: {
      required: false,
      type: String,
    },
    invert: {
      required: false,
      type: Boolean,
    },
    addClass: {
      required: false,
      type: String,
      default: '',
    },
    loading: {
      required:false,
      type:Boolean,
      default:false
    }
  },
  mounted() {},
  computed: {
    applyInvertClass() {
      if (this.invert) {
        return 'button--invert';
      } else {
        return null;
      }
    },
  },
  methods: {
    applyWeightClass() {
      return `button--$(this.weight)`;
    }
  },
};
</script>



<style lang="scss">
  .button {
    -webkit-appearance: none;
    display:inline-block;
    white-space: nowrap;
    background-color:transparent;
    border:none;
    cursor:pointer;
    border-radius:0px;
    position:relative;
    white-space:nowrap;
    display: inline-block;
    vertical-align: middle;
    margin-bottom:$multiple;
    padding:0;
    transition:0.2s $ease-in-out-expo;
    &__label {
      font-size:14px;
      letter-spacing: 0.15em;
      line-height:$multiple;
      font-weight:700;
      display:inline-block;
      text-align:center;
      font-family:$title-font-family;
      text-transform:uppercase;
    }
    .icon {
      vertical-align: middle;
      margin-left:$multiple / 4;
    }
    &__loading {
      min-width:$multiple * 2;
      position:relative;
      display:block;
      svg {
        position:absolute;
        top:50%; left:50%;
        transform:translate(-50%,-50%);
      }
    }
    &--primary, &--secondary {
      border-radius:$radius;
      border:1px solid $purple;
      padding:0 $multiple;
      min-height:$multiple * 2;
      font-family:$title-font-family;
      display:inline-block;
      .button__label {
        min-width:$multiple * 2;
      }
      
    }
    &--primary {
      background-color:$light-purple;
      color:$white;
      &:hover {
        background-color:$purple;
      }
    }
  }


</style>
