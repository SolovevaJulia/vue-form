<template>
  <div id="app" class="app-container">
    <button class="open-modal-button" @click="openModal">Открыть форму</button>

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

<style>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f8f8;
}

.open-modal-button {
  display: inline-block;
  padding: 20px 40px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #174B7C;
  border: none;
  border-radius: 100px;
  cursor: pointer;
}
</style>