<script setup lang="ts">
import { ref, computed } from "vue";
import RequestResult from "./RequestResult.vue";

const modelURL =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const regex = new RegExp(modelURL);

const modelValue = ref("");
const shortenerURL = ref(null);
const isValidURL = computed(() => regex.test(modelValue.value));
const isInvalidURL = ref(false);

const fetchURL = () => {
  if (isValidURL.value) {
    isInvalidURL.value = false;
    const encodedParams = new URLSearchParams();
    encodedParams.append("url", modelValue.value);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "f0876e5c00msh978f06c7e1d97d1p185bbejsn40303f8dbb77",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch("https://url-shortener-service.p.rapidapi.com/shorten", options)
      .then((r) => r.json())
      .then((r) => (shortenerURL.value = r.result_url))
      .catch((err) => console.error(err));
  } else {
    isInvalidURL.value = true;
  }
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="fetchURL">
      <input
        :class="{ invalid: isInvalidURL }"
        v-model="modelValue"
        type="text"
        placeholder="https://exemplo.com"
        required
      />
      <button type="submit">Encurtar URL</button>
    </form>
    <RequestResult
      :shortenerURL="shortenerURL ? shortenerURL : ''"
      :isValidURL="isValidURL"
      :isInvalidURL="isInvalidURL"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

form {
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  max-width: 100%;
}

form input,
form button {
  display: block;
  border-radius: 0.8rem;
  padding: 1rem;
}

form input {
  color: var(--text-color);
  border: 2px solid transparent;
  box-shadow: 0 2px 1rem var(--grey-shadow);
  transition: 0.5s;
}

form input.invalid {
  border: 2px solid var(--error-color);
}

form input::placeholder {
  color: #c5c5c5;
}

form button {
  font-weight: 500;
  background-color: var(--primary-color);
  color: #fff;
  transition: 0.5s;
  cursor: pointer;
}

form button:hover {
  box-shadow: 0 2px 1rem var(--purple-shadow);
}

@media (max-width: 420px) {
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  form input,
  form button {
    width: 100%;
  }
}
</style>
