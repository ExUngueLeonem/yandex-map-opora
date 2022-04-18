
const fs = require("fs");
const readline = require('readline');

function getRegionsArr(path = "./output.geojson") {
    const oporaRegions = [];

    let fileContent = fs.readFileSync(path);
    objFileContent = JSON.parse(fileContent);   // objFileContent.features - массив с содержимым

    let result = objFileContent.features.forEach((features, i) => {
            
            oporaRegions.push(features.properties["wikipedia"].slice(3));
    })
    //return JSON.stringify(oporaRegions);
    return oporaRegions;
}


function getRegionsJSON() {
    const oporaData = {
        oporaData: []
    }
    
    const arr = getRegionsArr("./output.geojson").map(elem => {
        const obj = {
            name: 'asdasdf',
            photoSrc: 'asdasdf',
            linkHref: 'asdasdf',
            direction: elem
        }
        return obj
    })
    
    oporaData.oporaData = arr;

    return JSON.stringify(oporaData);
}


fs.writeFileSync("oporaData.json", getRegionsJSON()) //записываем в файл


