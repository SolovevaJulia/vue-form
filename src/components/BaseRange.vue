<template>
  <div class="base-range">
    <label v-if="label">{{ label }}</label>
    <div class="inputs">
      <div class="custom-input-container" :class="{ filled: !!modelValue[0] }">
        <span class="input-label">{{ placeholderFromLabel }}</span>
        <input
          :type="type"
          :min="min"
          :max="max"
          :value="modelValue[0]"
          @input="updateValue(0, $event.target.value)"
          :placeholder="placeholderFrom"
        />
        <span class="input-placeholder">{{ minPlaceholder }}</span>
      </div>

      <div class="custom-input-container" :class="{ filled: !!modelValue[1] }">
        <span class="input-label">{{ placeholderToLabel }}</span>
        <input
          :type="type"
          :min="min"
          :max="max"
          :value="modelValue[1]"
          @input="updateValue(1, $event.target.value)"
          :placeholder="placeholderTo"
        />
        <span class="input-placeholder">{{ maxPlaceholder }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [null, null]
  },
  type: {
    type: String,
    default: 'number'
  },
  min: {
    type: [Number, String],
    default: null
  },
  max: {
    type: [Number, String],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  placeholderFrom: {
    type: String,
    default: ''
  },
  placeholderTo: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (index, value) => {
  const updatedValue = [...props.modelValue];
  updatedValue[index] = value;
  emit('update:modelValue', updatedValue);
};
const placeholderFromLabel = computed(() => props.type === 'date' ? 'с' : 'от');
const placeholderToLabel = computed(() => props.type === 'date' ? 'по' : 'до');

const minPlaceholder = computed(() => props.type === 'date' ? '' : props.min);
const maxPlaceholder = computed(() => props.type === 'date' ? '' : props.max);
</script>

<style scoped>
.base-range {
  position: relative;
  margin-top: 15px;
}

.base-range label {
  display: block;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 300;
  color: #174B7C;
}

.inputs {
  display: flex;
  gap: 8px;
}

.custom-input-container {
  position: relative;
  width: calc(50% - 0.5rem);
}

.custom-input-container .input-label {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 300;
  color: #174B7C;
  pointer-events: none;
}

.custom-input-container .input-placeholder {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 18px;
  font-weight: 500;
  color: #174B7C;
  pointer-events: none;
}

.custom-input-container input {
  width: 100%;
  padding: 12px 20px 12px 46px;
  border: 2px solid #F7F8F8;
  border-radius: 6px;
  height: 64px;
}

.custom-input-container.filled .input-label {
  opacity: 0;
  visibility: hidden;
}

.custom-input-container.filled .input-placeholder {
  opacity: 0;
  visibility: hidden;
}
</style>