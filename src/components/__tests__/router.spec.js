//Test router-link in component

import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('Router', () => {
    test('render router link', () => {
        const song = {
            docId: 'abc'
        }

        const wrapper = shallowMount(SongItem, {
            propsData: {
                song
            },
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });

        //Find one component in wrapper
        expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({ name: 'song', params: { id: song.docId } });
    });
})