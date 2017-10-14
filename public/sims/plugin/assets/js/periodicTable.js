if(!periodicTable){
    var periodicTable = [];
}else if (typeof periodicTable != 'array') {
    throw Error('Error with the namespace')
}


periodicTable.push({
        "symbol": "H",
        "element": "Hydrogen",
        "group": 1,
        "period": 1,
        "charge": 1,
        "neutrons": 0,
        "atomicNumber": 1,
        "massNumber": 1.0079
    });
periodicTable.push({
        "symbol": "He",
        "element": "Helium",
        "group": 8,
        "period": 1,
        "charge": 0,
        "neutrons": 2,
        "atomicNumber": 2,
        "massNumber": 4.003
    });

periodicTable.push({
        "symbol": "Li",
        "element": "Lithium",
        "group": 1,
        "period": 2,
        "charge": 1,
        "neutrons": 3,
        "atomicNumber": 3,
        "massNumber": 6.941
    });
periodicTable.push({
        "symbol": "Be",
        "element": "Berylium",
        "group": 2,
        "period": 2,
        "charge": 2,
        "neutrons": 5,
        "atomicNumber": 4,
        "massNumber": 9.01
    });
periodicTable.push({
        "symbol": "B",
        "element": "Boron",
        "group": 3,
        "period": 2,
        "charge": 3,
        "neutrons": 6,
        "atomicNumber": 5,
        "massNumber": 10.81
    });
periodicTable.push({
        "symbol": "C",
        "element": "Carbon",
        "group": 4,
        "period": 2,
        "charge": 4,
        "atomicNumber": 6,
        "massNumber": 12.01
    });
periodicTable.push({
        "symbol": "N",
        "element": "Nitrogen",
        "group": 5,
        "perio": 2,
        "charge": -3,
        "atomicNumber": 7,
        "massNumber": 14.01
    });
periodicTable.push({
        "symbol": "O",
        "element": "Oxygen",
        "group": 6,
        "period": 2,
        "charge": -2,
        "atomicNumber": 8,
        "massNumber": 15.999
    });
periodicTable.push({
        "symbol": "F",
        "element": "Flourine",
        "group": 7,
        "period": 2,
        "charge": -1,
        "atomicNumber": 9,
        "massNumber": 18.998
    });
periodicTable.push({
        "symbol": "Ne",
        "element": "Neon",
        "group": 8,
        "period": 2,
        "charge": 0,
        "atomicNumber": 10,
        "massNumber": 20.18
    });

periodicTable.push({
        "symbol": "Na",
        "element": "Sodium",
        "group": 1,
        "period": 3,
        "charge": 1,
        "atomicNumber": 11,
        "massNumber": 22.990
    });

periodicTable.push({
        "symbol": "Mg",
        "element": "Magnesium",
        "group": 1,
        "period": 3,
        "charge": 2,
        "atomicNumber": 12,
        "massNumber": 24.31
    });
periodicTable.push({
        "symbol": "Al",
        "element": "Aluminium",
        "group": 3,
        "period": 3,
        "charge": 3,
        "atomicNumber": 13,
        "massNumber": 26.98
    });
periodicTable.push({
        "symbol": "Si",
        "element": "Silicon",
        "group": 4,
        "period": 3,
        "charge": 4,
        "atomicNumber": 14,
        "massNumber": 28.09
    });
periodicTable.push({
        "symbol": "P",
        "element": "Phosphurus",
        "group": 5,
        "period": 3,
        "charge": -3,
        "atomicNumber": 15,
        "massNumber": 30.97
    });
periodicTable.push({
        "symbol": "S",
        "element": "S",
        "group": 6,
        "period": 3,
        "charge": -2,
        "atomicNumber": 16,
        "massNumber": 32.06
    });
periodicTable.push({
        "symbol": "Cl",
        "element": "Clorine",
        "group": 7,
        "period": 3,
        "charge": -1,
        "atomicNumber": 17,
        "massNumber": 35.45
    });
periodicTable.push({
        "symbol": "Ar",
        "element": "Argon",
        "group": 8,
        "period": 3,
        "charge": 0,
        "atomicNumber": 18,
        "massNumber": 39.95
    });    
periodicTable.push({
        "symbol": "K",
        "element": "Potassium",
        "group": 1,
        "period": 4,
        "charge": 1,
        "atomicNumber": 19,
        "massNumber": 39.098
    });
periodicTable.push({
        "symbol": "Ca",
        "element": "Calcium",
        "group": 1,
        "period": 4,
        "charge": 2,
        "atomicNumber": 20,
        "massNumber": 40.08
    });


periodicTable.searchByAtomicNumber = function(x){
    if(x==0)
        return -1;
    return periodicTable[x-1];
}
periodicTable.searchByMassNumber = function(x){
    var ii = periodicTable.length;
    for (var i = 0; i < ii; i++) {
        if(periodicTable[i]["massNumber"]==x)
            return periodicTable[i];
    }
}

periodicTable.randomElement = function(){
    var x = Math.random()*1000;
    x = parseInt(x);
    x%=5;
    return periodicTable[x];
}


/*




periodicTable.push({
        "symbol": "Sc",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 21,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Ti",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 22,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "V",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 23,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Cr",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 24,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Mn",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 25,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Fe",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 26,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Co",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 27,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Ni",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 28,
        "massNumber": 1
    });

periodicTable.push({
        "symbol": "Cu",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 29,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Zn",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 30,
        "massNumber": 1
    });








periodicTable.push({
        "symbol": "Ga",
        "element": "Gallium",
        "group": 3,
        "period": 4,
        "charge": 3,
        "atomicNumber": 31,
        "massNumber": 69.72
    });
periodicTable.push({
        "symbol": "Ge",
        "element": "Germanium",
        "group": 4,
        "period": 4,
        "charge": 4,
        "atomicNumber": 32,
        "massNumber": 72.59
    });
periodicTable.push({
        "symbol": "As",
        "element": "",
        "group": 5,
        "period": 4,
        "charge": -3,
        "atomicNumber": 33,
        "massNumber": 74.92
    });
periodicTable.push({
        "symbol": "Se",
        "element": "",
        "group": 6,
        "period": 4,
        "charge": -2,
        "atomicNumber": 34,
        "massNumber": 78.96
    });
periodicTable.push({
        "symbol": "Br",
        "element": "Bromium",
        "group": 7,
        "period": 4,
        "charge": -1,
        "atomicNumber": 35,
        "massNumber": 79.90
    });
periodicTable.push({
        "symbol": "Kr",
        "element": "Kr",
        "group": 8,
        "period": 4,
        "charge": 0,
        "atomicNumber": 36,
        "massNumber": 83.80
    });
periodicTable.push({
        "symbol": "Rb",
        "element": "",
        "group": 1,
        "period": 5,
        "charge": 1,
        "atomicNumber": 37,
        "massNumber": 85.458
    });
periodicTable.push({
        "symbol": "Sr",
        "element": "",
        "group": 1,
        "period": 5,
        "charge": 2,
        "atomicNumber": 38,
        "massNumber": 87.62
    });





periodicTable.push({
        "symbol": "Y",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 39,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Zr",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 40,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Nb",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 41,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Mo",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 42,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Tc",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 43,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Ru",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 44,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Rh",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 45,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Pd",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 46,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Ag",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 47,
        "massNumber": 1
    });
periodicTable.push({
        "symbol": "Cd",
        "element": "",
        "group": 1,
        "period": 1,
        "charge": 1,
        "atomicNumber": 48,
        "massNumber": 1
    });








periodicTable.push({
        "symbol": "In",
        "element": "",
        "group": 3,
        "period": 5,
        "charge": 3,
        "atomicNumber": 49,
        "massNumber": 114.82
    });
periodicTable.push({
        "symbol": "Sn",
        "element": "",
        "group": 4,
        "period": 5,
        "charge": 4,
        "atomicNumber": 50,
        "massNumber": 119.69
    });
periodicTable.push({
        "symbol": "Sb",
        "element": "",
        "group": 5,
        "period": 5,
        "charge": -3,
        "atomicNumber": 51,
        "massNumber": 121.75
    });
periodicTable.push({
        "symbol": "Te",
        "element": "",
        "group": 6,
        "period": 5,
        "charge": -2,
        "atomicNumber": 52,
        "massNumber": 127.60
    });
periodicTable.push({
        "symbol": "I",
        "element": "",
        "group": 7,
        "period": 5,
        "charge": -1,
        "atomicNumber": 53,
        "massNumber": 126.90
    });
periodicTable.push({
        "symbol": "Xe",
        "element": "",
        "group": 8,
        "period": 5,
        "charge": 0,
        "atomicNumber": 54,
        "massNumber": 131.30
    });
periodicTable.push({
        "symbol": "Cs",
        "element": "",
        "group": 1,
        "period": 6,
        "charge": 1,
        "atomicNumber": 55,
        "massNumber": 132.91
    });
periodicTable.push({
        "symbol": "Ba",
        "element": "",
        "group": 1,
        "period": 6,
        "charge": 2,
        "atomicNumber": 56,
        "massNumber": 137.33
    });




//////////////////////////////////////////////////////////////////////////////////////



periodicTable.push({
        "symbol": "Ti",
        "element": "",
        "group": 3,
        "period": 6,
        "charge": 3,
        "atomicNumber": 81,
        "massNumber": 204.37
    });
periodicTable.push({
        "symbol": "Pb",
        "element": "",
        "group": 4,
        "period": 6,
        "charge": 4,
        "atomicNumber": 82,
        "massNumber": 207.19
    });
periodicTable.push({
        "symbol": "Bi",
        "element": "",
        "group": 5,
        "period": 6,
        "charge": -3,
        "atomicNumber": 83,
        "massNumber": 208.98
    });
periodicTable.push({
        "symbol": "Po",
        "element": "",
        "group": 6,
        "period": 6,
        "charge": -2,
        "atomicNumber": 84,
        "massNumber": (209)
    });
periodicTable.push({
        "symbol": "At",
        "element": "",
        "group": 7,
        "period": 6,
        "charge": -1,
        "atomicNumber": 85,
        "massNumber": (210)
    });
periodicTable.push({
        "symbol": "Rn",
        "element": "",
        "group": 8,
        "period": 6,
        "charge": 0,
        "atomicNumber": 86,
        "massNumber": (222)
    });
periodicTable.push({
        "symbol": "Fr",
        "element": "",
        "group": 1,
       "period": 7,
        "charge": 1,
        "atomicNumber": 87,
        "massNumber": (223)
    });
periodicTable.push({
        "symbol": "Ra",
        "element": "",
        "group": 1,
        "period": 7,
        "charge": 2,
        "atomicNumber": 88,
        "massNumber": 226.03
    });

*/