$(function () {
    let userAcount = JSON.parse(sessionStorage.getItem('user-info'))
    console.log(userAcount)
    if(userAcount == null){
        console.log("Masuk")
        window.location.href = "/login.html"
    }
})
const generateEditor = (obj) => {
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
                        <th scope="col" class="px-2" width="5%"><input class="form-check-input" type="checkbox" ${a.EDITOR ?'disabled' : ''}></th>
                        <th scope="col" class="px-2 id-box" width="40%" style="display:none">${a.ID}</th>
                        <th scope="col" class="px-2" width="40%">${a.LOADING}</th>
                        <th scope="col" class="px-2" width="40%">${a.EDITOR}</th>
                    </tr>`
    })
    $(".tbl-CB tbody").html(bodyCB)
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
}