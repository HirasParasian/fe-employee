$(function () {
    generateTab()
})
function generateTab(){
    $('#new-tabs').tabs({
        activate: function (event, ui) {
            var index = ui.newTab.index();
        }
    });
}
const generateTables = (obj) => {
    const dataTable = JSON.parse(localStorage.getItem("firebase_data")); 
    const dataFiltered = JSON.parse(localStorage.getItem("firebase_data")).filter(a=>{if(obj.includes(a.id)){ return a}}); 
    var grid = $("#hierarchicalGrid")
    if(dataFiltered.length <= 0){
        $(grid).empty()
        $("#div-btn-group").hide()
        return 0;
    }else{
        $("#div-btn-group").show()
    }
    grid.on("iggriddatabound", function (event, ui) {
        console.log(ui)
    });
    grid.igHierarchicalGrid({
        width: "100%",
        autoGenerateColumns: false,
        autoCommit:true,
        aggregateTransactions:true,
        dataSource: dataFiltered,
        dataSourceType: "json",
        //caption: "Orders By Employee",
        features: [
            {
                name: "Responsive",
                enableVerticalRendering: false,
                columnSettings: [
                    {
                        columnKey: "Title",
                        classes: "ui-hidden-phone"
                    },
                    {
                        columnKey: "Address",
                        classes: "ui-hidden-phone"
                    }
                ]
            },
            {
                name: "Selection",
                mode: "cell",
                multipleSelection: false,
                touchDragSelect: false, // this is true by default
                multipleCellSelectOnClick: false
            }
            /*
            {
                name: "Sorting",
                inherit: true
            },
            {
                name: "Paging",
                pageSize: 5,
                type: "local",
                inherit: true
            }
            */
        ],
        columns: [
           { key: "loadingEqp", headerText: "Loading Equipment", dataType: "string", width: "20%" },//, hidden: true
           { key: "service", headerText: "Service", dataType: "string", width: "20%" },
           { key: "operator", headerText: "Operator", dataType: "string", width: "20%" },
           { key: "foreman", headerText: "Foreman", dataType: "string", width: "20%" },
           { key: "supervisor", headerText: "Supervisor", dataType: "string", width: "25%" },
           { key: "location", headerText: "Location", dataType: "string", width: "15%" },
           { key: "material", headerText: "Material", dataType: "string", width: "15%" },
           { key: "production", headerText: "Production", dataType: "string", width: "15%" },
           { key: "uom", headerText: "UOM", dataType: "string", width: "15%" },
        ],
        autoGenerateLayouts: false,
        columnLayouts: [
            {
                key: "data",
                autoCommit:true,
                aggregateTransactions:true,
                width: "100%",
                autoGenerateColumns: false,
                primaryKey: "haulingEq",
                columns: [
                    { key: "haulingEq", headerText: "Hauling Eq", dataType: "string", width: "20%" },
                    { key: "operator", headerText: "Operator", dataType: "string", width: "0%", hidden: true },
                    { key: "rit", headerText: "Rit", dataType: "string", width: "20%" },
                    { key: "cap", headerText: "Cap", dataType: "string", width: "20%" },
                    { key: "measurement", headerText: "Measurement", dataType: "string", width: "20%" },
                    { key: "measured", headerText: "Measured", dataType: "string", width: "20%" },
                    { key: "dest", headerText: "Dest", dataType: "string", width: "20%" },
                    { key: "actMeas", headerText: "Act. Meas.", dataType: "string", width: "20%" },
                    { key: "grade", headerText: "Grade", dataType: "string", width: "20%" },
                ],
                features: [
                     {
                         name: "Responsive",
                         enableVerticalRendering: false,
                         columnSettings: [
                             {
                                 columnKey: "ShipAddress",
                                 classes: "ui-hidden-phone"
                             },
                             {
                                 columnKey: "ShipCity",
                                 classes: "ui-hidden-phone"
                             }
                         ]
                     },
                     {
                        name: "Updating",
                        enableAddRow:true,
                        editMode: "row",
                        rowAdding: function(evt, ui) {
                            console.log("SINI")
                            console.log(ui,"added")
                            ui.values.Details = []
                            
                        },
                        editRowEnded: function(evt, ui) {
                            var row = ui.owner.grid.dataSource.dataView()[ui.owner._rowIndex];
                            console.log(ui,"edited")
                            //alert("this is my id column, which is hidden: " + row.id);                  
                        },
                        rowDeleted: function(e, ui) {
                            console.log(ui,"deleted")
                        },
                        enableDeleteRow: true,
                        columnSettings: [
                            { columnKey: "haulingEq", editorOptions: { type: "string", disabled: false} },
                            { columnKey: "operator", editorOptions: { type: "string", disabled: false} },
                            { columnKey: "rit", editorOptions: { type: "string", disabled: false} },
                            { columnKey: "cap", editorOptions: { type: "string", disabled: false} },
                            { columnKey: "measurement", editorOptions: { type: "string", disabled: false} },
                            { columnKey: "measured", editorOptions: { type: "string", disabled: false} },
                            { columnKey: "dest", editorOptions: { type: "string", disabled: false} },
                            { columnKey: "actMeas", editorOptions: { type: "string", disabled: false} },
                            { columnKey: "grade", editorOptions: { type: "string", disabled: false} },
                        ]
                    }
                ],
                updateUrl : "http://mydomain.com/UpdateCustomer"
            }
        ]
    });
  //expanding first parent row in the grid
    // var parentGrid = $("#hierarchicalGrid").igHierarchicalGrid("rootWidget"),
    // rowDomElement = parentGrid.rowAt(0);
    // $("#hierarchicalGrid").igHierarchicalGrid("expand", rowDomElement);

    function countSaoPauloValues(data) {
        var i, l = data.length, count = 0, elem;
        for (i = 0; i < l; i++) {
            elem = data[i];
            if (elem === "Sao Paulo") {
                count++;
            }
        }
        return count;
    }
    function countBergamoValues(data) {
        var i, l = data.length, count = 0, elem;
        for (i = 0; i < l; i++) {
            elem = data[i];
            if (elem === "Bergamo") {
                count++;
            }
        }
        return count;
    }
    $("document").on('iggridupdatingrowadded', '#hierarchicalGrid', function () {
        console.log("MHASOOK")
    })

    // $("#saveChanges").on('click',
    //     function (e) {
    //         //console.log("MASUK")
    //         //grid.commit()
    //         // var childrens = grid.igHierarchicalGrid("allChildren");
    //         // var allTransactions = [];
            
    //         // for (var i = 0; i < childrens.length; i++) {
    //         // var trans = $(childrens[0]).data("igGrid").transactionsAsString();
    //         // allTransactions.push(trans);
    //         // }
    //         // console.log(allTransactions)

    //         var RowSelected = grid.igHierarchicalGrid("option");
    //         console.log(RowSelected.dataSource)
            
            
    //         // var oAllStoneTransactions = [];
    //         // var oMaterialChildren = grid.igHierarchicalGrid("allChildren");
    //         // console.log($(oMaterialChildren[0]).data("igGrid"))

    //         // for(var i= 0; i < oMaterialChildren.length;i++){
    //         //   var oStoneChild = $(oMaterialChildren[i]).data("igGrid").transactionsAsString();
    //         //   oStoneChild = oStoneChild.replace("Width", "ParentID\":\"" + $(oMaterialChildren[i]).data("igGrid").element[0].id + "\", \"Width");
    //         //   oStoneChild.parentId = $(oMaterialChildren[i]).data("igGrid").element[0].id;
    //         //   console.log($(oMaterialChildren[i]).data("igGrid").element[0].id)
    //         //   oAllStoneTransactions.push(oStoneChild);
    //         // }

    //         // console.log(oAllStoneTransactions[0])
    //     }
    // );

    // $("#saveChanges").bind({
    //     click: function (e) {
    //         console.log("MASSSSUKKK")
    //         console.log( $("#hierarchicalGrid").igHierarchicalGrid("dataSourceObject").Records)
    //         $("#hierarchicalGrid").igHierarchicalGrid("saveChanges");

    //        ;   
    //     }    
    // });
}