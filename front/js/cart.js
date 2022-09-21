/****************************** FICHIER CART.JS (RATTACHE A CART.HTML) ******************************/

//__________________________________ DECLARATION/RECUPERATION DONNEES/VARIABLES ______________________/
//________ recuperation sous forme d'un tableau du panier present dans le localstorage :
let basket = JSON.parse(localStorage.getItem("stockProduct"))
//console.log("voici le panier:",basket)

//________ declaration/initialisation de variables :
let sommeQuantity = 0
let totalAmount = 0

//________________________________________ GESTION AFFICHAGE PAGE ____________________________________/
//________ boucle for of pour parcourir chaque produit du panier :
for (let element of basket) {
//________ requete GET d'un produit via son id + récupération des infos sous forme tableau : 
fetch("http://localhost:3000/api/products/"+ element.id)
.then((resultats) => resultats.json())
.then(function(value) {
    const item = value
  //  console.log("voici les infos du produit:",item)

//________ creation/selection des elements html pour affichage des "infos produit"dans le DOM :
    let cartItem = document.createElement("article")
    cartItem.className = "cart__item"
    cartItem.setAttribute("data-id", element.id)
    cartItem.setAttribute("data-color", element.color)
            
    let cartImg = document.createElement("div")
    cartImg.className = "cart__item__img"
            
    let imageElement = document.createElement("img")
    imageElement.src = item.imageUrl
    imageElement.alt = item.altTxt
            
    let cartContent = document.createElement("div")
    cartContent.className = "cart__item__content"

    let cartDescription = document.createElement("div")
    cartDescription.className = "cart__item__content__description"        

    let nameElement = document.createElement("h2")
    nameElement.innerText = item.name
            
    let colorElement = document.createElement("p")
    colorElement.innerText = element.color
            
    let priceElement = document.createElement("p")
    priceElement.innerText = item.price + " " + "€"
            
    let cartSetting = document.createElement("div")
    cartSetting.className = "cart__item__content__settings" 

    let cartQuantity = document.createElement("div")
    cartQuantity.className = "cart__item__content__settings__quantity"
            
    let quantityElement = document.createElement("p")
    quantityElement.innerText = "Qté :"
            
    let inputElement = document.createElement("input")
    inputElement.className = "itemQuantity" 
    inputElement.type = "number"
    inputElement.name = "itemQuantity"
    inputElement.min = "1"
    inputElement.max = "100"
    inputElement.value = element.quantity
            
    let cartDelete = document.createElement("div")
    cartDelete.className = "cart__item__content__settings__delete" 

    let buttonSuppr = document.createElement("p")
    buttonSuppr.innerText = "Supprimer"
    buttonSuppr.className = "deleteItem" 
            
    cartImg.appendChild(imageElement)
    cartItem.appendChild(cartImg)
            
    cartDescription.appendChild(nameElement)
    cartDescription.appendChild(colorElement)
    cartDescription.appendChild(priceElement)
    cartContent.appendChild(cartDescription)
    cartItem.appendChild(cartContent)
            
    cartQuantity.appendChild(quantityElement)
    cartQuantity.appendChild(inputElement)
    cartSetting.appendChild(cartQuantity)
    cartContent.appendChild(cartSetting)
            
    cartDelete.appendChild(buttonSuppr)
    cartSetting.appendChild(cartDelete)
            
    document.querySelector("#cart__items").appendChild(cartItem)
  })
}

//_____________________________________ CALCULS QUANTITES / MONTANTS __________________________________/
//________ creation fonction qui calcule la somme des quantités des produits stockés et affiche sa valeur dans le DOM :
function calculQuantTot(basket) {
  basket.forEach(element => {
    sommeQuantity += parseInt(element.quantity)
  })
  let totalQuantity = document.getElementById("totalQuantity")
  totalQuantity.textContent = sommeQuantity
  console.log("somme des quantites des produits du panier:",sommeQuantity)
}
calculQuantTot(basket)

//________ creation fonction qui calcule le montant total des produits stockés et affiche sa valeur dans le DOM :
function calculAmountTot(basket) {
  basket.forEach(element => {
    fetch("http://localhost:3000/api/products/"+ element.id)
    .then((resultats) => resultats.json())
    .then(function(value) {
    const item = value
    totalAmount += parseInt(item.price) * parseInt(element.quantity)
    // console.log(totalAmount)
    })
  })
let totalPrice = document.getElementById("totalPrice")
totalPrice.textContent = totalAmount
console.log("montant total des produits:", totalAmount)
}
calculAmountTot(basket)

//_____________________________________ GESTION BOUTON SUPPRESSION  __________________________________/
//________ selection dans le html de tous les boutons "supprimer":
let allButtonSuppr = document.querySelectorAll(".deleteItem")
//________ creation fonction pour permettre la suppression d'un produit (dans localstorage && DOM):
function SupprProduct(basket) {
  for (let button of allButtonSuppr) {
//________ ecoute au click sur pour chaque bouton "supprimer":
    button.addEventListener("click", function() {
      let basket = JSON.parse(localStorage.getItem("stockProduct")) 
//________ rapprochement du bouton avec article parent et recuperation des id et color concernés (=identification du produit à supprirmer): 
      let articleToSuppr = button.closest("article")
      let idToSuppr = articleToSuppr.dataset.id
      let colorToSuppr = articleToSuppr.dataset.color
//________ filtrage/recuperation de tous les produits du panier qui ont (id  && couleur) differents de celui du produit à supprimer:
    basket = basket.filter(stock=> stock.id != idToSuppr || stock.color != colorToSuppr)
    })
  }  
//________ enregistrement du panier filtré + suppression du DOM de l'article + recalcul des (quantite et montant) tot:
  localStorage.setItem("stockProduct", JSON.stringify(basket))
  articleToSuppr.remove()
  calculQuantTot(basket)
  calculAmountTot(basket)
}

//____________________________________ GESTION INPUT CHANGEMENT QUANTITE _________________________________/
//________ selection dans le html de tous les input:
let allInput = document.querySelectorAll(".itemQuantity")
//________ creation fonction pour permettre la modification de la quantite d'un produit:
function changeQuantityProduct(basket) {
  for (let input of allInput) {
//________ ecoute d'un changement pour chaque input:    
    input.addEventListener("change", function() {
      let basket = JSON.parse(localStorage.getItem("stockProduct"))
//________ rapprochement de la baslise input avec son article parent et recuperation des id et color concernés:      
      let articleTarget = input.closest("article")
      let idTarget = articleTarget.dataset.id
      let colorTarget = articleTarget.dataset.color
//________ recherche dans le panier du produit qui a les mêmes (id && couleur) que celui dont on souhaite modifier la quantite:     
      let foundProduct = basket.find(stock => stock.id == idTarget && stock.color == colorTarget) 
//________ si ce produit est trouvé dans le panier: 
      //if (foundProduct != undefined) {
//________ si la quantite modifiee repond a des criteres de "non validite" alors celle-ci est imposee :
        if (e.target.value <= 0 || isNaN(e.target.value)) {e.target.value === 1}
        else if (e.target.value > 100) {e.target.value === 100}
        else if (e.target.value !== parseInt(e.target.value,10)) {e.target.value = Math.ceil(e.target.value)}
//________ affectation de la quantite modifiee a celle du produit correspondant dans le panier:
        foundProduct.quantity = e.target.value
      //}
    })
  }
//________ enregistrement du "nouveau" panier + recalcul des (quantite et montant) tot: 
  localStorage.setItem("stockProduct", JSON.stringify(basket))
  calculQuantTot(basket)
  calculAmountTot(basket)
}

//______________________________________________ GESTION FORMULAIRE __________________________________________/
//____________ selection des elements html :
let inputFirstName = document.getElementById("firstName")
let inputLastName = document.getElementById("lastName")
let inputAddress = document.getElementById("address")
let inputCity = document.getElementById("city")
let inputEmail = document.getElementById("email")

let firstNameError = document.getElementById("firstNameErrorMsg")
let lastNameError = document.getElementById("lastNameErrorMsg")
let addressError = document.getElementById("addressErrorMsg")
let cityError = document.getElementById("cityErrorMsg")
let emailError = document.getElementById("emailErrorMsg")

//____________ déclaration des regex pour verification de la validite des champs:
let textRegex = /^[a-zàåáçéèêëîïìíñœæôöòóùûüúÿ\s-]{2,30}$/i
let addressRegex = /^[a-zàåáçéèêëîïìíñœæôöòóùûüúÿ{0-9}\s-]{2,50}$/i
let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


//____________ ecoute des différents champs + vérification validité des données (regex) + message erreur le cas échéant :
inputFirstName.addEventListener("change", function () {
  if (inputFirstName.value.match(textRegex) == null) {
    firstNameError.textContent = "Veuillez entrer votre prénom svp"
    }
  else {
    firstNameError.textContent = " "
  }
})

inputLastName.addEventListener("change", function() {
  if (inputLastName.value.match(textRegex) == null) {
    lastNameError.textContent = "Veuillez entrer votre nom svp"
  }
  else {
    lastNameError.textContent = " "
  }
})

inputAddress.addEventListener("change", function() {
  if (inputAddress.value.match(addressRegex) == null) {
    addressError.textContent = "Veuillez entrer votre adresse svp"
  }
  else {
    addressError.textContent = " "
  }
})

inputCity.addEventListener("change", function() {
  if (inputCity.value.match(textRegex) == null) {
    cityError.textContent = "Veuillez entrer la ville de votre lieu de résidence"
  }
  else {
    cityError.textContent = " "
  }
})

inputEmail.addEventListener("change", function() {
  if (inputEmail.value.match(emailRegex) == null) {
    emailError.textContent = "Veuillez entrer votre adresse mail svp"
  }
  else {
    emailError.textContent = " "
  }
})

//___________________________________________ GESTION BOUTON COMMANDER ________________________________________/
//________recuperation sous forme de tableau "texte" de tous les id des produits du panier :
const basketId = JSON.stringify(basket.map(element => element.id))
console.log("voici le tableau de tous les id du panier:", basketId)

//________ selection de l'element html "bouton commander":
let orderButton = document.getElementById("order")
//________ecoute au click du "bouton commander":
orderButton.addEventListener("submit", function(e) {
//________verification de la validite des criteres imposés par les regex:
  if (inputFirstName.value.match(textRegex) !== null && inputLastName.value.match(textRegex) !== null
  && inputAddress.value.match(addressRegex) !== null && inputCity.value.match(textRegex) !== null 
  && inputEmail.value.match(emailRegex) !== null) {
//________ declaration/creation de l'objet qui contient toutes les infos à envoyer à l'API :
    const userInfo = {
      contact : {
        "firstName" : inputFirstName.value,
        "lastName" : inputLastName.value,
        "address" : inputAddress.value,
        "city" : inputCity.value,
        "email" : inputEmail.value
      }, 
      basketId
    }
    console.log("voici les infos du user:", userInfo)
//________ empechement du comportement par defaut du navigateur :
    e.preventDefault()
//____________ requete POST envoyee à l'API:
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(userInfo)  
    })
    .then((resultats) => resultats.json())
    .then((orderId) => {
      document.location.href = "./confirmation.html?order=" + orderId //// A COMPLETER ////
      basket.clear()
    })
    .catch(function(error) {
      console.log(error.message)
    })
  }
  else {
    alert("La commande ne peut pas être validée. Les champs doivent tous être renseignés correctement.")
  }
})