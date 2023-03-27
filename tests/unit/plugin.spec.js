import scenarios from "./all.scn";

import {createLocalVue, mount} from "@vue/test-utils";
import WrapPlugin from "../../src/index";

// Register plugin in local instance of Vue
const localVue = createLocalVue();
localVue.use(WrapPlugin);

const factory = (component, wrap) => mount(component, {
  localVue,
  propsData: {
    wrap,
  },
});
describe('Plugin Register', () => scenarios(factory));