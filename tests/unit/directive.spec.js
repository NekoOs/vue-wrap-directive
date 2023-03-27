import scenarios from "./all.scn";

import {createLocalVue, mount} from '@vue/test-utils';
import {createWrapDirective} from "../../src/index";

// Register directive in local instance of Vue
const localVue = createLocalVue();
localVue.directive('wrap', createWrapDirective('__custom_wrap_key__'));

const factory = (component, wrap) => mount(component, {
  localVue,
  propsData: {
    wrap,
  },
});
describe('Directive Register', () => scenarios(factory));

export default scenarios;
