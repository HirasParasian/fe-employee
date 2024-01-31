
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

    const checkedData = (checkedId,name) => {
        checkedId.forEach(a=>{
            update(ref(db,`Loading/${a}`),{
                editor : name
            }).then(()=>{
                console.log("Data Updated")
                $('#liveToast').show(0).delay(2000).hide(0);
                if(name == ""){
                    $("#liveToast #toast-message").text("Data has been submitted")
                }else{
                    $("#liveToast #toast-message").text("Data has been checked")
                }
            }).catch((err)=>{
                alert("Failed")
                console.log(err)
            })
        })
    }

    const checkData = () => {
        let userAcount = JSON.parse(sessionStorage.getItem('user-info'))
        let checkedId = []
        $(".tbl-CB tbody > tr").each(function(){
            let checked = $(this).find(".form-check-input").is(":checked")
            if(checked){
                let id = $(this).find(".id-box").text()
                checkedId.push(Number(id))
            }
        })
        generateTables(checkedId)
        checkedData(checkedId,userAcount.name)
    }

    let cekData = document.getElementById("check-data")
    cekData.addEventListener('click',checkData)

    const submitLoading =  () => {
        let checkedId = []
        $(".tbl-CB tbody > tr").each(function(){
            let checked = $(this).find(".form-check-input").is(":checked")
            if(checked){
                let id = $(this).find(".id-box").text()
                checkedId.push(Number(id))
            }
        })
        checkedData(checkedId,"")
        let empty = []
        generateTables(empty)
    }

    let submitData = document.getElementById("submit-loading")
    submitData.addEventListener('click',submitLoading)

    const savedChange = () =>{
        let userAcount = JSON.parse(sessionStorage.getItem('user-info'))
        var grid = $("#hierarchicalGrid")
        var RowSelected = grid.igHierarchicalGrid("option","dataSource");
        
        console.log(RowSelected)
        if(RowSelected.length){
            RowSelected.forEach(a=>{
                a.editor = userAcount.name
                update(ref(db,'Loading/'+a.id),
                    a
                ).then(()=>{
                    $('#liveToast').show(0).delay(2000).hide(0);
                    $("#liveToast #toast-message").text("Data has been saved")
                }).catch((err)=>{
                    console.log(err)
                })
            })
        }
    }

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') {
            // Prevent the Save dialog to open
            e.preventDefault();
            // Place your code here
            savedChange()
            console.log('CTRL + S CLICKED');
        }
    });

    let lastFocused = null
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 'a') {
            // Prevent the Save dialog to open
            e.preventDefault();
            let focusedLAst = document.activeElement
            let y = $(focusedLAst).context.toString()
            console.log(focusedLAst)
            if(focusedLAst != undefined && y != '[object HTMLBodyElement]'){
                lastFocused = focusedLAst
            }
            let ids = $(lastFocused).closest(".ui-iggrid-expandcolumn").closest("tr").attr("data-id")
            console.log(ids)
            $(`#ac_${ids} .ui-iggrid-addrow`).click()
            $(`#ac_${ids} .ui-iggrid-donebutton`).click()
            // Place your code here
            //savedChange()
            console.log('CTRL + N CLICKED');
        }
    });
    

    let saveChange = document.getElementById("saveChanges")
    saveChange.addEventListener('click',savedChange)

    