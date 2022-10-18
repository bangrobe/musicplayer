import { describe, expect, test } from 'vitest'
import About from '@/views/About.vue';
import { shallowMount } from '@vue/test-utils'
/// mount will convert component options object into a constructor function
//Group one or more test together
// mount vs shallowMount
describe('About.vue', ()=> {
    test('render inner test', ()=> {
        const wrapper = shallowMount(About);

        expect(wrapper.text()).toContain('about');
    })
})