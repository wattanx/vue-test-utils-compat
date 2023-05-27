import {
  mount as originalMount,
  shallowMount as originalShallowMount,
} from "@vue/test-utils";

export function mount(
  originalComponent: Parameters<typeof originalMount>[0],
  options?: Parameters<typeof originalMount>[1]
): ReturnType<typeof originalMount> {
  throw new Error("mount() is a macro and it did not get transpiled");
}

export function shallowMount(
  originalComponent: Parameters<typeof originalShallowMount>[0],
  options?: Parameters<typeof originalShallowMount>[1]
): ReturnType<typeof originalShallowMount> {
  throw new Error("shallowMount() is a macro and it did not get transpiled");
}
