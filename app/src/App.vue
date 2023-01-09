<script setup lang="ts">
import URLForm from "./components/URLForm.vue";
</script>

<template>
  <div class="container">
    <h1>Encurtador de URL</h1>
    <URLForm />
  </div>
</template>

<style scoped>
#app {
  display: block !important;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

h1 {
  font-weight: 700;
  text-align: center;
  letter-spacing: -1px;
  margin-bottom: 1.5rem;
}
</style>
