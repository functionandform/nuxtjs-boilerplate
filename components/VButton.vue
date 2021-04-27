<template>
  <button
    :type="type"
    :class="
      'button button--loading button--' + weight + ' ' + addClass + ' ' + applyInvertClass + ' button--loading-' + loading"
    ref="button"
    @mouseenter="mouseEnter()"
    @mouseleave="mouseLeave()"
  >
    <div class="button__fill"></div>
    <div class="button__loading-icon" v-if="loading"><span></span><span></span><span></span></div><div class="button__icon" v-if="leadingIcon"><icon :name="leadingIcon" size="small"></icon></div><span class="button__label"><slot></slot></span><div class="button__icon" v-if="weight == 'primary' || weight == 'secondary' || trailingIcon"><icon :name="trailingIcon ? trailingIcon : 'arrow-right-small'" size="small"></icon></div>
  </button>
</template>

<script>

  

export default {
  props: {
    weight: {
      required: true,
      type: String,
    },
    trailingIcon: {
      default:false
    },
    leadingIcon: {
      default:false
    },
    type: {
      required: false,
      type: String,
      default: 'button'
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
  computed: {
    applyInvertClass() {
      if (this.invert) {
        return 'button--invert';
      } else {
        return null;
      }
    },
    applyLoadingClass() {
      if (this.loading) {
        return 'button--loading';
      } else {
        return null;
      }
    },
  },
  methods: {
    applyWeightClass() {
      return `button--$(this.weight)`;
    },
    mouseEnter(event) {
     // this.setHoverObject(this.$refs.button);
    },
    mouseLeave(event) {
     // this.setHoverObject(null);
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
    margin-bottom:vr(1);
    padding:0;
    transition:0.2s $ease-in-out-expo;
    &.no-margin {
      margin-bottom:0;
    }
    &__icon {
      margin-right:vr(0.25);
      height:auto;
      display:inline-block;
      vertical-align: middle;
      top:-1px;
      position:relative;
      transition:0.2s $ease-in-out-expo;
    }
    &__label {
      font-size:0.8rem;
      
      position:relative;
      transition:0.2s $ease-in-out-expo;
      @include line-height;
      @include breakpoint(xl) {
        font-size:0.7rem;
      }
      & + .button__icon {
        margin-left:vr(0.25);
        margin-right:0;
        vertical-align: middle;
      }
    }
    .icon {
      vertical-align: middle;
      display:inline-block;
      position:relative;
    }
    &__loading-icon {
      height:24px;
      width:24px;
      display:inline;
      text-align:center;
      position:absolute;
      top:50%;
      left:50%;
      transform:translateX(-50%);
      margin-top:-(12px);
      pointer-events:none;
      visibility: hidden;
      z-index: 1;
    }
    &__fill {
      position:absolute;
      width:100%;
      left:50%; top:50%;
      transform:translate(-50%, -50%);
      height:100%;
      max-height:48px;
      display:none;
      transform-origin:center;
      &::before {
        position:absolute;
        width:100%;
        height:100%;
        border-radius:vr(1);
        content:"";
        transition:0.3s $ease-in-out-expo;
        display:block;
        transform-origin:center;
      }
    }
    &--primary {
      .button__fill {
        display:block;
      }
      height:vr(2);
      //border:$border-dashed;
      padding:0 2em;
      border-radius:var(--baseline);
      @include breakpoint(xl) {
        padding-right:2em;
        padding-left:2em;
      }
      &:hover {
        .button__fill::before {
          
        }
      }
      &:active {
        .button__fill::before {
          
        }
      }
    }
    &--primary {
      
    }
    &--invert {

    }
    &--loading-true {
      .button {
        &__loading-icon {
          visibility: visible;
          opacity:1;
        }
        &__label, &__icon {
          opacity:0;
        }
      }
      &.button--primary {
        
      }
      .button__fill {
        width:calc(var(--baseline) * 2);
      }
    }

    @keyframes scaleInOut {
      0% {
          transform: scale(1);
      }
      15% {
        transform: scale(1.75);
      }
      20% {
          transform: scale(2);
      }
      30% {
          transform: scale(1.95);
      }
      40% {
          transform: scale(1.8);
      }
      100% {
          transform: scale(1);
      }
  }
  }


</style>
