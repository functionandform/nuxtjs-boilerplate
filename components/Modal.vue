<template>
  <transition appear name="outer-overlay-transition" :duration="{ enter: 800, leave: 800 }" @enter="lockBody()" @leave="releaseBody()">
    <div class="modal" :data-fill="fill" :data-size="size" v-if="ModalIsOpen">
      <div class="modal__bg" @click="closeModal()"></div>
      <div class="modal__window">
        <div class="modal__container">
          <slot/>
        </div>
      </div>
      <button class="modal__close" @click="closeModal()"></button>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      size: {
        required:false,
        type:String,
        default:"md"
      },
      fill: {
        required:false,
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        ModalIsOpen: false
      }
    },
    methods: {
      openModal() {
        this.ModalIsOpen = true;
      },
      closeModal() {
        this.ModalIsOpen = false;
      },
      lockBody() {
      const body = document.querySelector('body');
      body.classList.add('modal-open');
    },
    releaseBody() {
      const body = document.querySelector('body');
      body.classList.remove('modal-open');
    }
    }
  }
  </script>



<style lang="scss" scoped>
  .modal {
    position:fixed;
    top:0; left:0; 
    width:100%; height:100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    z-index:200;
    padding:vr(1);
    &__bg {
      background-color:rgba(#000000, 0.3);
      position:fixed;
      top:0; left:0;
      width:100%; height:100%;
      backdrop-filter: blur(10px);
    }
    &__close {
      @include remove-button(vr(1), black);
      position:absolute;
      top:vr(1); right:vr(1);
      z-index:10;
    }
    &__window {
      width:100%;
      max-height:100%;
      position:relative;
      display:block;
      flex-direction: column;
      justify-content: center;
      z-index: 1;
      background-color:white;
      overflow-y:scroll;
      overflow-scrolling:touch;
      @include breakpoint(lg) {
        overflow:auto;
      }
    }
    &__container {
      padding:vr(1);
      text-align:center;
      margin:0 auto;
    }
    &[data-size="md"], &[data-size="lg"] {
      @include breakpoint-less-than(md) {
        .modal {
          padding:0;
          &__bg {
            background-color: white;
          }
          &__window {
            box-shadow:none;
            width:100%;
            max-width:none;
            position:absolute;
            top:0; left:0;
            width:100%; height:100%;
            padding:vr(2) 0;
          }
        }
      }
    }
    &[data-size="lg"] {
      .modal {
        &__window, &__container {
          @include breakpoint(md) {
            max-width:60em;
          }
        }
      }
    }
    &[data-size="md"] {
      .modal {
        &__window, &__container {
          @include breakpoint(md) {
            max-width:40em;
          }
        }
      }
    }
    &[data-size="sm"] {
      .modal {
        &__window, &__container {
          @include breakpoint(md) {
            max-width:20em;
          }
        }
      }
      &:not([data-fill]) {
        .modal {
          &__window {
            max-width:20em;
          }
        }
      }
    }
    &[data-fill] {
      .modal {
        padding:0;
        &__bg {
          background-color: white;
        }
        &__window {
          box-shadow:none;
          width:100%;
          max-width:none;
          position:absolute;
          top:0; left:0;
          width:100%; height:100%;
          padding:vr(2) 0;
        }
      }
    }
  }


  .outer-overlay-transition-enter-active {
    transition:opacity 0.3s linear;
    .modal__window {
      transition:all 0.5s $ease-out-expo 0.3s;
    }
  }

  .outer-overlay-transition-leave-active {
    transition:opacity 0.3s linear 0.5s;
    .modal__window {
      transition:all 0.5s $ease-out-expo 0s;
    }
  }

  .outer-overlay-transition-enter,
  .outer-overlay-transition-leave-to {
    opacity: 0;
    .modal__window {
      opacity: 0;
      transform:scale(0.9);
    }
  }

</style>