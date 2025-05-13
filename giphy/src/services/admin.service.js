import { ref, remove, get, update } from 'firebase/database';
import { db } from '../config/firebase.config.js';


export const getAllUsers = async () => {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    if(snapshot.exists()) {
        return snapshot.val();
    }else{
        return {};
    }

}

export const deleteUser = async (uid) => {
    const userRef = ref(db, 'users/' + uid);
    await remove(userRef);
}

export const updateUser = async (uid, userData) => {     
    const userRef = ref(db, 'users/' + uid);
    await update(userRef, userData);
}

export const blockUser = async (uid) => {
    await update(ref(db, `users/${uid}`), { isBlocked: true });
}

export const unblockUser = async (uid) => {
    await update(ref(db, `users/${uid}`), { isBlocked: false });
}


export const getAdminData = async (uid) => {
    const snapshot = await get(ref(db, `admins/${uid}`));

    if(snapshot.exists()) {
        const adminData = snapshot.val();
        return adminData;
    }else{
        console.log('No admin data found');
        return null;
    }
};