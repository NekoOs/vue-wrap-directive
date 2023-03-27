import { describe, it, expect } from '@jest/globals'

const scenarios = (factory) => {

  const ChildComponent = {
    template: '<div class="child"><slot></slot></div>',
  }

  describe('The wrapper is one HTML node wrapping one HTML node', () => {
    const ViewComponent = {
      template: '<section><article v-wrap="wrap">Content Wrapped</article></section>',
      props: ['wrap']
    };

    it('render content without wrapper', () => {
      const wrapper = factory(ViewComponent, false)

      expect(wrapper.html()).toBe('<section>Content Wrapped</section>')
    })

    it('render content with wrapper', () => {
      const wrapper = factory(ViewComponent, true)

      expect(wrapper.find('article').exists()).toBe(true)
      expect(wrapper.text()).toBe('Content Wrapped')
    })
  })

  describe('The wrapper is one HTML node wrapping many HTML nodes', () => {
    const ViewComponent = {
      template: '<section><article v-wrap="wrap">Content <b>Complex</b> <span>Wrapped</span></article></section>',
      props: ['wrap']
    };

    it('render content without wrapper', () => {
      const wrapper = factory(ViewComponent, false)

      expect(wrapper.html()).toBe('<section>Content <b>Complex</b> <span>Wrapped</span></section>')
    })

    it('render content with wrapper', () => {
      const wrapper = factory(ViewComponent, true)

      expect(wrapper.text()).toBe('Content Complex Wrapped')
      expect(wrapper.find('article').exists()).toBe(true)
      expect(wrapper.find('b+span').exists()).toBe(true)
    })
  })

  describe('The wrapper is one component node wrapping one HTML node', () => {
    const ViewComponent = {
      template: '<section><ChildComponent v-wrap="wrap">Content Wrapped</ChildComponent></section>',
      props: ['wrap'],
      components: {ChildComponent}
    };

    it('render content without wrapper', () => {
      const wrapper = factory(ViewComponent, false)

      expect(wrapper.html()).toBe('<section>Content Wrapped</section>')
    })

    it('render content with wrapper', () => {
      const wrapper = factory(ViewComponent, true)

      expect(wrapper.text()).toBe('Content Wrapped')
      expect(wrapper.find('div.child').exists()).toBe(true)
    })
  })

  describe('The wrapper is one component node wrapping many HTML node', () => {
    const ViewComponent = {
      template: '<section><ChildComponent v-wrap="wrap">Content <b>Complex</b> <span>Wrapped</span></ChildComponent></section>',
      props: ['wrap'],
      components: {ChildComponent}
    };

    it('render content without wrapper', () => {
      const wrapper = factory(ViewComponent, false)

      expect(wrapper.html()).toBe('<section>Content <b>Complex</b> <span>Wrapped</span></section>')
    })

    it('render content with wrapper', () => {
      const wrapper = factory(ViewComponent, true)

      expect(wrapper.text()).toBe('Content Complex Wrapped')
      expect(wrapper.find('div.child').exists()).toBe(true)
      expect(wrapper.find('b+span').exists()).toBe(true)
    })
  })

};
export default scenarios;