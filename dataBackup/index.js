const fs = require("fs");
const readline = require('readline');

function getArrayFromFile(path) { //path = './names.txt'
    const result = [];
    const readInterface = readline.createInterface({
        input: fs.createReadStream(path),
        output: process.stdout,
        console: false
    });

    readInterface.on('line', function (line) {
        result.push(line);
    });
    console.log('getArrayFromFile', result)
    return result;
}


function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}


function generateOutputJson(path = "./input.geojson") {
    console.log("Синхронное чтение файла")
    let fileContent = fs.readFileSync(path);
    objFileContent = JSON.parse(fileContent);   // objFileContent.features - массив с содержимым

    let result = objFileContent.features.filter(features => {
        if (features.geometry.type === 'MultiPolygon') {
            if (!features.properties.name) return false

            features.geometry.type = 'Polygon';

            if (features.properties.name === "Ростовская область") {
                features.geometry.type = "LineString";                              //меняет полигон на LineString
                features.geometry.coordinates = features.geometry.coordinates[0];   //раскрывает лишние скобки в coordinates
            }

            features.properties.name = '<a href="./rostov-na-donu" class="ya-baloon"> <img src="/netcat_files/userfiles/info/manager/gershman.jpg" class="ya-baloon__img"><div class="ya-baloon__description"> Ростов-на-Дону. Председатель - Халын Алексей Викторович </div></a>'
            
            features.geometry.coordinates = features.geometry.coordinates[0];       //раскрывает лишние скобки в coordinates
            features.properties = {
                ...features.properties,
                "fill": generateColor(),
                "fill-opacity": 0.3,
                "stroke": generateColor(),
                "stroke-width": "2",
                "stroke-opacity": 0.9
            }
            return true
        }
        return false
    })

    let resObj = {
        "type": "FeatureCollection",
        "generator": "JOSM",
    }
    resObj.features = result;

    return JSONfileContent = JSON.stringify(resObj);
}




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




console.log(getRegionsJSON());



fs.writeFileSync("oporaData.json", getRegionsJSON()) //записываем в файл

//fs.writeFileSync("output.geojson", generateOutputJson()) //записываем в файл


//run();



/* 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('objFileContent', objFileContent);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 */

