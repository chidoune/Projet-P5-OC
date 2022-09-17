const products = [
    {
      "colors": ["Blue", "White", "Black"],
      "_id": "107fb5b75607497b96722bda5b504926",
      "name": "Kanap Sinopé",
      "price": 1849,
      "imageUrl": "../../back/images/kanap01-opt.webp",
      "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "altTxt": "Photo d'un canapé bleu, deux places"
    },
    {
      "colors": ["Black/Yellow", "Black/Red"],
      "_id": "415b7cacb65d43b2b5c1ff70f3393ad1",
      "name": "Kanap Cyllène",
      "price": 4499,
      "imageUrl": "../../back/images/kanap02-opt.webp",
      "description": "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
      "altTxt": "Photo d'un canapé jaune et noir, quattre places"
    },
    {
      "colors": ["Green", "Red", "Orange"],
      "_id": "055743915a544fde83cfdfc904935ee7",
      "name": "Kanap Calycé",
      "price": 3199,
      "imageUrl": "../../back/images/kanap03-opt.webp",
      "description": "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
      "altTxt": "Photo d'un canapé d'angle, vert, trois places"
    },
    {
      "colors": ["Pink", "White"],
      "_id": "a557292fe5814ea2b15c6ef4bd73ed83",
      "name": "Kanap Autonoé",
      "price": 1499,
      "imageUrl": "../../back/images/kanap04-opt.webp",
      "description": "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
      "altTxt": "Photo d'un canapé rose, une à deux place"
    },
    {
      "colors": ["Grey", "Purple", "Blue"],
      "_id": "8906dfda133f4c20a9d0e34f18adcf06",
      "name": "Kanap Eurydomé",
      "price": 2249,
      "imageUrl": "../../back/images/kanap05-opt.webp",
      "description": "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
      "altTxt": "Photo d'un canapé gris, trois places"
    },
    {
      "colors": ["Grey", "Navy"],
      "_id": "77711f0e466b4ddf953f677d30b0efc9",
      "name": "Kanap Hélicé",
      "price": 999,
      "imageUrl": "../../back/images/kanap06-opt.webp",
      "description": "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
      "altTxt": "Photo d'un canapé gris, deux places"
    },
    {
      "colors": ["Red", "Silver"],
      "_id": "034707184e8e4eefb46400b5a3774b5f",
      "name": "Kanap Thyoné",
      "price": 1999,
      "imageUrl": "../../back/images/kanap07-opt.webp",
      "description": "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
      "altTxt": "Photo d'un canapé rouge, deux places"
    },
    {
      "colors": ["Pink", "Brown", "Yellow", "White"],
      "_id": "a6ec5b49bd164d7fbe10f37b6363f9fb",
      "name": "Kanap orthosie",
      "price": 3999,
      "imageUrl": "../../back/images/kanap08-opt.webp",
      "description": "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
      "altTxt": "Photo d'un canapé rose, trois places"
    }
]

// récupération des données des produits stockés depuis le localstorage :
let basket = JSON.parse(localStorage.getItem("orderStock"))
console.log(basket)

// boucle for of pour parcourir chaque produit du panier :
for (let element of basket) {

// requete des produits via "id" + récupération des infos :  
fetch("http://localhost:3000/api/products/")
.then(function(resultats) {
    //if (resultats.ok) {
        return resultats.json ();
    //}
})
.then(function(value) {
    console.log(value);
  
    
    let cartItem = document.createElement("article")
    cartItem.className = "cart__item"
            
    let cartImg = document.createElement("div")
    cartImg.className = "cart__item__img"
            
    let imageElement = document.createElement("img")
    imageElement.src = products.imageUrl
    imageElement.alt = products.altTxt
            
    let cartContent = document.createElement("div")
    cartContent.className = "cart__item__content"

    let cartDescription = document.createElement("div")
    cartDescription.className = "cart__item__content__description"        

    let nameElement = document.createElement("h2")
    nameElement.innerText = products.name
            
    let colorElement = document.createElement("p")
    colorElement.innerText = element.color
            
    let priceElement = document.createElement("p")
    priceElement.innerText = products.price + " " + "€"
            
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

/**************** CALCUL QUANTITE TOTAL *********************/
// fonction qui calcule la somme des quantités des produits stockés :
let sommeQuantity = 0
function sommeQuantitytot (basket) {
  for (let element of basket) {
    sommeQuantity = sommeQuantity + element.quantity   
  }
  return(sommeQuantity)
}

/****************** CALCUL MONTANT TOTAL *********************/
// fonction qui calcule le montant total par produit :
let sousTotalPriceProduct = 0
function sousTotalPrice (basket) {
  for (let element of basket) {
    let sousTotalPriceProduct = element.price * element.quantity
    return(sousTotalPriceProduct)
  }
}

// fonction qui calcule le montant total des produits :
let totalAmount = 0
async function totalPrice (basket) {
  for (let sousTotalPriceProduct of basket) {
    let totalAmount = totalAmount + sousTotalPriceProduct
  }
  return(totalAmount)
}

// positionnement et intégration des données dans le DOM :
let totalQuantity = document.getElementById("totalQuantity")
totalQuantity.textContent = sommeQuantity

let totalPriceElement = document.getElementById("totalPrice")
totalPriceElement.textContent = totalAmount





