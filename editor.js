function clientCategoryEditor(container, options) {
    console.log(options)
    $('<input required name="Operator">')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: true,
            filter: "contains",
            optionLabel: 'Operator',
            dataTextField: "OperatorName",
            dataValueField: "OperatorID",
            change:ChangeFunction,
            dataSource: {
                data: datac
            }
        });
}
function ProvinsiEditor(container, options) {
    console.log(options)
    let provinsi = KOTA_DATA.map(e=>{
        return {
            ProvName: e.provinsi,
            ProvID: e.provinsi
        }
    })
    $('<input required name="Provinsi">')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: true,
            filter: "contains",
            optionLabel: 'Provinsi',
            dataTextField: "ProvName",
            dataValueField: "ProvID",
            change:ChangeFunction,
            dataSource: {
                data: provinsi
            }
        });
    console.log(options)
}
function KotaEditor(container, options) {
    let provinsi = options.model.Provinsi.ProvName
    console.log(options.model)
    let kota = KOTA_DATA.filter(e=>{
        if(e.provinsi == provinsi){
            return e.kota
        }
    })
    let kota_data = kota[0].kota.map(e=>{
        return {
            KotaName: e,
            KotaID: e
        }
    })
    $('<input required name="Kota">')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: true,
            filter: "contains",
            optionLabel: 'Kota',
            dataTextField: "KotaName",
            dataValueField: "KotaID",
            change:ChangeFunction,
            dataSource: {
                data: kota_data
            }
        });
    console.log(options)
}


const StartHourEditor = (container,options) =>{
    $('<input required name="' + options.field + '"/>')
    .appendTo(container)
    .kendoTimePicker({
        dateInput: true,

  });
}

function showhideDate(e){
    var grid = $("#grid").data("kendoGrid");
    console.log(grid.dataItem(this.element.closest("tr")))
    console.log(e)
  }