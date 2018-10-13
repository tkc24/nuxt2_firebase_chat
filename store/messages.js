import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import 'firebase/firestore'
const db = firebase.firestore()

const messagesRef = db.collection('messages')

export const state = () => ({
  messages: []
})

export const getters = {
  messages: state => state.messages
}

export const mutations = {
  ...firebaseMutations
}

export const actions = {
  initMessages: firebaseAction(async ({ bindFirebaseRef }) => {
    await bindFirebaseRef('messages', messagesRef.orderBy('time', 'desc'))
  }),

  addMessageRef: firebaseAction((context, data) => {
    messagesRef.add({
      uid: data.uid,
      text: data.text,
      time: Date.now()
    })
  })
}
