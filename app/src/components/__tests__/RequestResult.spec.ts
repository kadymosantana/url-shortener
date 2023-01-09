import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import RequestResult from "@/components/RequestResult.vue";

describe("RequestResult", async () => {
  const wrapper = mount(RequestResult);

  it("With a valid URL, when submitting the form the component must have the 'Copiar'  button on the interface", async () => {
    await wrapper.setProps({
      shortenerURL: "https://google.com",
      isInvalidURL: false,
    });

    expect(wrapper.text()).contains("Copiar");
  });

  it("With an invalid URL, when submitting the form the component must have an error message and must not have the 'Copiar' button in the interface", async () => {
    await wrapper.setProps({
      shortenerURL: "invalid URL",
      isInvalidURL: true,
    });
    
    expect(wrapper.text()).contains("URL inválido");
    expect(wrapper.text()).not.contains("Copiar");
  });
});
