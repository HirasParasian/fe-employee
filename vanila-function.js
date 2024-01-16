$(function () {
    let userAcount = JSON.parse(sessionStorage.getItem('user-info'))
    console.log(userAcount)
    if(userAcount == null){
        console.log("Masuk")
        window.location.href = "/login.html"
    }else{
        $("#account-signin").html(userAcount.name)
    }
})
const generateEditor = (obj) => {
    let userAcount = JSON.parse(sessionStorage.getItem('user-info'))
    let data = []
    obj.forEach(a=>{
        data.push({
            ID : a.id ?? "",
            LOADING : a.loadingEqp ?? "",
            EDITOR: a.editor ?? "",
        })
    })
    let bodyCB = ``
    data.forEach(a=>{
        bodyCB += `<tr class="bg-light">
                        <th scope="col" class="px-2" width="5%"><input class="form-check-input ${a.EDITOR ?'ck-readonly' : ''}" type="checkbox" ${userAcount.name == a.EDITOR ? 'checked' : ''} ></th>
                        <th scope="col" class="px-2 id-box" width="40%" style="display:none">${a.ID}</th>
                        <th scope="col" class="px-2" width="40%">${a.LOADING}</th>
                        <th scope="col" class="px-2" width="40%">${a.EDITOR}</th>
                    </tr>`
    })
    $(".tbl-CB tbody").html(bodyCB)
}

const onLogout = () =>{
    sessionStorage.clear()
    window.location.href = "/login.html"
}

$(':checkbox[readonly]').click(function(){
    return false;
});