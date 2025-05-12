import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase.config.js';
import { v4 as uuidv4 } from 'uuid';
export const getUserByHandle = async (handle) => {
    const snapshot = await get(ref(db, `users/${handle}`))
    if(snapshot.exists()) {
        return snapshot.val()
    }else{
        return null;
    }
}

export const createUserHandle = async (handle, uid, email) => {
    const user = {
        handle,
        uid,
        email,
        createdOn: new Date().toString(),
    };

    console.log(JSON.stringify(user));

    await set(ref(db, `users/${handle}`), user);
};


export const getUserData = async (uid) => {
    const snapshot = await get(query(ref(db,'users', orderByChild('uid'), equalTo(uid))));

    return snapshot.val();
}



export const addGifToFavorites = async (gif) => {
    const id = uuidv4(); 
    await set(ref(db, `favorites/${id}`), gif);
};


export const getFavorites = async () => {
    const snapshot = await get(ref(db, 'favorites'));
    if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data); 
    }
    return [];
};