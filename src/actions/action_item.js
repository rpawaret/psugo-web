import { firestore } from '../database/config'

export const FETCH_ITEMS = 'FETCH_ITEMS'
export const CREATE_ITEM = 'CREATE_ITEM'
export const FETCH_ITEM = 'FETCH_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'
export const UPDATE_ITEM = 'UPDATE_ITEM'

export function fetchItems() {
  return (dispatch) => {
    firestore
      .collection('items')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data())
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
    firestore
      .collection('items')
      .add(item)
      .then((docRef) => {
        // console.log("Document written with ID: ", docRef.id)
        dispatch({
          type: CREATE_ITEM,
          id: docRef.id,
          payload: item
        })
        callback()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function fetchItem(id) {
  return (dispatch) => {
    firestore
      .collection('items')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data())
          dispatch({
            type: FETCH_ITEM,
            id: id,
            payload: doc.data()
          })
        } else {
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function deleteItem(id, callback) {
  return (dispatch) => {
    firestore
      .collection('items')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
        dispatch({
          type: DELETE_ITEM,
          id: id
        })
        callback()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function updateItem(id, data, callback) {
  return (dispatch) => {
    firestore
      .collection('items')
      .doc(id)
      .set(data)
      .then(() => {
        dispatch({
          type: UPDATE_ITEM,
          id: id,
          payload: data
        })
        callback()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
