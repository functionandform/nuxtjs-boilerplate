<template>
  <component :is="getComponentType"
    :type="getComponentType === 'button' ? 'button' : null"
    :to="to"
    :href="url"
    :class="
      'button button--loading button--' + weight + ' ' + addClass + ' ' + applyInvertClass + ' button--loading-' + loading"
    ref="button"
  >
    <div class="button__fill"><div class="button__border"></div></div>

    <div class="button__loading-icon" v-if="loading"><span></span><span></span><span></span></div><div class="button__icon button__icon--leading" v-if="leadingIcon"><icon :name="leadingIcon" size="normal"></icon></div><span class="button__label"><slot></slot></span><div class="button__icon button__icon--trailing" v-if="(trailingIcon !== false) && (weight === 'primary' || weight === 'secondary' || weight === 'tertiary' || trailingIcon)"><icon :name="trailingIcon ? trailingIcon : 'chev-right-small'" size="normal"></icon></div>
  </component>
</template>

<script>

  

export default {
  props: {
    weight: {
      required: false,
      type: String,
      default:'tertiary'
    },
    trailingIcon: {
      required:false
    },
    leadingIcon: {
      default:false
    },
    to: {
      required:false
    },
    url: {
      required:false
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
    getComponentType() {
      if (this.to) {
        return 'nuxt-link'
      } else if (this.url) {
        return 'a'
      } else {
        return 'button'
      }
    },
  },
  methods: {
    
    applyWeightClass() {
      return `button--$(this.weight)`;
    },
    // animateButton(e) {
    //   const button = this.$refs.button;
    //   let buttonOffset = button.getBoundingClientRect();
    //   let x = e.clientX - buttonOffset.left;
    //   let y = e.clientY - buttonOffset.top;
    //   button.style.setProperty('--x', x + 'px');
    //   button.style.setProperty('--y', y + 'px');
    // },
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
  overflow:hidden;
  margin-bottom:vr(1);
  &__label {
    display:inline-block;
    vertical-align: middle;
    position:relative;
    font-size:14px;
    color:black;
    line-height:vr(1);
    height:vr(1);
    letter-spacing:0.3em;
    font-weight:600;
    transition:0.2s $ease-in-out-expo;
    font-family:$body-font-family;
    pointer-events:none;
  }
  &__icon {
    display:inline-block;
    pointer-events:none;
    vertical-align: middle;
    height:auto;
    position:relative;
    line-height:vr(1);
    margin:0 vr(0.25);
    .icon {
      display:block;
      color:black;
      width:24px;
      height:24px;
      transition:0.2s $ease-in-out-expo;
    }
    
  }
  &__fill {
    background-color: transparent;
    height:2rem; width:100%;
    position:absolute;
    top:50%; left:0;
    max-height:100%;
    transform:translateY(-50%);
    overflow: hidden;
  }
  &--tertiary {
    padding:vr(0.5) 0;
    &:hover {
      
    }
    &:active {
      
    }
    &:focus {
      outline:none;
    }
  }
  &--secondary, &--primary, &--category {
    border-radius:vr(1.5);
    padding:vr(0.5) vr(0.5);
    height:vr(2);
    text-align:center;
    //height:$multiple * 2;
    background-color:transparent;
    .button__icon, .button__label {
      margin:0 vr(0.25);
    }
    .button__icon {
      &--trailing {
        
      }
      &--leading {
        
      }
    }
    .icon {
      margin:0 auto;
    }
    .button__label {
      text-align:center;
      display: inline-block;
      min-width:vr(1.5);
      vertical-align:middle;
      @include breakpoint(tablet-l) {
        
      }
    }
    .button__fill {
      border-radius:1rem;
      &::after {
        display:block;
        position:absolute;
        top:0; right:0; bottom:0; left:0;
        border-radius:vr(1);
        content:"";
        pointer-events:none;
        background:transparent;
        box-sizing: border-box;
      }
    }
    &:hover {
      .button__fill {
        background-color:black;
        &::before {
          --size: 200px;
          transition: width .2s $ease-in-expo, height .2s $ease-in-expo;
        }
      }
      .button__label, .icon {
        color:$white;
      }
    } 
    @include breakpoint(tablet-l) {
      max-height:100%;
    }
    &.button--iconOnly {
      .button__icon {
        
      }
    }
    &:focus {
      outline:none;
      .button__fill {
        box-shadow:0 0 0px 2px blue;
      }
    }
  }
  &--small {
    &.button--secondary, &.button--primary {
      // padding-top:vr(0.166666667);
      // padding-right:vr(0.75);
      // padding-left:vr(0.75);
      // padding-bottom:vr(0.166666667);
      // border-radius:vr(1);
      // height:vr(1.5);
    }
  }
  &--secondary {
    .button__fill {
      border-color:black;
    }
    .button__border {
      display:block;
      position:absolute;
      top:0; right:0; bottom:0; left:0;
      border-radius:vr(1);
      border:2px solid black;
      transition:0.5s $ease-out-expo;
    }
    &:hover {
      transition:0.2s $ease-in-expo;
      .button__border {
        opacity:0;
      }
    }

  }
    &--primary {
    .button__fill {
      background-color:black;
    }
    .button__label {
      color:$white;
    }
    .button__icon .icon {
      color:$white;
    }
    }

  &--disabled, &:disabled {
    pointer-events:none;
    cursor:not-allowed;
  }
}


</style>
