import { get, set, ref, query, equalTo, orderByChild, remove } from 'firebase/database';
import { db } from '../config/firebase.config.js';
import { getAuth } from 'firebase/auth';

export const getUserByHandle = async (handle) => {
    const snapshot = await get(ref(db, `users/${handle}`));
    return snapshot.exists() ? snapshot.val() : null;
};

export const createUserHandle = async (handle, uid, email, firstName, lastName) => {
    const user = {
        handle,
        firstName,
        lastName,
        uid,
        email,
        createdOn: new Date().toString(),
    };

    await set(ref(db, `users/${handle}`), user);
};

export const getUserData = async (uid) => {
    const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
    return snapshot.val();
};



export const addGifToFavorites = async (gif) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    await set(ref(db, `users/${userId}/favorites/${gif.id}`), gif);
};


export const getFavorites = async () => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return [];

    const snapshot = await get(ref(db, `users/${userId}/favorites`));
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const deleteFavoriteGif = async (gifId) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    await remove(ref(db, `users/${userId}/favorites/${gifId}`));
};
