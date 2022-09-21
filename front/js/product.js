/*************************** FICHIER PRODUCT.JS (RATTACHE A PRODUCT.HTML) ***************************/

//_______________________________________ GESTION AFFICHAGE PAGE ____________________________________/
//________ requete GET de l'ensemble des produits + recuperation des infos des produits:   
fetch("http://localhost:3000/api/products")
.then((resultats) => resultats.json())
.then(function(value) {
  const products = value;
  //console.log("voici le tableau de tous les produits:", products);

//________ recuperation de l'id dans l'url du lien d'un produit de la page accueil:
const productId = new URL(window.location.href).searchParams.get("id")
//console.log(productId)

//________ requete GET d'un produit via son id + recuperation des infos sous forme tableau: 
fetch("http://localhost:3000/api/products/" + productId)
.then((resultats) => resultats.json())
.then(function(value) {
//  console.log("voici les infos du produit en cours:",value)

//________ boucle for of pour parcourir le tableau de l'ensemble des produits:
  for (let product of products) {
//________ et comparer l'id récupéré de l'url avec les id de chacun des produits présents dans le tableau "products":
    if (productId === product._id) {

//________ creation/selection des elements html pour affichage des "infos produit" dans le DOM:
      const imageElement = document.createElement("img")
      imageElement.src = product.imageUrl
      imageElement.alt = product.altTxt
      document.querySelector(".item__img").appendChild(imageElement)

      document.getElementById("title").textContent = product.name
      document.getElementById("price").textContent = product.price
      document.getElementById("description").textContent = product.description

//________ boucle for of pour parcourir le tableau des couleurs par produit:
      for (let color of product.colors) {
//________ et creation de l'element html "option" avec choix des couleurs et affichage dans le DOM:
        const colorElement = document.createElement("option")
        colorElement.textContent = color
        document.querySelector("#colors").appendChild(colorElement)
      }
    }
  }
})

//_____________________________________ GESTION AJOUT PRODUIT / PANIER _______________________________/
//________ creation d'une fonction qui enregistre le panier dans le localstorage (stockProduct = tableau d'objets):
function saveStock(stock) {
  localStorage.setItem("stockProduct", JSON.stringify(stock))
}

//________ creation d'une fonction qui recupere le panier a partir du localstorage:
function getStock() {
  let stock = localStorage.getItem("stockProduct")
  if (stock == null) {
    return []
  } else {
   return JSON.parse(stock)
  }
}

//________ creation d'une fonction qui permet d'ajouter un produit au panier:
function addStock(product) {
//________ recuperation du panier à partir du localstorage: 
  let stock = getStock()
//________ recherche si les references (id && color) du produit ajoute existent deja dans le panier:
let foundProduct = stock.find(stock => stock.id == product.id && stock.color == product.color) 
//________ si le produit ajouté existe deja dans le panier :
  if (foundProduct != undefined) {
//________ si la quantite du produit ajoute repond à des critères d'acceptation:
    if (product.quantity >= 1 && product.quantity <= 99) { //&& Number.isInteger(product.quantity)) {
//________ la quantite du produit deja en stock est incrementée avec celle du produit ajouté: 
      foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(product.quantity)  
    }
  } 
//________ sinon le produit ajouté est "pushé" dans le panier s'il repond à des critères d'acceptation:
  else {
    if (product.color !== "" && product.quantity >= 1 && product.quantity <= 100) { //&& Number.isInteger(product.quantity)) {
      stock.push(product)
    }
  }
//________ le "nouveau" panier est ensuite enregistré dans le localstorage:
  saveStock(stock)
}

//____________________________________ GESTION BOUTON "AJOUTER PANIER" ______________________________/
//________ selection des elements dans le html :
const orderButton = document.querySelector("#addToCart")
const quantityStock = document.getElementById("quantity")
const colorStock = document.getElementById("colors")
//________ ecoute au click du bouton :
orderButton.addEventListener("click", function() {
//________ definition du panier dans le localStorage :
  let stock = 
    {"id": productId,
    "quantity": quantityStock.value,
    "color": colorStock.value}
//________ appel de la fonction "add" pour execution (creation panier ou ajout produit ou ajout quantite):
  addStock(stock)
})
})
