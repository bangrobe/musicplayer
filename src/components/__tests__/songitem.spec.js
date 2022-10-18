import SongItem from '@/components/SongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect } from 'vitest';

describe('SongItem.vue', ()=> {
    test('render song.display_name', ()=> {
        const song = {
            display_name: 'test',

        }
        const wrapper = shallowMount(SongItem, {
            propsData: {
                song,
            },
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });

        const compositionAuthor = wrapper.find('.text-gray-500');


        expect(compositionAuthor.text()).toBe(song.display_name);
    });

    //Test attributes
    // Khi test se tao ra component moi, đây là điều cần thiết để đảm bảo test chính xác
    test('render song.docId in id attribute', ()=> {
        const song = {
            docId: 'abc'
        }
        const wrapper = shallowMount(SongItem, {
            propsData: {
                song,
            },
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });

        const compositionAuthor = wrapper.find('.text-gray-500');

        //wrapper represent the component
        //it retrieves the attributes on the root element of the element
        // Nếu id ="`song-id-${song.docId}`" ko phải ở root mà nằm ở child element thì test sẽ báo lỗi
        // expect(wrapper.attributes().id).toBe(`song-id-${song.docId}`);
        // Test class. wrapper.classes trả về các classes. toContain là test trong các giá trị trả về có chứa giá trị cần test
        expect(wrapper.classes()).toContain(`song-id-${song.docId}`)
    });
})