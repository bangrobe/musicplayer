import { setActivePinia, createPinia } from 'pinia';
import useUserStore from '@/stores/user';

//mock an dependency
//Mocking an promise
vi.mock('@/includes/firebase', ()=> ({
    auth: {
        signInWithEmailAndPassword: ()=> Promise.resolve(),
    }
})); 
describe("stores", ()=> {
    beforeEach(()=> {
        setActivePinia(createPinia());
    })

    test("authenticate user", async ()=> {
        const store = useUserStore();

        expect(store.userLoggedIn).not.toBe(true);
        //authenticate la ham signIn trong pinia
        await store.authenticate({})
        expect(store.userLoggedIn).toBe(true);
    })
})