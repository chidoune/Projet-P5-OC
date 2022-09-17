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
];

// récupération de l'id dans l'url du lien d'un produit page accueil :
const productId = new URL(window.location.href).searchParams.get("id")
console.log(productId)

// requete d'un produit via son id + récupération des infos du produit en question : 
fetch("http://localhost:3000/api/products/" + productId)
  .then(function(resultats) {
    return resultats.json ();
  })
  .then(function(value) {
    console.log(value)


// boucle for of pour parcourir les produits et comparer l'id récupéré de l'url avec l'id du produit :
  for (let product of products) {
    if (productId === product._id) {

      const imageElement = document.createElement("img")
      imageElement.src = product.imageUrl
      imageElement.alt = product.altTxt
      document.querySelector(".item__img").appendChild(imageElement)

      document.getElementById("title").textContent = product.name
      document.getElementById("price").textContent = product.price
      document.getElementById("description").textContent = product.description

// boucle for of pour parcourir toutes les couleurs par produit + création et affichage de l'élément "option" avec choix des couleurs :
      for (let color of product.colors) {
        const colorElement = document.createElement("option")
        colorElement.textContent = color
        document.querySelector("#colors").appendChild(colorElement)
      }
    }
  }
})

function saveOrderStock(orderStock) {
  localStorage.setItem("orderStock", JSON.stringify(orderStock))
}

function getOrderStock() {
  let orderStock = localStorage.getItem("orderStock")
  if (orderStock == null) {
    return []
  }
  else {
    return JSON.parse(orderStock)
  }
}

function addOrderStock(product) {
  let orderStock = getOrderStock()
  let foundProduct = orderStock.find(p => p.id == product.id && p.color == product.color) /////ETAPE A RETRAVAILLER ///////
  if (foundProduct != undefined) {
    
    foundProduct.quantity = foundProduct.quantity + product.quantity
    //saveOrderStock(foundProduct)
  }
  orderStock.push(product)
  saveOrderStock(orderStock)
}

// ecoute au click du bouton "commander" :
const orderButton = document.querySelector("#addToCart")
orderButton.addEventListener("click", function() {

// création du panier pour le localStorage :
let quantityStock = document.getElementById("quantity")
let colorStock = document.getElementById("colors")
let orderStock = [
  {"id": productId,
  "quantity": quantityStock.value,
  "color": colorStock.value}
]

addOrderStock(orderStock)

}
)