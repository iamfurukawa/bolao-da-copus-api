import { initializeApp } from 'firebase/app'
import { v4 as uuidv4 } from 'uuid';
import {
    getFirestore,
    CollectionReference,
    collection,
    DocumentData,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc
} from 'firebase/firestore'

import { Bet } from '../../business/bet.interface';
import { Classification } from '../../business/classification.interface';
import { User } from '../../business/users.interface'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCqZqCbRkxthU9uP1rw-SttMy_ll3cUUpI",
    authDomain: "bolao-da-copus.firebaseapp.com",
    projectId: "bolao-da-copus",
    storageBucket: "bolao-da-copus.appspot.com",
    messagingSenderId: "818737471609",
    appId: "1:818737471609:web:d6917a61aa6142849274a8",
    measurementId: "G-WQ6FBWNLLK",
})

export const firestore = getFirestore()

const USERS = 'users'

const BETS = 'bets'

const CLASSIFICATION = 'classification'

const createCollection = <T = DocumentData>(collectionName: string) => collection(firestore, collectionName) as CollectionReference<T>

const usersCol = createCollection<User>(USERS)

const betCol = createCollection<Bet>(BETS)

const classificationCol = createCollection<Classification>(CLASSIFICATION)

/*
    Classification Repository
*/
export const getClassification = async () => getDocs(query(classificationCol))

/*
    User Repository
*/
export const saveBet = async (bet: Bet) => setDoc(doc(firestore, BETS, uuidv4()), bet)

export const updateBet = async (bet: Bet, id: string) => updateDoc(doc(firestore, BETS, id), { ...bet })

export const getBetByUser = async (userId: string) =>
    getDocs(query(
        betCol,
        where("userId", "==", userId)
    ))

export const getBetByUserAndGame = async (userId: string, gameId: string) =>
    getDocs(query(
        betCol,
        where("userId", "==", userId),
        where("gameId", "==", gameId)
    ))

export const getAllBets = async () => getDocs(query(betCol))

/*
    User Repository
*/
export const saveUser = async (user: User) => setDoc(doc(firestore, USERS, uuidv4()), user)

export const getUser = async (document: string, passwordHash: string) =>
    getDocs(query(
        usersCol,
        where("document", "==", document),
        where("password", "==", passwordHash)
    ))

export const getUserByDocument = async (document: string) =>
    getDocs(query(
        usersCol,
        where("document", "==", document)
    ))

