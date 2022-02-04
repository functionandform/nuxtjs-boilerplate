<template>
  <div class="accordion__item" :class="{'accordion__item--active':visible}">
    <div 
      class="accordion__item__header" @click="open">
	      <div class="accordion__item__title"><slot name="title"></slot></div>
	      <div class="accordion__item__header__icon"></div>
    </div>

    <transition 
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end">

      <div class="accordion__item__content"
        v-show="visible">
        <div class="accordion__item__content__inner">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  props: {},
  inject: ["Accordion"],
  data() {
    return {
      index: null
    };
  },
  computed: {
    visible() {
      return this.index == this.Accordion.active;
    }
  },
  methods: {
    open() {
    	console.log('open')
      if (this.visible) {
        this.Accordion.active = null;
      } else {
        this.Accordion.active = this.index;
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
    }
  },
  created() {
    this.index = this.Accordion.count++;
  }
};
</script>

<style lang="scss">
.accordion__item {
	border-top:1px solid black;
	border-bottom:1px solid black;
	margin-bottom:-1px;
	&:last-of-type {
		margin-bottom:vr(1);
	}
  &__header {
  	position:relative;
	padding:vr(0.5) 0;
	cursor:pointer;
	display:flex;
	align-items:center;
	justify-content: space-between;
	h1,h2,h3,h4,h5,p {
		margin-bottom:0;
	}
  	&__icon {
  		transform:rotate(0deg);
		height:vr(1); width:vr(1);
		margin-left:vr(1);
		display:block;
		position:relative;
		&::before, &::after {
			position:absolute;
			top:calc(50% - 1px);
			left:vr(0.125);
			height:2px; width:vr(0.75);
			background-color:black;
			content:"";
			transition:0.4s $ease-in-out-expo;
		}
		&::after {
			
		}
		&::before {
			transform:rotate(270deg);
		}
  	}
  }
  &__content {
  	position:relative;
  	&__inner {
  		padding:vr(1) 0;
  		position:relative;
  		&::after {
  			position:relative;
  			display:block;
  			content:" ";
 			clear:both;
  		}
  	}
  }
  &--active {
  	.accordion__item {
  		&__header {
  			&__icon {
  				transform:rotate(-360deg);
				&::after {
					transform:rotate(-180deg);
				}
				&::before {
					transform:rotate(0deg);
				}
  			}
  		}
  	}
  }
}


.accordion-enter-active {
  transition:transform 0.4s $ease-in-out-expo, height 0.4s $ease-in-out-expo, opacity 0.4s $ease-in-out-expo;
  overflow: hidden;
}

.accordion-leave-active {
  transition:transform 0.4s $ease-in-out-expo 0.4s, height 0.4s $ease-in-out-expo 0.4s, opacity 0.4s $ease-in-out-expo;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
  transform:rotate3d(1,0,0,-10deg) scale(0.9);
transform-origin:left bottom;
}
</style>
