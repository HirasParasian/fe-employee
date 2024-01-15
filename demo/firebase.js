
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


    let idc = document.getElementById("idc")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let username = document.getElementById("username")
    let add = document.getElementById("add")
    let updates = document.getElementById("update")
    let deletes = document.getElementById("delete")
    let refs = document.getElementById("refs")


    const addData = () => {
        console.log("ADD")
        set(ref(db,'Loading/'+idc.value),{
            Email : email.value,
            Password : password.value,
            Username : username.value,
        }).then(()=>{
            alert("Data Added")
        }).catch((err)=>{
            alert("Failed")
            console.log(err)
        })
    }

    const addDummyData = () => {
        set(ref(db,'Loading/'+'7'),{
            loadingEqp : "CE6164 - 6026",
            service : "OVERBURDEN",
            operator : "YOHANES BENI WIJAYA",
            foreman : 3714,
            supervisor : 3714,
            location : "PIT KGB",
            material : "OVERBUDEN",
            production : 329.22,
            uom:"test",
            data : [
                {
                    haulingEq : "CO4582 - 789",
                    Operator: {
                        OperatorID: 1,
                        OperatorName: "Syaifullah - 11"
                    },
                    OperatorID: 1,
                    Provinsi : {
                        ProvID : "Aceh",
                        ProvName : "Aceh"
                    },
                    Kota : {
                        KotaID :  "Kota Banda Aceh",
                        KotaName :  "Kota Banda Aceh",
                    },
                    start_hour:1,
                    end_hour:2,
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:"C"
                },
                {
                    haulingEq : "CO4582 - 790",
                    operator : "Wijaya Agung - 11",
                    Operator: {
                        OperatorID: 2,
                        OperatorName: "Wijaya Agung - 11"
                    },
                    OperatorID: 2,
                    Provinsi : {
                        ProvID : "Aceh",
                        ProvName : "Aceh"
                    },
                    Kota : {
                        KotaID :  "Kota Banda Aceh",
                        KotaName :  "Kota Banda Aceh",
                    },
                    start_hour:1,
                    end_hour:2,
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:"D"
                }
            ]
        })
    }

    const retData = () =>{
        const dbRef = ref(db)
        get(child(dbRef,'Loading/'+ idc.value)).then((snapshot)=> {
            if(snapshot.exists()){
                email.value = snapshot.val().Email
                password.value = snapshot.val().Password
                username.value = snapshot.val().Username
            }else{
                alert("no exist")
            }
        })
    }

    const updateData = () => {
        update(ref(db,'Loading/'+idc.value),{
            Email : email.value,
            Password : password.value,
            Username : username.value,
        }).then(()=>{
            alert("Data Updated")
        }).catch((err)=>{
            alert("Failed")
            console.log(err)
        })
    }

    
    const deleteData = () => {
        remove(ref(db,'Loading/'+idc.value)).then(()=>{
            alert("Data Deleted")
        }).catch((err)=>{
            alert("Failed")
            console.log(err)
        })
    }

    // add.addEventListener('click',addDummyData)
    // updates.addEventListener('click',updateData)
    // deletes.addEventListener('click',deleteData)



    const dataRealtime = () => {
        const dbRef = ref(db,'Loading')

        onValue(dbRef,(snapshot)=>{
            var data = [];
            snapshot.forEach(a=>{
                data.push(a.val())
            })
            generateEditor(data)
            localStorage.setItem("firebase_data", JSON.stringify(data)); 
            //generateTables(data)
        })
    }

    const getDataAll = () => {
        const dbRef = ref(db,'Loading')

        get(dbRef,(snapshot)=>{
            var data = [];
            snapshot.forEach(a=>{
                data.push(a.val())
            })
            return data;
            //generateTables(data)
        })
    }

    window.onload = dataRealtime;