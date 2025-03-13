<template>
  <div class="base-select">
    <label v-if="label" :class="{ active: isActive || isFilled }">{{ label }}</label>
    <select
      v-if="!multiple"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isActive = true"
      @blur="isActive = false"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <select
      v-else
      multiple
      :value="modelValue"
      @input="$emit('update:modelValue', Array.from($event.target.selectedOptions, option => option.value))"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const isActive = ref(false);

const isFilled = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0;
  }
  return !!props.modelValue;
});
</script>

<style scoped>
.base-select {
  position: relative;
  margin-top: 15px;
}

.base-select label {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 14px;
  font-weight: 300;
  color: #174B7C;
  pointer-events: none;
}

.base-select label.active {
  background: #ffffff;
}

.base-select select {
  width: 100%;
  padding: 33px 20px 10px 20px;
  border: 2px solid #F7F8F8;
  border-radius: 6px;
  height: 64px;
  color: #174B7C;
}

.base-select select:focus {
  outline: none;
}
</style>