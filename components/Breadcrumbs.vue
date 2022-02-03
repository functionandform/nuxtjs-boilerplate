<template>
  <nav v-if="crumbs.length">
    <div class="breadcrumbs" vocab="http://schema.org/" typeof="BreadcrumbList">
      <div class="breadcrumbs__crumb" property="itemListElement" typeof="ListItem">
        <nuxt-link property="item" typeof="WebPage" to="/">
          <span property="name">Home</span>
        </nuxt-link>
        <meta property="position" content="1"/>
      </div>
      <div class="breadcrumbs__crumb"
        v-for="(crumb, index) in crumbs"
        :key="index"
        property="itemListElement"
        typeof="ListItem"
      >
        <nuxt-link property="item" typeof="WebPage" :to="crumb.path" v-if="index < crumbs.length - 1">
          <span property="name">{{
            $route.fullPath === crumb.path && title !== null ? title : crumb.title
          }}</span>
        </nuxt-link>
        <span property="name" v-else>
          {{
            $route.fullPath === crumb.path && title !== null ? title : crumb.title
          }}
        </span>
        <meta property="position" :content="index + 2" />
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const ctx = this;
      let isPageIndex = false;
      const fullPath = ctx.$route.fullPath.split('?')[0];
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = ctx.$router.match(path)
        if (isPageIndex) {
          crumbs.push({
            title:'Page '+param
          })
          isPageIndex = false;

        }
        else if (param === 'page') {
          isPageIndex = true;
        } else {
          if (match.name !== null) {
            crumbs.push({
              title: ctx.$options.filters.titleCase(param.replace(/-/g, ' ')),
              ...match,
            })
          }
        }
      })
      return crumbs
    },
  },
}
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    display:block;
    margin-bottom:vr(1);

    &__crumb {
      display:inline-block;
      span {
        max-width:30vw;
        white-space: nowrap;
        text-overflow:ellipsis;
        display:inline-block;
        vertical-align: middle;
        font-size:0.8rem;
        overflow:hidden;
      }
      a:link, a:visited {
        color:black;
        font-weight:600;
      }
      &:not(:first-child) {
        margin-left:0.2em;
      }
      &:not(:last-child) {
        margin-right:0.2em;
        &::after {
          content:"";
          display:inline-block;
          @include chev('right', 5px, black);
          margin-top:1px;
          vertical-align: middle;
        }
      }
    }
  }

</style>