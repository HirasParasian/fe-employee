
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, get, set,child, update, remove,onValue }from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBVNVvbxwwNSe4PGXsvPt6fnt02eL2Wr0",
    authDomain: "infragistics-ck.firebaseapp.com",
    databaseURL: "https://infragistics-ck-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "infragistics-ck",
    storageBucket: "infragistics-ck.appspot.com",
    messagingSenderId: "203757853179",
    appId: "1:203757853179:web:a401ace8823d69a0fad35e",
    measurementId: "G-RYYKS35443"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase()
const dbRefs = ref(db)
const analytics = getAnalytics(app);


const Register = (evt) => {   
    evt.preventDefault()  
    const dbRef = ref(db)   
    let e_email = document.getElementById("e_email").value
    let e_password = document.getElementById("e_password").value
    let e_name = document.getElementById("e_name").value
    if(!ValidateEmail(e_email) || !ValidatePassword(e_password)){
        alert("Email or Password Outta Line")
        return;
    }
    if(!ValidateField(e_name)){
        alert("Name Empty")
        return 0;
    }
    createUserWithEmailAndPassword(auth,e_email,e_password)
    .then((credential)=>{
        set(ref(db,'user/'+credential.user.uid),{
            email : e_email,
            name : e_name
        })
    }).catch((err)=>{
        alert("Failed Register")
        console.log(err)
    })
    
    
}

const SignIn = (evt) => {   
    evt.preventDefault()  
    const dbRef = ref(db)   
    let e_email = document.getElementById("e_email").value
    let e_password = document.getElementById("e_password").value
    //let e_name = document.getElementById("e_name").value
    signInWithEmailAndPassword(auth,e_email,e_password)
    .then((credential)=>{
        console.log(credential)
        get(child(dbRefs,'user/'+credential.user.uid)).then((snapshot)=>{
            if(snapshot.exists){
                sessionStorage.clear()
                sessionStorage.setItem("user-info",JSON.stringify({
                    name:snapshot.val().name,
                    email:snapshot.val().email,
                    uid:credential.user.id
                }))
            }
            window.location.href = "/index.html"
        })
    }).catch((err)=>{
        alert("Failed Register")
        console.log(err)
    })
    
    
}

const ValidateEmail = (email) => {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    console.log(expression.test(email),"email")
    return expression.test(email)
}
const ValidatePassword = (password) => {
    console.log(password.length>6,"pass")
    return password.length>6
}
const ValidateField = (field) => {
    return field != null && field.length > 0
}

let regis = document.getElementById("e_register")
regis.addEventListener('click',SignIn)