<template>
  <VueFinalModal v-model="internalValue">
    <div class="modal-content">
      <h2>Заполните заявку, чтобы стать резидентом</h2>

      <form @submit.prevent="onSubmit">
        <div class="custom-input">
          <label for="name">Наименование организации / ИП</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="ООО «Абсолют»"
          />
        </div>
        <ErrorMessage name="name" class="error-message" />

        <div class="custom-input">
          <label for="phone">Контактный телефон</label>
          <input
            id="phone"
            v-model="phone"
            v-mask="'+# (###) ###-##-##'"
            type="text"
            placeholder="+7 (900) 123-45-67"
            @input="formatPhone"
          />
        </div>
        
        <ErrorMessage name="phone" class="error-message" />

        <BaseSelect
          id="type"
          v-model="type"
          :options="typeOptions"
          label="Тип помещения"
        />
        <ErrorMessage name="type" class="error-message" />

        <div class="custom-input">
          <label for="address">Адрес</label>
          <input
            id="address"
            v-model="address"
            type="text"
          />
        </div>
        
        <ErrorMessage name="address" class="error-message" />

        <BaseRange
          id="area"
          v-model="area"
          type="number"
          :min="120"
          :max="400"
          label="Площадь помещения (м²)"
        />
        <ErrorMessage name="area" class="error-message" />

        <BaseRange
          id="date"
          v-model="date"
          type="date"
          label="Дата начала аренды"
          placeholderFrom="01.02.2023"
          placeholderTo="31.12.2024"
        />
        <ErrorMessage name="area" class="error-message" />

        <div class="buttons">
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>
  </VueFinalModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useField, useForm, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import BaseSelect from './BaseSelect.vue';
import BaseRange from './BaseRange.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const closeModal = () => {
  internalValue.value = false;
  emit('update:modelValue', false);
};

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Обязательное поле'),
    phone: yup
      .string()
      .matches(/^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона')
      .required('Обязательное поле'),
    type: yup.string().required('Обязательное поле'),
    address: yup.string().required('Обязательное поле'),
    area: yup.array().of(
      yup.number()
        .typeError('Значение должно быть числом')
        .min(120, 'Минимальная площадь 120')
        .max(400, 'Максимальная площадь 400')
        .test(
          'not-empty',
          'Поле не должно быть пустым',
          (value) => value !== null && value !== undefined && value !== ''
        )
    ).required('Обязательное поле'),
    date: yup.array().of(
      yup.string()
        .required('Обязательное поле')
    ).required('Обязательное поле')
  })
});

const { value: name } = useField('name');
const { value: phone } = useField('phone');
const { value: type } = useField('type');
const { value: address } = useField('address');
const { value: area } = useField('area', () => [null, null]);
const { value: date } = useField('date', () => [null, null]);

const typeOptions = [
  { value: 'office', label: 'Офис' },
  { value: 'warehouse', label: 'Склад' },
  { value: 'retail', label: 'Торговая площадь' }
];

const formatPhone = () => {
  let rawPhone = phone.value.replace(/\D/g, '');
  if (rawPhone.startsWith('7') || rawPhone.startsWith('8')) {
    rawPhone = '7' + rawPhone.slice(1);
  }
  const formattedPhone = `+${rawPhone.slice(0, 1)} (${rawPhone.slice(1, 4)}) ${rawPhone.slice(4, 7)}-${rawPhone.slice(7, 9)}-${rawPhone.slice(9, 11)}`;
  phone.value = formattedPhone;
};

const onSubmit = handleSubmit(async (values) => {

  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', values);

    if (response.status === 201) {
      alert('Форма успешно отправлена!');
      closeModal();
    } else {
      throw new Error('Ошибка при отправке данных');
    }
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    alert('Произошла ошибка при отправке формы. Попробуйте позже.');
  }
});
</script>

<style scoped>
.modal-content {
  background: #ffffff;
  padding: 30px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
}

.buttons {
  text-align: center;
  margin-top: 40px;
}

button {
  background: #174B7C;
  color: white;
  border: none;
  padding: 8px 40px;
  border-radius: 1000px;
  cursor: pointer;
  font-size: 14px;
  width: 160px;
}

button:hover {
  background: #002855;
}

button[type='button'] {
  background: #ccc;
  color: #333;
}

button[type='button']:hover {
  background: #bbb;
}

.custom-input {
  position: relative;
  margin-top: 15px;
}

.custom-input label {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 14px;
  font-weight: 300;
  color: #174B7C;
  pointer-events: none;
}

.custom-input input {
  width: 100%;
  padding: 33px 20px 10px 20px;
  border: 2px solid #F7F8F8;
  border-radius: 6px;
  height: 64px;
}

.custom-input input:focus,
.custom-input input:not(:placeholder-shown) {
  outline: none;
}

input::placeholder {
  color: #174B7C;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 2px;
}
</style>