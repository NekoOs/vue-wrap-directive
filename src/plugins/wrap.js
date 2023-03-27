import {createWrapDirective} from "../index";
export default {
    install(Vue, {key = '__wrap__'} = {}) {
        Vue.directive('wrap', createWrapDirective(key));
    },
};