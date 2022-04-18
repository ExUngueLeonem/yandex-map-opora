const http = require('http');
const { type } = require('os');

const fs = require("fs");
const readline = require('readline');

const hostname = '127.0.0.1';
const port = 3000;

function getArrayFromFile (path) { //path = './names.txt'
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

//const OporaArr = getArrayFromFile('./names.txt');
//console.log(OporaArr);

/* 
// асинхронное чтение
fs.readFile("node_test.geojson", "utf8", 
           function(error,data){
               console.log("Асинхронное чтение файла");
               if(error) throw error; // если возникла ошибка
               console.log(data);  // выводим считанные данные
});
*/

function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function run() {
    const OporaArr = getArrayFromFile('./names.txt');
    let trim = 'г. ';
    var re = new RegExp("ab+c");

    OporaArr.forEach( elem => {
        if(elem.includes(trim)) {
            elem.slice(3); // ringify, с позиции 2 и до конца
        }
    })
    console.log('OporaArr', OporaArr);
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

    /* //код из примера
        "properties": {
            "description": "Вокзал Паддингтон",
            "fill": "#ff931e",
            "fill-opacity": 0.3,
            "stroke": "#e6761b",
            "stroke-width": "2",
            "stroke-opacity": 0.9
        }
    */

    return JSONfileContent = JSON.stringify(resObj);    
}

fs.writeFileSync("output.geojson", generateOutputJson()) //записываем в файл

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