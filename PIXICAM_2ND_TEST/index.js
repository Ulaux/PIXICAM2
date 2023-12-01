//---- 1/ Definition Secton ----//

const canvasEl = document.querySelector("canvas");
const ctx = canvasEl.getContext("2d");
const gridCtx = canvasEl.getContext('2d');
// Define the dimensions of the canvas and pixel size
const canvasWidth = 400;
const canvasHeight = 400;
const pixelSize = 10;
const colMax = canvasWidth / pixelSize;
const rowMax = canvasHeight / pixelSize;
//Creation of the list that will be use to generate the color choice section
const colorList = [
  'black', 'white', 'red', 'orange', 'yellow', '#cb6e00', '#0cd78d', 'lightgreen', 'cyan', '#052be6', '#690be4', '#ce0ee0', '#c75884'];
let currentColorChoice = 0;

//---- 3/ creation of the color Toolbar ----//
colorList.forEach(color => {
  let i = 0;
  //Using the ColorList we generate the <div>
  const colorItem = document.createElement('div');
  colorItem.style.backgroundColor = color;
  colorItem.setAttribute('class', 'resizeToolBlock');
  i++;
  colorChoice.appendChild(colorItem);

  colorItem.addEventListener('click', () => {
    currentColorChoice = color;
    ctx.fillStyle = currentColorChoice; // Update the drawing color

    colorChoice.querySelectorAll('div').forEach(item => {
      item.innerHTML = ""; // Clear the innerHTML of each color item
    });
    colorItem.innerHTML = '<i id="pen" class="fa-solid fa-pen"></i>' // actve the innerHTML for the selected color
    if (colorItem.style.backgroundColor === "black" || colorItem[3] === 'red' || colorItem.style.backgroundColor === "#690be4") {
      pen.setAttribute("class", " fa-solid fa-pen whitePen");
    }
  });
});

//---- 4/ creation of the Canva Support ----//

const firstDrawCanva = () => {
  canvasEl.width = canvasWidth;
  canvasEl.height = canvasHeight;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);//Draw the whole canva 
  drawPixel(pixelSize);
};

//---- 5/ creation of the Grid ----//

function drawGrids(ctx, canvasWidth, canvasHeight, pixelSize) {
  ctx.beginPath()
  ctx.strokeStyle = "#c9cdcf"
  //loop for height grid line
  for (let i = 0; i < colMax; i++) {
    ctx.moveTo(i * pixelSize, 0)
    ctx.lineTo(i * pixelSize, canvasHeight)
  }
  //loop for Width grid line
  for (let i = 0; i < rowMax; i++) {
    ctx.moveTo(0, i * pixelSize)
    ctx.lineTo(canvasWidth, i * pixelSize)
  }
  ctx.stroke()
}

//---- 6/ creation of the Pixel Board with the real Pixel----//

async function drawPixel (pixelSize) {
  for (let rowIndex = 0; rowIndex < rowMax; rowIndex++) {
    for (let colIndex = 0; colIndex < colMax; colIndex++) {
      // Generate the color background for the canvas (you can use any color representation)
      let caseColorCanvas = 0;
      let colorPixel = 'white';
      // Assign the color to all the pixel
      caseColorCanvas = await getPixel(rowIndex, colIndex) ;
      let caseC = parseInt(caseColorCanvas, 16);
      switch (caseC) {
        case 1:
          colorPixel = 'black';
          console.log("B!")
          break;
        case 2:
          colorPixel = 'red';
          console.log("R!")
          break;
        case 3:
          colorPixel = 'orange';
          console.log("O!")
          break;
        case 4:
          colorPixel = 'yellow';
          console.log("Y!")
          break;
        case 5:
          colorPixel = '#cb6e00';
          console.log("SDFG!")
          break;
        case 6:
          colorPixel = '#0cd78d';
          console.log("cvn!")
          break;
        case 7:
          colorPixel = 'lightgreen';
          console.log("LG!")
          break;
        case 8:
          colorPixel = 'cyan';
          console.log("C!")
          break;
        case 9:
          colorPixel = '#052be6';
          console.log("1!")
          break;
        case 10:
          colorPixel = '#690be4';
          console.log("2!")
          break;
        case 11:
          colorPixel = '#ce0ee0';
          console.log("3!")
          break;
        case 12:
          colorPixel = '#c75884';
          console.log("4!")
          break;
        default:
          break;
      }
      // Replace pixelData with the actual pixel data array
      if (caseColorCanvas !== null) {
        ctx.fillStyle = colorPixel;
        ctx.fillRect(colIndex * pixelSize, rowIndex * pixelSize, pixelSize, pixelSize);
        createPixel(rowIndex, colIndex, colorPixel)
      }
    }
  }
};

//---- 7/ Creation of the OnClick function that change the pixel color ----//
/*
const onClickPixel = (canvasEl, pixelSize) => {
  canvasEl.addEventListener("click", (event) => {
    event.preventDefault();
    const colIndex = Math.floor(event.offsetX / pixelSize);// get the Y axis index
    const rowIndex = Math.floor(event.offsetY / pixelSize);// get the X axis index

    if (pixelData[rowIndex][colIndex] !== null) {
      createPixel(rowIndex, colIndex, currentColorChoice)
    }

    const pixel = { colIndex, rowIndex, color: currentColorChoice }

    let pixelRef = db.collection('pixel').doc(`pixel :${pixel.colIndex}-${pixel.rowIndex}`)
    pixelRef.set(pixel, { merge: true })
  });
};
*/
function createPixel(rowIndex, colIndex, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(colIndex * pixelSize, rowIndex * pixelSize, pixelSize, pixelSize);
}

//---- 8/ We Run all Function ----// 
connectToMetaMask();
firstDrawCanva();
//onClickPixel(canvasEl, pixelSize);
drawGrids(gridCtx, canvasEl.width, canvasEl.height, pixelSize, pixelSize);

//---- 9/ Get already placed pixel  ----// 
/*
db.collection('pixel').onSnapshot(function (querySnapshot) {
  querySnapshot.docChanges().forEach(function (change) {
    console.log(change.doc.data())
    const { rowIndex, colIndex, color } = change.doc.data()
    createPixel(rowIndex, colIndex, color)
  })
})
*/
window.addEventListener('resize', adjustDivSize);
window.addEventListener('load', adjustDivSize);

function adjustDivSize() {
  const resizeTool = document.getElementsByClassName('resizeToolBlock');
  const windowHeight = window.innerHeight;
  const newHeight = windowHeight * 0.06; // Ajustez selon vos besoins
  for (let i = 0; i < resizeTool.length; i++) {
    resizeTool[i].style.height = newHeight + 'px';
    resizeTool[i].style.width = newHeight + 'px';
  }
  const colorChoice = document.getElementById('colorChoice');
  const newRadius = (windowHeight * 0.035); // Ajustez selon vos besoins
  colorChoice.style.borderRadius = newRadius + 'px';
}

// -----------------------------  ZOOM and SCROLL------------------------------------//

var scale = 1,
  panning = false,
  pointX = 0,
  pointY = 0,
  start = { x: 0, y: 0 },
  zoom = document.getElementById("Container");

canvasEl.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

function setTransform() {
  canvasEl.style.transform = "scale(" + scale + ") translate(" + pointX + "px, " + pointY + "px)";
}

zoom.onmousedown = function (e) {
  e.preventDefault();
  // Only start panning if the right mouse button is clicked
  if (e.button === 2) {
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
  }
};

zoom.onmouseup = function () {
  panning = false;
};

zoom.onmousemove = function (e) {
  if (!panning) {
    return;
  }
  pointX = e.clientX - start.x;
  pointY = e.clientY - start.y;
  setTransform();
};

canvasEl.onwheel = function (e) {
  e.preventDefault();

  // Coordonnées de la souris par rapport au coin supérieur gauche du canvas
  var mouseX = e.clientX - canvasEl.getBoundingClientRect().left;
  var mouseY = e.clientY - canvasEl.getBoundingClientRect().top;

  var xs = (mouseX - pointX) / scale;
  var ys = (mouseY - pointY) / scale;

  var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

  delta > 0 ? (scale *= 1.005) : (scale /= 1.005);

  // Ajuster les coordonnées de référence en fonction de la position de la souris
  pointX = mouseX - xs * scale;
  pointY = mouseY - ys * scale;

  setTransform();
};

zoom.addEventListener("mouseleave", function () {
  if (panning) {
    panning = false;
  }
});


//-----------------------POP UP--------------------//

let PopupOverlay = document.getElementById("Popup-Overlay");
let connectBtn = document.getElementById("connectBtn");

connectBtn.addEventListener("click", function () {
  PopupOverlay.setAttribute('class', 'close');
});

let menu = document.getElementById("Popup-Overlay");

// ---------------------- SMART CONTRACT -------------------- //

import { ethers } from "./ethers-5.1.esm.min.js"
// Importer les fonctions de notre modules ethers.js

import { abi, contractAddress } from "./constant.js"
// Importer l'abi et l'adresse du contrat


// Association de chaque élément du html à des variable JavaScript
let outputConnexion = document.getElementById("outputConnexion");

let ownerBtn = document.getElementById("ownerBtn");
let ownerInp = document.getElementById("ownerInp");

let userBtn = document.getElementById("userBtn");
let watchBtn = document.getElementById("watchBtn");

let storeBtn = document.getElementById("storeBtn");
let storeInp = document.getElementById("storeInp");

let takeBtn = document.getElementById("takeBtn");
let takeInp = document.getElementById("takeInp");

let setPixelBtn = document.getElementById("setPixelBtn");
let setXIndexInp = document.getElementById("setXIndexInp");
let setYIndexInp = document.getElementById("setYIndexInp");
let setValueInp = document.getElementById("setValueInp");

let getPixelBtn = document.getElementById("getPixelBtn");
let getXIndexInp = document.getElementById("getXIndexInp");
let getYIndexInp = document.getElementById("getYIndexInp");

let setArrayBtn = document.getElementById("setArrayBtn");
let setArrayInp = document.getElementById("setArrayInp");

// Executer les fonctions en fontion du bouton clické

ownerBtn.onclick = addOwner;
userBtn.onclick = addUser;
watchBtn.onclick = watch;
storeBtn.onclick = store;
takeBtn.onclick = take;
setPixelBtn.onclick = setPixel;
setArrayBtn.onclick = setArray;
//getPixelBtn.onclick = getPixel(getXIndexInp, getYIndexInp);

// Fonction qui permet de se connecter à MetaMask
async function connectToMetaMask() {
  // Vérifie si MetaMask est installé
  if (typeof window.ethereum !== "undefined") {
    // Demande de se connecter si MetaMask est déjà installé
    window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected");
  } else {
    console.log("Please install MetaMask");
  }
}

// Fonction qui permet d'ajouter une address en tant qu'owner
async function addOwner() {
  // Création une variable "address" qui contindra la valeur mit dans l'input html
  const address = ownerInp.value;
  console.log(`Adding the adress: ${address} as an owner...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      // Execute la fonction "addOwner" de notre smart contract
      let transactionResponse = await contract.addOwner(address);
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done !")
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Fonction qui permet de s'ajouter tant que user
async function addUser() {
  console.log("Adding your address as a user...");
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      let transactionResponse = await contract.addUser();
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done !")
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Fonction qui permet de voir les fonds associés à sa personne
async function watch() {
  console.log("Watching how many money there is in my wallet...");
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let currentWallet = await contract.watch();
      console.log(`Current money in my wallet: ${currentWallet}`);
      document.getElementById("outputWatch").innerHTML = currentWallet.toString();
    } else {
      console.error("MetaMask not detected");
    }
  } catch (error) {
    console.error("Error in watch function:", error);
  }
}

// Fonction qui permet d'ajouter aux fonds associés à sa personne
async function store() {
  // Création une variable "amount" qui contindra la valeur mit dans l'input html
  const amount = storeInp.value;
  console.log(`Adding ${amount} money in my wallet...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      let transactionResponse = await contract.store(amount);
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done !")
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Fonction qui permet d'enlever aux fonds associés à sa personne
async function take() {
  // Création une variable "amount" qui contindra la valeur mit dans l'input html
  const amount = takeInp.value;
  console.log(`Taking ${amount} money in my wallet...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      let transactionResponse = await contract.take(amount);
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done !")
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Fonction qui permet de définir la valeur d'un pixel en fonction de son indexage
async function setPixel() {
  const X = setXIndexInp.value;
  const Y = setYIndexInp.value;
  const value = setValueInp.value;
  console.log(`Setting pixel ${X};${Y} as ${value}...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      let transactionResponse = await contract.setValuePixel(X, Y, value);
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done !")
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Fonction qui permet de lire la valeur d'un pixel en fonction de son indexage
async function getPixel(X, Y) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      let currentPixel = await contract.getValuePixel(X, Y);
      return currentPixel;
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Fonction qui permet de définir la valeur de tous les pixels
async function setArray() {
  // Création une variable "amount" qui contindra la valeur mit dans l'input html
  const value = setArrayInp.value;
  console.log(`Setting the array to ${value}...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      await contract.initializeArray(value);
      console.log("Done !")
    }
    catch (error) {
      console.log(error);
    }
  }
}

// Attends que les blocs soit bien minés pour executer les fonctions
function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(`Completed width ${transactionReceipt.confirmations} confirmations`);
      resolve();
    });
  })
}
