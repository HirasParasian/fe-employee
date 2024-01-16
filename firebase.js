
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
    const db = getDatabase()

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

    const checkedData = (checkedId) => {
        let userAcount = JSON.parse(sessionStorage.getItem('user-info'))
        checkedId.forEach(a=>{
            update(ref(db,`Loading/${a}`),{
                editor : userAcount.name
            }).then(()=>{
                console.log("Data Updated")
            }).catch((err)=>{
                alert("Failed")
                console.log(err)
            })
        })
    }

    const checkData = () => {
        let checkedId = []
        $(".tbl-CB tbody > tr").each(function(){
            let checked = $(this).find(".form-check-input").is(":checked")
            if(checked){
                let id = $(this).find(".id-box").text()
                checkedId.push(Number(id))
            }
        })
        generateTables(checkedId)
        checkedData(checkedId)
    }

    let cekData = document.getElementById("check-data")
    cekData.addEventListener('click',checkData)