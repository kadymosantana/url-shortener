<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const props = defineProps({
  shortenerURL: String,
  isValidURL: Boolean,
  isInvalidURL: Boolean,
});

const { copy, copied } = useClipboard();
</script>

<template>
  <Transition mode="out-in">
    <div
      class="result-container"
      v-if="props.shortenerURL && !props.isInvalidURL"
    >
      <a target="_blank" :href="props.shortenerURL" v-if="props.shortenerURL">{{
        props.shortenerURL
      }}</a>
      <button @click="copy(props.shortenerURL)">
        {{ copied ? "Copiado!" : "Copiar" }}
      </button>
    </div>
  </Transition>
  <Transition mode="out-in">
    <span class="error-feedback" v-if="props.isInvalidURL">URL inválido.</span>
  </Transition>
</template>

<style scoped>
.result-container {
  position: absolute;
  bottom: -5.5rem;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  background-color: var(--primary-color);
  border-radius: 0.8rem;
  padding: 1rem;
}

.result-container a,
.result-container button {
  background-color: var(--secondary-color);
  color: #fff;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.result-container a {
  display: inline-block;
  font-size: 1rem;
}

.error-feedback {
  position: absolute;
  bottom: -2rem;
  left: 0;
  color: var(--error-color);
}

@media (max-width: 420px) {
  .result-container {
    grid-template-columns: 1fr;
    bottom: -8.5rem;
  }

  .error-feedback {
    bottom: -2.5rem;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
