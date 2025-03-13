<template>
  <div id="app">
    <h1>Тестовое задание</h1>

    <button @click="openModal">Открыть форму</button>

    <ModalForm v-model="isModalOpen" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ModalForm from './components/ModalForm.vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
</script>