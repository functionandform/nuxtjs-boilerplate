<template>
  <div class="form-wrapper">
    <loading v-if="$apollo.queries.freeform.loading"></loading>
    <template v-else-if="freeform">
      <form
        class="form-wrapper__form"
        :data-id="freeform.form.uid"
        :data-handle="freeform.form.handle"
        :data-ajax="freeform.form.ajaxEnabled"
        @submit.prevent="submitForm"
      >
        <div
          :class="freeform.form.honeypot.name"
          style="
            position: absolute !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          "
          aria-hidden="true"
          tabindex="-1"
          data-children-count="1"
        >
          <label
            aria-hidden="true"
            tabindex="-1"
            :for="freeform.form.honeypot.name"
            >Leave this field blank</label
          ><input
            type="text"
            value=""
            :name="freeform.form.honeypot.name"
            :id="freeform.form.honeypot.name"
            aria-hidden="true"
            tabindex="-1"
          />
        </div>
        <section
          class="form-wrapper__page"
          v-for="(page, index) in freeform.form.pages"
          :key="index"
        >
          <row v-for="(row, index) in page.rows" :key="index">
            <column
              v-for="field in row.fields"
              :key="field.handle"
              :xs="row.fields.length === 2 ? '6' : null"
            >
              <template
                v-if="
                  field.type == 'email' ||
                  field.type == 'text' ||
                  field.type == 'textarea' ||
                  field.type == 'number' ||
                  field.type == 'checkbox' ||
                  field.type == 'radio' ||
                  field.type == 'select'
                "
              >
                <field
                  :type="field.type"
                  :name="field.handle"
                  :id="field.id"
                  :label="field.label"
                  :instructions="field.instructions"
                  :required="field.required"
                  :error="getErrorsFor(field.handle)"
                  :page-index="field.pageIndex"
                  :value="field.value"
                  :placeholder="field.placeholder"
                  :options="field.options"
                ></field>
              </template>
              <template v-if="field.type == 'rating'">
                Rating field TBC
              </template>
              <template v-if="field.type == 'hidden'">
                <input
                  type="hidden"
                  :value="field.value"
                  :id="field.id"
                  :name="field.handle"
                />
              </template>
              <template v-if="field.type == 'submit'">
                <div class="align-right">
                  <v-button type="submit" weight="primary">{{
                    field.label
                  }}</v-button>
                </div>
              </template>
            </column>
          </row>
        </section>
      </form>
    </template>
  </div>
  <!-- form-wrapper -->
</template>


<script>
import GET_FREEFORM from "~/apollo/queries/getFreeform.gql";

export default {
  data() {
    return {

    };
  },
  created() {},
  props: {
    invert: {
      required: false,
      type: Boolean,
    },
    handle: {
      required: true,
      type: String,
    },
  },
  mounted() {

  },
  methods: {
    getErrorsFor(fieldHandle) {
      return null;
    },
    async submitForm() {
      const formElm = new FormData(
        document.querySelector(".form-wrapper__form")
      );

      // Add action which handles freeform validation
      formElm.append(
        "action",
        "freeform/api/form"
      );

      // Add the form's hash, so that it gets recognized by the form service
      formElm.append("formHash", this.freeform.form.hash);

      // Add the CSRF token if it's enabled for the site
      formElm.append(
        this.freeform.form.csrfToken.name,
        this.freeform.form.csrfToken.value
      );

      try {
        await fetch("https://api.functionandform.co.uk/", {
          method: "POST",
          body: new URLSearchParams([...formElm]),
          headers: {
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest",
            "HTTP_X_REQUESTED_WITH": "XMLHttpRequest",
            "Accept": "application/json",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
          }
        });
      } catch (err) {
        console.error(`Error coud not submit form: ${err}`);
      }
    },
  },
  apollo: {
    freeform: {
      query: GET_FREEFORM,
      variables() {
        return { handle: this.handle };
      },
      error(error) {
        console.log("error", error);
      },
      result({ data }) {
        console.log(data);
      },
    },
  },
};
</script>