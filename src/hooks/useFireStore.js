import { onSnapshot, collection, where, query, orderBy } from '@firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase/config'

const useFireStore = (coll, condition) => {
    const [document, setDocument] = useState([])
    React.useEffect(() => {
        var collectionSnapshot = collection(db, coll)

        if (condition) {
            if (condition.field === "idRoom") {
                collectionSnapshot = query(collectionSnapshot, orderBy("createAt"), where(condition.field, condition.operators, condition.compareValue))
            } else {
                collectionSnapshot = query(collectionSnapshot, orderBy(condition.field), orderBy("createAt"), where(condition.field, condition.operators, condition.compareValue))
            }
        }

        const snap = onSnapshot(collectionSnapshot, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocument(data)
        })

        return (snap)
    }, [coll, condition])

    return document
}

export default useFireStore