$(function () {
    generateTab()
    var PROVS_DATA = PROVINSI_DATA
})
function generateTab(){
    $('#new-tabs').tabs({
        activate: function (event, ui) {
            var index = ui.newTab.index();
        }
    });
}
const generateTables = (obj) => {
    try{
        
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
                    multipleCellSelectOnClick: false,
                    cellSelectionChanged: function (evt, ui) {
                        let rowId = ui.cell.rowId
                        let provinsi = ui.owner.grid.tmpDataSource.filter(a=>{return a.haulingEq == rowId })
                        provinsi = provinsi.length?provinsi[0].ProvinsiName : ""
                        //[0].ProvinsiName ?? ""
    
                        var childGrids = $('#hierarchicalGrid').igHierarchicalGrid('allChildren');
                        if(provinsi != ""){
                            let kota = KOTA_DATA.filter(e=>{
                                if(e.provinsi == provinsi){
                                    return e.kota
                                }
                            })
                            // console.log(kota)
                            console.log(kota[0].kota)

                            for (var i = 0; i < childGrids.length; i++) {
                                $(childGrids[i]).data(
                                  'igGrid'
                                ).options.features[0].columnSettings[2].editorOptions.dataSource =
                                  kota[0].kota;
                
                                x = $('.ui-igcombo-listitem[data-value*=Kab]');
                                if (x) {
                                  y = x.parent();
                                  y.empty();
                                  kota[0].kota.forEach((el) =>
                                    y.append(
                                      `<li class="ui-igcombo-listitem ui-state-default ui-unselectable" data-value="${el}" unselectable="on">${el}</li>`
                                    )
                                  );
                
                                  let index = $ig.util.widgetStack.findIndex(
                                    (el) =>
                                      el?.options?.dataSource?._data?.filter((el) =>
                                        el?.text?.includes('Kab')
                                      )?.length > 0
                                  );
                                  console.log('index widget stack', index);
                
                                  $ig.util.widgetStack[index].options.dataSource._data =
                                    kota[0].kota.map((el) => ({ text: el, value: el }));
                                }
                              }
                            // console.log(childGrids)
                            // for (var i = 0; i < childGrids.length; i++) {
                            //     //console.log("TEST -------",i)
                            //     //console.log($(childGrids[i]).data("igGridUpdating").options.columnSettings[2].editorOptions.dataSource = kota[0].kota)
                            //     // editor.deselectAll({}, true);
                            //     // editor.dataSource = [];
                            //     // editor.dataBind();
                            //     // editor.options.disabled = true;
                            //     //var transk = $(childGrids[i]).data("igGrid").options.features[0].columnSettings[2].editorOptions.deselectAll({}, true);
                            //     //$(childGrids[i]).data("igGrid").options.features[0].columnSettings[2].editorOptions.dataSource = ['Bekasi','Testing']
                            //     //$(childGrids[i]).data("igGrid").options.features[0].columnSettings[2].dataBind()
                            //     //debugger

                            //     //cuman bisa 1 kali ngisi dataSource
                            //     //$(childGrids[i]).data("igGridUpdating").options.columnSettings[2].editorOptions.dataSource = kota[0].kota
                            //     $(childGrids[i]).data("igGrid").options.features[0].columnSettings[2].editorOptions.dataSource = kota[0].kota
                            //     //console.log('tes ====>', kota[0])
                            //     //$(childGrids[i]).data("igGrid").commit();
                            //     //$(childGrids[i]).data("igGridUpdating").commit();
                            //     //$(childGrids[i]).data("igGridUpdating").options.columnSettings[2].editorOptions.dataSource = ['Bekasi','Testing']
                            //     //$(childGrids[i]).data("igGrid").options.features[0].columnSettings[2].dataBind()
                            // }
                        }
                    }
                },
                {
                    name: "Updating",
                    enableAddRow:false,
                    editMode: "cell",
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
                    width: "1000px",
                    autoGenerateColumns: false,
                    primaryKey: "haulingEq",
                    columns: [
                        { key: "haulingEq", headerText: "Hauling Eq", dataType: "string", width: "200px" },
                        { key: "ProvinsiName", headerText: "Provinsi", dataType: "string", width: "200px",cssClass:"cellProv" },
                        { key: "CityName", headerText: "Kota", dataType: "string", width: "200px" },
                        { key: "operator", headerText: "Operator", dataType: "string", width: "200px", hidden: true },
                        { key: "rit", headerText: "Qty", dataType: "string", width: "200px" },
                        { key: "cap", headerText: "Price", dataType: "string", width: "200px" },
                        { 
                            headerText: "Total",
                            key: "Total",
                            dataType: "string",
                            readOnly:true,
                            unbound: true,
                            formula: function(row, grid) { 
                                return Number(row.rit) * Number(row.cap); 
                            },
                            width:'200px'
                        },
                        { key: "measurement", headerText: "Measurement", dataType: "string", width: "200px" },
                        { key: "measured", headerText: "Measured", dataType: "string", width: "200px" },
                        { key: "dest", headerText: "Dest", dataType: "string", width: "200px" },
                        { key: "actMeas", headerText: "Act. Meas.", dataType: "string", width: "200px" },
                        { key: "grade", headerText: "Grade", dataType: "string", width: "200px" },
                    ],
                    features: [
                        //  {
                        //      name: "Responsive",
                        //      enableVerticalRendering: false,
                        //      columnSettings: [
                        //          {
                        //              columnKey: "ShipAddress",
                        //              classes: "ui-hidden-phone"
                        //          },
                        //          {
                        //              columnKey: "ShipCity",
                        //              classes: "ui-hidden-phone"
                        //          }
                        //      ]
                        //  },
                        
                        //Pindah Kolom
                        // {
                        //     name: "ColumnMoving",
                        //     columnMovingDialogContainment: "window"
                        // },
                        {
                            name: "Updating",
                            enableAddRow:true,
                            editMode: "cell",
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
                                { 
                                    columnKey: "ProvinsiName",
                                    editorType: "combo",
                                    editorOptions: {
                                        dataSource: PROVINSI_DATA,
                                        //selectionChanged: countryChanged
                                    },
                                },
                                { 
                                    columnKey: "CityName",
                                    editorType: "combo",
                                    //editorProvider: new $.ig.EditorProviderCombo(),
                                    editorOptions:{
                                        // checkValue: function (evt, ui) {
                                        //     console.log(ui)
                                        // },
                                        //dataSource:null,
                                        dataSource: KOTA_DATA[0].kota,
                                    }
                                    // editorOptions: {
                                    //     dataSource: KOTA_DATA.map(e=>{
                                    //         return e.provinsi
                                    //     }),
                                    // }
                                },
                                { columnKey: "operator", editorOptions: { type: "string", disabled: false} },
                                { columnKey: "rit", editorOptions: { type: "string", disabled: false} },
                                { columnKey: "cap", editorOptions: { type: "string", disabled: false} },
                                { columnKey: "measurement", editorOptions: { type: "string", disabled: false} },
                                { columnKey: "measured", editorOptions: { type: "string", disabled: false} },
                                { columnKey: "dest", editorOptions: { type: "string", disabled: false} },
                                { columnKey: "actMeas", editorOptions: { type: "string", disabled: false} },
                                { columnKey: "grade", editorOptions: { type: "string", disabled: false} },
                            ],
                            // editCellStarting: function(evt, ui){
                            // 	cellToCompareVal = ui.owner.grid.getCellValue(ui.rowID, "ProvinsiName");
                            //     console.log(ui)
                            //     console.log(cellToCompareVal)
                            //     return 0
                            //     if(ui.columnKey == "CityName"){
                            //         console.log("CITYY")
                            //         var childGrids = $('#hierarchicalGrid').igHierarchicalGrid('allChildren');
                            //         let kota = KOTA_DATA.filter(e=>{
                            //             if(e.provinsi == cellToCompareVal){
                            //                 return e.kota
                            //             }
                            //         })
                            //         for (var i = 0; i < childGrids.length; i++) {
                            //             var trans = $(childGrids[0]).data("igGrid").options.features[0].columnSettings[2].editorOptions.dataSource = kota[0].kota
                            //             console.log(trans)
                            //             //allTransactions.push(trans);
                            //         }
                            //     }
                            // 	// if(ui.columnKey == "FirstName" && cellToCompareVal !== "Sofia" ) {
                            // 	// 	return false;
                            // 	// }
                            // }
                        },
                        // {
                        //     name: "ColumnFixing",
                        //     fixingDirection: "left",
                        //     // columnFixing: function (evt, args) { 
                        //     //     console.log(evt)
                        //     //     console.log(args)
                        //     //  }
                        //     columnSettings: [
                        //         {
                        //             columnKey: "Total",
                        //             isFixed: false,
                        //             allowFixing: false,
                        //         }
                        //     ]
                        // }
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
    
    
            /*----------------- Method & Option Examples(Hierarchical Grid) -------------------*/
    
        //function for expanding/collapsing all rows on all levels in the igHierarhicalGrid
        function expandCollapseRowsPerGrid($gridElement, action, level, callback) {
            var _root = $gridElement.data("igHierarchicalGrid") || $gridElement.closest(".ui-iggrid-root").data("igHierarchicalGrid");
            //get all rows in the grid that are not child grid container
            var rows = $gridElement.children('tbody').find('>tr:not([data-container])');
            var rowsCount = rows.find("span.ui-iggrid-expandbutton").length;
            var gridChildElements = [];
            var index = 0;
            //Callback function used for the expand/collapse methods.
            //Recursively loops through the child grids and calls expandCollapseRowsPerGrid for each.
            var callbackFuncToggled = function (hGrid, $tr) {
                var dataRowContainer, $trContainer = $tr.next('tr');
                if ($trContainer.attr('data-container')) {
                    gridChildElements.push($trContainer.find('table[data-childgrid]'));
                }
                if (++index === rowsCount) {
                    $.each(gridChildElements, function (ind, elem) {
                        expandCollapseRowsPerGrid(elem, action, level + 1, callback);
                    });
                    callback(gridChildElements, $tr, level)
                }
            };
    
            rows.each(function (ind, row) {
                var $row = $(row);
                if ((_root.expanded($row) && action === 'expand') ||
                        (_root.collapsed($row) && action === 'collapse')) {
                    callbackFuncToggled(_root, $row);
                } else {
                    if (action === 'expand') {
                        _root.expand($row, callbackFuncToggled)
                    } else {
                        _root.collapse($row, callbackFuncToggled)
                    }
                }
            });
        }
    
        $("#buttonExpandAll").igButton({
            labelText: $("#buttonExpandAll").val(),
            click: function (event) {
                expandCollapseRowsPerGrid($('#hierarchicalGrid'), 'expand', 0, function () { });
            }
        });
    
        // $("#buttonExpandAll").on('click',
        // function (e) {
        //     expandCollapseRowsPerGrid($('#grid'), 'expand', 0, function () { });
        // })
        // $("#buttonCollapseAll").on('click',
        // function (e) {
        //     console.log("Collapse")
        //     expandCollapseRowsPerGrid($('#grid'), 'collapse', 0, function () { });
        // })
    
        $("#buttonCollapseAll").igButton({
            labelText: $("#buttonCollapseAll").val(),
            click: function (event) {
                expandCollapseRowsPerGrid($('#hierarchicalGrid'), 'collapse', 0, function () { });
            }
        });
    }catch(err){
        console.log(err)
    }
    
}

function countryChanged(evt, ui) {
    console.log("MASUK")
    drugchanged(evt, ui, "CityName");
}
  
function cityChanged(evt, ui) {
    selectionChanged(evt, ui, "Street");
}

function drugchanged(evt, ui, type) {

    var childGrids = $('#hierarchicalGrid').igHierarchicalGrid('allChildren');

    var provinsi = ui.items[0].data.text;
    console.log(provinsi)
    let kota = KOTA_DATA.filter(e=>{
        if(e.provinsi == provinsi){
            return e.kota
        }
    })
    for (var i = 0; i < childGrids.length; i++) {
        //var trans = $(childGrids[0]).data("igGrid").options.features[0].columnSettings[2].editorOptions.dataSource.destroy()
        var trans = $(childGrids[0]).data("igGrid").options.features[0].columnSettings[2].editorOptions.dataSource(kota[0].kota)
        console.log(trans)
        //allTransactions.push(trans);
    }

    //var editor = $("#hierarchicalGrid").igGridUpdating("editorForKey", "CityName").data("igCombo");
    //console.log(editor)
    // var drug;
    
    // for (i = 0; i < drugsJSON.length; i++) {
    // drug = drugsJSON[i];
    // if (drug.drugID == drugID) {
    // break;
    // }
    // }
    
    // childGrids.each(function (index, grid) {
    // if ($(grid).igGridUpdating('isEditing')) {
    //     $(grid).igGridUpdating('editorForKey', 'DrugName').igTextEditor('value', drug.productName.trim());
    // }
    // });
    
}
  
function selectionChanged(evt, ui, type) {
    var columnSettings = $("#hierarchicalGrid").igHierarchicalGrid("allChildren");
    console.log(columnSettings)
    var editor = $("#hierarchicalGrid").igGridUpdating("editorForKey", "ProvinsiName");

    if (ui.items.length > 0) {
        var place = ui.items[0].data.Value;
        bindDataToCombo(editor, type, place);
    } else {
        editor.deselectAll({}, true);
        editor.dataSource = [];
        editor.dataBind();
        editor.options.disabled = true;
        // some attributes and css classes should be modified manually
        editor.element.prop("disabled", true);
        editor.element.addClass("ui-igCombo-disabled");
        editor.element.closest(".ui-igcombo-wrapper").addClass("ui-igCombo-disabled ui-state-disabled");
    }
}
  
function bindDataToCombo(editor, type, place, selectedValue) {
    var comboData;
    switch (type) {
        case 'City':
        comboData = cities.filter(rec => rec.Country === place)
        break;
        case 'Street':
        comboData = streets.filter(rec => rec.City === place)
        break;
    }
    editor.deselectAll({}, true);
    editor.options.dataSource = comboData;
    editor.dataBind();
    if (comboData.length > 0) {
        editor.options.disabled = false;
        // some attributes and css classes should be modified manually
        editor.element.prop("disabled", false);
        editor.element.removeClass("ui-igCombo-disabled");
        editor.element.closest(".ui-igcombo-wrapper").removeClass("ui-igCombo-disabled ui-state-disabled");
    } else {
        editor.options.disabled = true;
        // some attributes and css classes should be modified manually
        editor.element.prop("disabled", true);
        editor.element.addClass("ui-igCombo-disabled");
        editor.element.closest(".ui-igcombo-wrapper").addClass("ui-igCombo-disabled ui-state-disabled");
    }

    if (selectedValue) {
        editor.value(selectedValue);
    }
}


function test(){
    let li = '<li class="ui-igcombo-listitem ui-state-default ui-unselectable" data-value="Kota Bekasi" unselectable="on">Kota Bekasi</li>'
    $(".ui-igcombo-listitemholder").html(li)


}

