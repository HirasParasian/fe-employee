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
    console.log(obj.includes('4'))
    console.log(dataTable)
    var grid = $("#hierarchicalGrid")
    grid.igHierarchicalGrid({
        width: "100%",
        autoGenerateColumns: false,
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
    var parentGrid = $("#hierarchicalGrid").igHierarchicalGrid("rootWidget"),
    rowDomElement = parentGrid.rowAt(0);
    $("#hierarchicalGrid").igHierarchicalGrid("expand", rowDomElement);

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

    $("#saveChanges").on('click',
        function (e) {
            console.log("MASUK")
            console.log(grid.igGrid)
            grid.igGrid("saveChanges", function saveSuccess() {
                //loadingIndicator.hide();
            });
            //loadingIndicator.show();
            //$("#undo").igButton("disable");
            //$(this).igButton("disable");
            return false;
        }
    );
}