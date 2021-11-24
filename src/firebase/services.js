import { addDoc, collection, doc, serverTimestamp, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'
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

export const getdata = async (coll, id)=> {
    const document = doc(db, coll, id)
    const value = await getDoc(document)
    const data = await value.data()
    return data
}

export const deteteData = async (coll, id)=> {
    const document = doc(db, coll, id)
    await deleteDoc(document)
}