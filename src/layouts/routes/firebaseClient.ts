import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyAxsjHjKEcLrxL3hra3tBljBdQi_GWUkVk',
  authDomain: 'rikirhino-4c1c6.firebaseapp.com',
  projectId: 'rikirhino-4c1c6',
  storageBucket: 'rikirhino-4c1c6.appspot.com',
  messagingSenderId: '193661373094',
  appId: '1:193661373094:web:0aa31f91e5f2e40868c267',
  measurementId: 'G-YK1Q64GYN8',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
