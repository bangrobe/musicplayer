import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import SongItem from '@/components/SongItem.vue'

describe('Snapshots SongItem.vue', ()=> {
    test('renders correctly', ()=> {
        const song = {
            docId: 'abc',
            modified_name: 'test',
            display_name: 'test',
            comment_count: 5
        }

        const wrapper = shallowMount(SongItem, {
            propsData: {song},
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });
        //Tạo ra một file snapshot trong lần test đầu tiên
        // Nếu thay đổi component thì khi test sẽ so sánh với snapshot được tạo ra
        expect(wrapper.element).toMatchSnapshot();
    });
});