import { firestore } from '../database/config'
import { parseToFireItem } from '../utils'
export const FETCH_ITEMS = 'FETCH_ITEMS'
export const CREATE_ITEM = 'CREATE_ITEM'


export function fetchItems() {
    return (dispatch) => {
        firestore.collection('items').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data())
                dispatch({
                    type: FETCH_ITEMS,
                    id: doc.id,
                    payload: doc.data()
                })
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function createItem(item, callback) {
    return (dispatch) => {
        const parsedItem = parseToFireItem(item)
        firestore.collection('items').add(parsedItem)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            dispatch({
                type: CREATE_ITEM,
                id: docRef.id,
                payload: parsedItem
            })
            callback()
        })
        .catch((error) => {

        })
    }
}
