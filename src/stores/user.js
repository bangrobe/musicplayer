import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'
export default defineStore("user", {
    state: () => ({
        userLoggedIn: false
    }),
    actions: {
        async register(values) {

            const userCred = await auth.createUserWithEmailAndPassword(
                values.email, values.password);
            // Su dung doc(userCred.user.id) để set id lấy từ kết quả trên cho users collection.
            // Nếu chỉ sử dụng usersCollection.add({...}) thì firebase sẽ tự generate ra ID
            await usersCollection.doc(userCred.user.uid).set({
                name: values.name,
                email: values.email,
                age: values.age,
                country: values.country
            });

            await userCred.user.updateProfile({
                displayName: values.name,
            })
            this.userLoggedIn = true;
        },
        async authenticate(values) {
            await auth.signInWithEmailAndPassword(values.email, values.password);

            this.userLoggedIn = true;
        },
        async signOut() {
            
            await auth.signOut();
            this.userLoggedIn = false;
        }
    }
})