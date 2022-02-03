<template>
  <li class="list__item">
    <slot/>
  </li>
</template>


<script>
export default {
  props: {
    icon: {
      required:false,
      type:String
    }
  }
};
</script>

