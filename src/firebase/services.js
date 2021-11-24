import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './config'

export const addDocument = async (coll, data) => {
    return await addDoc(collection(db, coll), {
        ...data,
        createAt: serverTimestamp()
    })
}


export const updateRoom = async (id, dataUpdate) => {
    const roomRef = doc(db, "rooms", id);
    await updateDoc(roomRef, {
        members: dataUpdate
    });
}