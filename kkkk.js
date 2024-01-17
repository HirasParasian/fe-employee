$(function() {
    $("#grid1").igGrid({
      primaryKey: "ID",
      width: '100%',
      dataSource: gridData,
      columns: [{
          headerText: "ID",
          key: "ID",
          dataType: "number"
        },
        {
          headerText: "Name",
          key: "Name",
          dataType: "string"
        },
        {
          headerText: "Product",
          key: "Product",
          dataType: "string",
        },
        {
          headerText: "Country",
          key: "Country",
          dataType: "string"
        },
        {
          headerText: "City",
          key: "City",
          dataType: "string"
        },
        {
          headerText: "Street",
          key: "Street",
          dataType: "string"
        }
      ],
      autoGenerateColumns: false,
      autoCommit: true,
      features: [{
        name: "Updating",
        editMode: "dialog",
        rowEditDialogOptions: {
          contanment: "owner",
          dialogTemplateSelector: "#dialogTemplate",
          editorsTemplateSelector: "#editorsTemplate",
          showReadonlyEditors: false,
          width: "400px",
          height: "500px"
        },
        enableAddRow: true,
        enableDeleteRow: true,
        editRowStarted: rowEditDialogAfterOpen,
        columnSettings: [{
            columnKey: "Product",
            editorType: "text",
          },
          {
            columnKey: "Country",
            editorType: "combo",
            editorOptions: {
              dataSource: countries,
              textKey: "Value",
              valueKey: "Value",
              selectionChanged: countryChanged
            }
          },
          {
            columnKey: "City",
            editorType: "combo",
            editorOptions: {
              dataSource: cities,
              textKey: "Value",
              valueKey: "Value",
              disabled: true,
              selectionChanged: cityChanged
            }
          },
          {
            columnKey: "Street",
            editorType: "combo",
            editorOptions: {
              dataSource: streets,
              textKey: "Value",
              valueKey: "Value",
              disabled: true
            }
          }
        ]
      }]
    });
    // Initialize the modal dialog for enabling editig of a field
    $("#dialog").igDialog({
      state: "closed",
      modal: true,
      draggable: false,
      resizable: false,
      width: "290px",
      height: "170px",
      stateChanged: function(evt, ui) {
        if (ui.action === "open") {
  
          // set z-index of the dialog for enabling editing in order to be in front of the row editing dialog
          var gridID = "grid1";
          var rowEditDialogZIndex = $("#" + gridID + "_updating_dialog_container").css("z-index");
          $("#dialog").igDialog("option", "zIndex", +rowEditDialogZIndex + 1);
  
          // Initialize the "Yes" and "No" buttons
          $("#yesButton").igButton({
            labelText: "Yes"
          });
          $("#noButton").igButton({
            labelText: "No"
          });
  
          // Enable the editing of the "Name" field
          $("#yesButton").on({
            click: function(e) {
              var editor = $("#grid1").igGridUpdating("editorForKey", "Name").data("igTextEditor");
              $("#field-Name").show();
              /* editor.options.disabled = false;
              // some attributes and css classes should be modified manually
              editor.element.prop("disabled", false);
              editor.element.removeClass("ui-igTextEditor-disabled");
              editor.element.closest(".ui-igedit").removeClass("ui-state-disabled"); */
              $("#dialog").igDialog("close");
            }
          });
  
          $("#noButton").on({
            click: function(e) {
              $("#dialog").igDialog("close");
            }
          });
        }
      }
    });
  });
  
  var gridData = [{
      ID: 1,
      Name: "John Smith",
      Product: "Chai",
      Street: "Vasil Levski",
      City: "Plovdiv",
      Country: "Bulgaria",
    },
    {
      ID: 2,
      Name: "Bob Richards",
      Product: "Chang",
      Street: "Park Avenue",
      City: "NY",
      Country: "USA",
    },
    {
      ID: 3,
      Name: "Marge Wright",
      Product: "Grandma's Boysenberry Spread",
      Street: "Park Avenue",
      City: "Boston",
      Country: "USA",
    },
    {
      ID: 4,
      Name: "Dwight Long",
      Product: "Tofu",
      Street: "Park Avenue",
      City: "LA",
      Country: "USA",
    },
    {
      ID: 5,
      Name: "Amy Grant",
      Product: "Konbu",
      Street: "Park Avenue",
      City: "LA",
      Country: "USA",
    },
  ];
  
  var countries = [{
      Key: "1",
      Value: "Bulgaria"
    },
    {
      Key: "2",
      Value: "USA"
    },
  ];
  
  var cities = [{
      Key: "1",
      Value: "Sofia",
      Country: "Bulgaria"
    },
    {
      Key: "2",
      Value: "Plovdiv",
      Country: "Bulgaria"
    },
    {
      Key: "3",
      Value: "Varna",
      Country: "Bulgaria"
    },
    {
      Key: "11",
      Value: "NY",
      Country: "USA"
    },
    {
      Key: "22",
      Value: "Boston",
      Country: "USA"
    },
    {
      Key: "33",
      Value: "LA",
      Country: "USA"
    }
  ];
  
  var streets = [{
      Key: "1",
      Value: "Vasil Levski",
      City: "Plovdiv"
    },
    {
      Key: "2",
      Value: "Hristo Botev",
      City: "Plovdiv"
    },
    {
      Key: "3",
      Value: "Stefan Sambolov",
      City: "Plovdiv"
    },
    {
      Key: "4",
      Value: "Vasil Levski",
      City: "Sofia"
    },
    {
      Key: "5",
      Value: "Hristo Botev",
      City: "Sofia"
    },
    {
      Key: "6",
      Value: "Stefan Sambolov",
      City: "Sofia"
    },
    {
      Key: "7",
      Value: "Vasil Levski",
      City: "Varna"
    },
    {
      Key: "8",
      Value: "Hristo Botev",
      City: "Varna"
    },
    {
      Key: "9",
      Value: "Stefan Sambolov",
      City: "Varna"
    },
    {
      Key: "11",
      Value: "Park Avenue",
      City: "NY"
    },
    {
      Key: "22",
      Value: "Broadway",
      City: "NY"
    },
    {
      Key: "33",
      Value: "Washington Street",
      City: "NY"
    },
    {
      Key: "12",
      Value: "Park Avenue",
      City: "LA"
    },
    {
      Key: "23",
      Value: "Broadway",
      City: "LA"
    },
    {
      Key: "34",
      Value: "Washington Street",
      City: "LA"
    },
    {
      Key: "13",
      Value: "Park Avenue",
      City: "Boston"
    },
    {
      Key: "24",
      Value: "Broadway",
      City: "Boston"
    },
    {
      Key: "35",
      Value: "Washington Street",
      City: "Boston"
    }
  ];
  
  function rowEditDialogAfterOpen(evt, ui) {
  
    if (!ui.rowAdding) {
      var countriesEditor = $("#grid1").igGridUpdating("editorForKey", "Country").data("igCombo");
      var citiesEditor = $("#grid1").igGridUpdating("editorForKey", "City").data("igCombo");
      var streetEditor = $("#grid1").igGridUpdating("editorForKey", "Street").data("igCombo");
  
      var selectedCountry = getValue(countriesEditor.selectedItems());
      var selectedCity = getValue(citiesEditor.selectedItems());
      var selectedStreet = getValue(streetEditor.selectedItems());
  
      // bind correct data for the combo
      if (selectedCountry) {
        if (selectedCity) {
          bindDataToCombo(citiesEditor, "City", selectedCountry, selectedCity);
        } else {
          bindDataToCombo(citiesEditor, "City", selectedCountry);
        }
      }
  
  
      // bind correct data for the combo
      if (selectedCity) {
        if (selectedStreet) {
          bindDataToCombo(streetEditor, "Street", selectedCity, selectedStreet);
        } else {
          bindDataToCombo(streetEditor, "Street", selectedCity);
        }
      }
    }
  
    var textEditor = $("#grid1").igGridUpdating("editorForKey", "Name").data("igTextEditor");
    /*   textEditor.hide();
     */
    $("#field-Name").hide();
    /* textEditor.options.disabled = true;
    // some attributes and css classes should be modified manually
    textEditor.element.prop("disabled", true);
    textEditor.element.addClass("ui-igTextEditor-disabled");
    textEditor.element.closest(".ui-igedit").addClass("ui-state-disabled"); */
  
  
    // Initialize the open button with igButton
    $("#openDialog").igButton({
      labelText: 'Show the "Name" field'
    });
  
  
    $("#openDialog").on({
      click: function(e) {
        // Open the igDialog
        $("#dialog").igDialog("open");
      }
    });
  
    // Initialize the changeSettings button with igButton
    $("#changeSettings").igButton({
      labelText: 'Change Product Editor',
    });
  
    $("#changeSettings").on({
      click: function(e) {
        changeColumnSettings();
      },
    });
  }
  
  function changeColumnSettings() {
    var url = 'https://www.igniteui.com/api/products';
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      data: {},
      success: function(response) {
        var columnSettings2 = [{
            columnKey: "Product",
            editorType: "combo",
            editorOptions: {
              dataSource: response,
              textKey: "ProductName",
              valueKey: "ProductName",
            },
          },
          {
            columnKey: "Country",
            editorType: "combo",
            editorOptions: {
              dataSource: countries,
              textKey: "Value",
              valueKey: "Value",
              selectionChanged: countryChanged,
            },
          },
          {
            columnKey: "City",
            editorType: "combo",
            editorOptions: {
              dataSource: cities,
              textKey: "Value",
              valueKey: "Value",
              disabled: true,
              selectionChanged: cityChanged,
            },
          },
          {
            columnKey: "Street",
            editorType: "combo",
            editorOptions: {
              dataSource: streets,
              textKey: "Value",
              valueKey: "Value",
              disabled: true,
            },
          },
        ];
  
        $("#grid1").igGridUpdating("option", "columnSettings", columnSettings2);
  
      }
    });
  }
  
  function countryChanged(evt, ui) {
    selectionChanged(evt, ui, "City");
  }
  
  function cityChanged(evt, ui) {
    selectionChanged(evt, ui, "Street");
  }
  
  function selectionChanged(evt, ui, type) {
    var datac = "";
    var editor = $("#grid1").igGridUpdating("editorForKey", type).data("igCombo");
  
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
  
  function getValue(items) {
    if (items) {
      let item = items[0];
      if (item) {
        if (item.data) {
          return item.data.Value
        }
      }
    }
    return undefined
  }
  