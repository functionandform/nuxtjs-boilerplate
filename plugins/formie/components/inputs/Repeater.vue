<template>
    <fieldset>
        <div class="call-out-box call-out-box--light">
            <legend v-if="!hideLabel">
                {{ field.label }}<span v-if="field.required" class="red">*</span>
            </legend>

            <field-instructions :field="field"/>
            <transition-group name="repeater" appear @enter="start" @after-enter="end" @before-leave="start" @after-leave="end">
                <fieldset v-for="(row, rIndex) in rows" :key="row.__id" class="repeater">
                    <div class="repeater__container">
                        <fieldset class="repeater__fields">
                            <div class="repeater__fields__item" v-for="(nestedField, fieldIndex) in field.fields" :key="fieldIndex">
                                <component :is="nestedField.displayName" :field="nestedField" :namespace="[field.handle, 'rows', rIndex]" />
                            </div>
                        </fieldset>
                        <div class="repeater__action">
                            <v-button type="button" weight="tertiary" trailing-icon="remove" @click.native.prevent="onDelete(rIndex)"></v-button>
                        </div>
                    </div>
                </fieldset>
            </transition-group>
            <div class="align-center">
                <v-button type="button" weight="tertiary" trailing-icon="add" @click.native.prevent="onAdd">Add row</v-button>
            </div>
        </div>
    </fieldset>
</template>

<script>
import { uniqueId } from 'lodash-es';

import FieldMixin from '../../mixins/FieldMixin';

import AllInputs from './';

export default {
    components: AllInputs,

    mixins: [FieldMixin],

    data() {
        return {
            rows: [],
        };
    },

    methods: {
        onAdd() {
            this.rows.push({
                __id: uniqueId(),
            });
        },

        onDelete(rIndex) {
            this.rows.splice(rIndex, 1);
        },
        open() {
          if (this.visible) {
            this.Accordion.active = null;
          } else {
            this.Accordion.active = this.index;
          }
        },
        start(el) {
            if (el) {
              el.style.height = el.scrollHeight + "px";
          }
        },
        end(el) {
            if (el) {
                el.style.height = "";
            }
        }
    },
};

</script>

<style lang="scss">

    .repeater {
        display:block;
        & + .repeater {
            margin-top:-2px;
        }
        &__container {
            display:flex;
            align-items:center;
            padding:vr(0.5);
        }
       &__fields, &__action {
            padding:vr(0.5);
            p {
                margin-bottom:0;
            }
        }
        &__icon, &__action {
            flex:0 0 auto;
        }
        &__action {
            .button {
                margin-bottom:0;
            }
        }
        &__fields {
            flex:0 1 100%;
            display:flex;
            align-items:center;
            &__item {
                flex:0 1 100%;
            }
        }
    }



.repeater-enter-active {
  transition:transform 0.4s $ease-in-out-expo, height 0.4s $ease-in-out-expo, opacity 0.4s $ease-in-out-expo;
  overflow: hidden;
}

.repeater-leave-active {
  transition:transform 0.4s $ease-in-out-expo 0.4s, height 0.4s $ease-in-out-expo 0.4s, opacity 0.4s $ease-in-out-expo;
  overflow: hidden;
}

.repeater-enter,
.repeater-leave-to {
  height: 0 !important;
  opacity: 0;
  transform:rotate3d(1,0,0,-10deg) scale(0.9);
transform-origin:left bottom;
}
</style>