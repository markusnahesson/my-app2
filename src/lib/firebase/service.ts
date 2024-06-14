import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init";
import bycript from "bcrypt";
import { addDoc } from "firebase/firestore/lite";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signUp(userData: { email: string, fullname: string, password: string, role?: string }, callback: Function) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email));
    console.log(q)
    const snapshot = await getDocs(q);
    console.log(snapshot)
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log(data)
    if (data.length > 0){
        console.log(data)
        callback({status: false, message: "Email already exists"});
    }
    else{
        console.log(userData)
        userData.password = await bycript.hash(userData.password, 10);
        userData.role = "member";
        await addDoc(collection(firestore, "users"), userData).then(() => {
            callback({status: true, message: "Register Success"});  
        }).catch((error) => {
            callback({status: false, message: error});
        })
    }
}