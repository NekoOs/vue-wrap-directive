import createWrapDirective from "./directives/wrap";
import WrapPlugin from "./plugins/wrap";

const WrapDirective = createWrapDirective('__wrap__');

export default WrapPlugin;
export {
  WrapDirective,
  createWrapDirective,
};