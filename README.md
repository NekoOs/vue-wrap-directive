## Install

```shell
npm install --save @nekoos/vue-wrap-directive
```

## Usage

Register the directive

```js
import Vue from "vue"
import Wrap from "@nekoos/vue-wrap-directive"

Vue.use(Wrap);
```

### Component

```html
<div v-wrap="toggle">I am the content</div>
```

When `toogle` is true, render this:
```html
<div>I am the content</div>
```

When `toogle` is false, render this:
```html
I am the content
```