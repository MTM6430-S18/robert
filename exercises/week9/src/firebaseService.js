import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'mtm6430-w18',
  databaseURL: 'https://mtm6430-w18.firebaseio.com'
})

export const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})
