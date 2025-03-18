
//____________________VARIABLEN_______________________
let configurations = [];
let currentIndex = 0
let outputText = "";

// Das Output-Element auswählen --> für Popup
const outDim = document.getElementById("outDim");
const outTotalWare = document.getElementById("outTotalWare");
const outTotalWood = document.getElementById("outTotalWood");
const outDeliv = document.getElementById("outDeliv");
const outTotalDel = document.getElementById("outTotalDel");

//HooverButton
const buttonStates = {};

//Eingabe Maße
let width;
let hight;
let deepth;
let middleH;
let middleV;
let oversetLiRe;
let oversetFoBa;
let woodWidth;
let woodDeepth;


let material;

//Input Value
const widthInput = document.getElementById("iWidth");
const hightInput = document.getElementById("iHight");
const deepthInput = document.getElementById("iDeepth");
const MaterialInput = document.getElementById("iMaterial");
const MiddleInput = document.getElementById("iMiddleH");
const MiddleLengthInput = document.getElementById("iMiddleV");
const OversetLiReInput = document.getElementById("iOversetLeRi");
const OversetFoBaInput = document.getElementById("iOversetFoBa");


//InOutput (anzeige aktuelle Werte)
const materialOutput = document.getElementById("iMaterialOutput");
const hightOutput = document.getElementById("iHightOutput");
const widthOutput = document.getElementById("iWidthOutput");
const deepthOutput = document.getElementById("iDeepthOutput");
const middleVOutput = document.getElementById("iMiddleVOutput");
const middleHOutput = document.getElementById("iMiddleHOutput");
const OversetLeRiOutput = document.getElementById("iOversetLeRiOutput");
const OversetFoBaOutput = document.getElementById("iOversetFoBaOutput");


const add = document.getElementById("iAdd");

//Show
let takenWidth;
let takenHight;
let takenDeepth;

//Preis
let Total = 0;
let TotalFrame = 0;
let TotalWood = 0;


//KONSTANTEN
const PricePerMeter = 8; //Preis pro Meter bei einem 20mm Quadratrohr
const PricePerPeace = 10; //Für ABschnitt zusammenschweißen usw.
const PriceDelivery = 30; // Versand etc.
const PriceWood = 100; //Price pro Quadratmeter

//______________________TEST_________________________

//Eingabe Slider --> führt Input aus
MaterialInput.addEventListener("input", getData);
hightInput.addEventListener("input", getData);
widthInput.addEventListener("input", getData);
deepthInput.addEventListener("input", getData);
MiddleInput.addEventListener("input", getData);
MiddleLengthInput.addEventListener("input", getData);
OversetLiReInput.addEventListener("input", getData);
OversetFoBaInput.addEventListener("input", getData);


//Werte übernehmen und limitieren
function updateInput(id, input, min, max) {
  let value = parseInt(input.value);
  value = Math.max(min, Math.min(value, max)); // Begrenze auf min/max
  localStorage.setItem(id, value);
  return value;
  };

//Linien in Canvas zeichnen
function draw(){

//______________________________TEST_______________________________
//Knotenpunkte
let trueCount = 0; // Variable zur Zählung der "true"-Werte
      for (const key in buttonStates) {
        if (buttonStates.hasOwnProperty(key) && buttonStates[key] === true) {
          trueCount++; // Erhöhe die Zählvariable, wenn der Wert "true" ist
        }
      }   
}
  
//Werte von Inputfeld übernehmen Limitieren und in localStorage  speichern
function getData() {
  oversetLiRe =updateInput("iOversetLeRi",OversetLiReInput, 0, 50);
  oversetFoBa =updateInput("iOversetFoBa",OversetFoBaInput, 0, 50);
  
width = updateInput("iWidth", widthInput, 5, 200);
hight = updateInput("iHight", hightInput, 5, 200);
deepth =  updateInput("iDeepth", deepthInput, 5, 200);
let limitMiddleH = hight; 
let limitMiddleV = width;
middleH = updateInput("iMiddleH",MiddleInput, 5, limitMiddleH - 5);
middleV = updateInput("iMiddleV",MiddleLengthInput, 5, limitMiddleV - 5);
material = updateInput("iMaterial", MaterialInput, 15, 50);

ActInput();  

}

function setData(){
  //Inputwerte aktualisieren
  widthInput.value = localStorage.getItem("iWidth") ?? 150;
  localStorage.setItem("iWidth", width);
  
  hightInput.value = localStorage.getItem("iHight") ?? 100;
  localStorage.setItem("iHight", hight);
  
  deepthInput.value = localStorage.getItem("iDeepth") ?? 100;
  localStorage.setItem("iDeepth", deepth);
  
  MaterialInput.value = localStorage.getItem("iMaterial") ?? 30;
  localStorage.setItem("iMaterial", material);
  
  MiddleInput.value = localStorage.getItem("iMiddleH") ?? 80;
  localStorage.setItem("iMiddleH", middleH);
  
  MiddleLengthInput.value = localStorage.getItem("iMiddleV") ?? 65;
  localStorage.setItem("iMiddleV", middleV);
  
  OversetLiReInput.value= localStorage.getItem("iOversetLeRi") ?? 0;
  localStorage.setItem("iOversetLeRi", oversetLiRe);

  OversetFoBaInput.value= localStorage.getItem("iOversetFoBa") ?? 0;
  localStorage.setItem("iOversetFoBa", oversetFoBa);


  }

function getButtons(){
   
    // Lade den gespeicherten Zustand aus localStorage und weise ihn direkt buttonStates zu
      const savedStates = JSON.parse(localStorage.getItem("buttonStates")) || {}; // Hole die gespeicherten Daten oder setze auf {} als Fallback
    // Kopiere die gespeicherten Zustände in das bereits vorhandene buttonStates-Objekt
      Object.assign(buttonStates, savedStates);
    } 

function setButtons(){
  // Speichere das aktualisierte buttonStates-Objekt in localStorage
    localStorage.setItem("buttonStates", JSON.stringify(buttonStates));

}

//Ein/Ausgabe aktualisieren
function ActInput(){ //Ein-Ausgänge aktualisieren

  width =  localStorage.getItem("iWidth") || 100;
  hight =  localStorage.getItem("iHight") || 100;
  deepth =  localStorage.getItem("iDeepth") || 100;
  material =  localStorage.getItem("iMaterial") || 30;
  middleV =  localStorage.getItem("iMiddleV") || 50;
  middleH =  localStorage.getItem("iMiddleH") || 50;
  oversetLiRe =  localStorage.getItem("iOversetLeRi") || 0;
  oversetFoBa =  localStorage.getItem("iOversetFoBa") || 0;

  console.log(material);

  widthInput.value = width;
  hightInput.value = hight;
  deepthInput.value = deepth;
  MaterialInput.value = material;
  MiddleLengthInput.value = middleV;
  MiddleInput.value = middleH;
  OversetLiReInput.value = oversetLiRe;
  OversetFoBaInput.value = oversetFoBa;

  materialOutput.value = material; 
  hightOutput.value = hight;
  widthOutput.value = width;
  deepthOutput.value = deepth;
  middleVOutput.value = middleV;
  middleHOutput.value = middleH;
  OversetLeRiOutput.value = oversetLiRe;
  OversetFoBaOutput.value = oversetFoBa;



  
}

































// Funktion zur Berechnung der Gesamtwerte
function calculateTotal(buttonStates, dimensions, keys) {
  return keys.reduce((total, key) => total + (buttonStates[key] ? dimensions : 0), 0);
}

//Rückgabewert gleich 0 wenn die entsprechenden streben nicht angewählt sind
function setValueToZero(ButtonList, dimension) {
  for (let button of ButtonList) {
    if (buttonStates[button]) {
      return dimension; // Gibt den Wert von dimension zurück, wenn ein Taster gedrückt ist
    }
  }
  return 0; // Gibt 0 zurück, wenn keiner der Taster gedrückt ist
}

//______________________AUSFÜHREN_____________________

//Seite neu laden
window.onload = function() {
  getButtons();
  setData();
  getData();
  };

//____________________________POPUP_FENSTER______________________________________

const PopUp = document.getElementById('iShowPopup');
let fulllength; 
let delivery;
let countEdge;
let element; 

PopUp.addEventListener('click', () => {
 takenWidth = setValueToZero(["iFrontTop", "iFrontBottom", "iFrontMiddleCross", "iBackTop", "iBackBottom", "iBackMiddleCross"], width);
 takenHight = setValueToZero(["iFrontLeft", "iFrontRight", "iFrontMiddleLength", "iBackLeft", "iBackRight", "iBackMiddleLength"], hight);
 takenDeepth = setValueToZero(["iLeftBottom", "iLeftTop", "iLeftMiddleCross", "iRightBottom", "iRightTop", "iRightMiddleCross", "iTopMiddle"], deepth);

 //Lieferung 
if (takenDeepth > 150 || takenWidth > 150 || takenHight > 150 ) {
  delivery = "Nur Abholung";
} else {
  delivery = "Versand möglich";
};

//Preis berechnen
let trueCount = Object.values(buttonStates).filter(value => value == true).length; //Anzahl schweißpunkte

// Berechnung der Gesamtwerte für Länge, Höhe und Tiefe
let FullWidth = calculateTotal(buttonStates, takenWidth, ["iFrontTop", "iFrontBottom", "iFrontMiddleCross", "iBackTop", "iBackBottom", "iBackMiddleCross"]);
let FullHeight = calculateTotal(buttonStates, takenHight, ["iFrontLeft", "iFrontRight", "iFrontMiddleLength", "iBackLeft", "iBackRight", "iBackMiddleLength"]);
let FullDepth = calculateTotal(buttonStates, takenDeepth, ["iLeftBottom", "iLeftTop", "iLeftMiddleCross", "iRightBottom", "iRightTop", "iRightMiddleCross", "iTopMiddle"]);
let Fulllength = (FullWidth + FullHeight + FullDepth)/100 * (material/20); //Für 20mm Quadratrohr kalkuliert
if (Fulllength > 0) { PricePauschal = PriceDelivery;} else {PricePauschal = 0;};
TotalFrame = Fulllength * PricePerPeace + trueCount * PricePerPeace;
 
//Berechnung Holzplatte
if (addedBoard) {
  woodWidth = (width + oversetLiRe*2);
  woodDeepth = (deepth + oversetFoBa*2);
  TotalWood = woodWidth * woodDeepth / 10000 * PriceWood;

} else {
  TotalWood = 0;
}
Total = TotalWood + TotalFrame;

//_________________AUSGABEWERTE____________________
// Den Wert der Variable in das Output-Element einfügen

outDim.textContent = takenWidth + "X" + takenDeepth + "X" + takenHight ;
outTotalWare.textContent = TotalFrame + "€" ;
outTotalWood.textContent = TotalWood + "€"
outDeliv.textContent = delivery ;
outTotalDel.textContent = PricePauschal + "€";
});
for (const id in buttonStates) {
  if (buttonStates.hasOwnProperty(id)) {
    const status = buttonStates[id];
  }
};

//_________________________________FORMULAR_SENDEN____________________________________
//save Object
add.addEventListener('click', () => {

  for (const id in buttonStates) {
    if (buttonStates.hasOwnProperty(id)) {
      const status = buttonStates[id];
      outputText += ` ID: ${id}, vorhanden: ${status}`;
    }
  };

  // Create  object mit aktuellen configuration
  const currentConfig = {
      Streben: outputText,
      dicke: materialScaled * 10,
      width: takenWidth,
      deepth: takenDeepth,
      hight: takenHight,
      totalWood: TotalWood,
      totalFrame: TotalFrame,
      total: Total,
      versand: PricePauschal,
      widthWood: woodWidth,
      deepthWood: woodDeepth
      };


if (takenWidth > 0 || takenDeepth > 0 || takenHight > 0) {
  
  // Save  current configuration to the array
  configurations[currentIndex] = currentConfig;

  // Increment the index for the next configuration
  currentIndex++;

localStorage.setItem('configurations', JSON.stringify(configurations));
  alert("erfolgreich zum Warenkorb hinzugefügt.");  

} else {
  alert("Bitte wählen sie eine Strebe aus!");  
}
});
//_________________________________________________________________________________---

// Beim Laden der Seite --> Konfigurationen wiederherstellen
window.addEventListener('load', () => {
  // Laden der gespeicherten Konfigurationen aus dem Local Storage
  const storedConfigurations = localStorage.getItem('configurations');
  ActInput();

  // Überprüfen, ob gespeicherte Konfigurationen vorhanden sind
  if (storedConfigurations) {
    configurations = JSON.parse(storedConfigurations);
    currentIndex = configurations.length; // Setzen Sie den Index auf die nächste verfügbare Position
  }

});
























