let mainHeader = [
    {
        value:"",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Loading Eqp",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Service",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Operator",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Foreman",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Supervisor",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Location",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Material",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Prod",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"UOM",background: "#3c76d2", textAlign: "center",color:"white"
    }
]

let secondHeader = [
    {
        value:"",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Hauling Eq",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Operator",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Rit",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Cap",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Measurement",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Measured",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Dest",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Distance",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Act Mess",background: "#3c76d2", textAlign: "center",color:"white"
    },
    {
        value:"Grade",background: "#3c76d2", textAlign: "center",color:"white"
    }
]

let z = 1
console.log(String.fromCharCode(z+9))
console.log((z+10).toString(36))

let DATAX = [
    {
        eqp : "CE6164 - 6020",
        service : "OVERBURDEN",
        operator : "YOHANES BENI WIJAYA",
        foreman : 3714,
        supervisor : 3714,
        location : "PIT KGB",
        material : "OVERBUDEN",
        prod : 329.22,
        uom:"test",
        data : [
                {
                    haulingEq : "CO4582 - 777",
                    operator : "Syaifullah - 11",
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:""
                },
                {
                    haulingEq : "CO4582 - 778",
                    operator : "Wijaya Agung - 11",
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:""
                }
        ]
    },
    {
        eqp : "CE6164 - 6020",
        service : "OVERBURDEN",
        operator : "YOHANES BENI WIJAYA",
        foreman : 3714,
        supervisor : 3714,
        location : "PIT KGB",
        material : "OVERBUDEN",
        prod : 329.22,
        uom:"test",
        data : [
                {
                    haulingEq : "CO4582 - 777",
                    operator : "Syaifullah - 11",
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:""
                },
                {
                    haulingEq : "CO4582 - 778",
                    operator : "Wijaya Agung - 11",
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:""
                }
        ]
    }
]

var xyz = [
    {
        "ProductID": 1,
        "ProductName": "Chai",
        "UnitPrice": 18,
        "UnitsInStock": 39,
        "Discontinued": false
    },
    {
        "ProductID": 2,
        "ProductName": "Chang",
        "UnitPrice": 19,
        "UnitsInStock": 17,
        "Discontinued": false
    },
    {
        "ProductID": 3,
        "ProductName": "Aniseed Hiras",
        "UnitPrice": 10,
        "UnitsInStock": 13,
        "Discontinued": false
    },
]

let DATAX_FIX = [
    {
        loadingEqp : "CE6164 - 6020",
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
                    haulingEq : "CO4582 - 777",
                    operator : "Syaifullah - 11",
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
                    haulingEq : "CO4582 - 778",
                    operator : "Wijaya Agung - 11",
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
    },
    {
        loadingEqp : "CE6164 - 6021",
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
                    haulingEq : "CO4582 - 779",
                    operator : "Syaifullah - 11",
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:"A"
                },
                {
                    haulingEq : "CO4582 - 775",
                    operator : "Wijaya Agung - 11",
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:"B"
                }
        ]
    }
]

let kkk = DATAX_FIX.filter(a=>{if(a.loadingEqp == "CE6164 - 6020"){
    return a.data
}})
console.log(kkk)


var DATAX_FIZ = [
    {
        loadingEqp : "CE6164 - 6020",
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
                    haulingEq : "CO4582 - 777",
                    operator : "Syaifullah - 11",
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
                    haulingEq : "CO4582 - 778",
                    operator : "Wijaya Agung - 11",
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
    },
    {
        loadingEqp : "CE6164 - 6021",
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
                    haulingEq : "CO4582 - 779",
                    operator : "Syaifullah - 11",
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:"A"
                },
                {
                    haulingEq : "CO4582 - 775",
                    operator : "Wijaya Agung - 11",
                    rit : "1",
                    cap : "41.21",
                    measurement:"82.66",
                    measured:"0",
                    dest:"OPD",
                    distance:"2900",
                    actMeas : "0",
                    grade:"B"
                }
        ]
    }
]