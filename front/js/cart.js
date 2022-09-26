/******************************* FICHIER CART.JS (RATTACHE A CART.HTML) ******************************/

//__________________________________ DECLARATION/RECUPERATION DONNEES/VARIABLES ______________________/
//________ recuperation du panier present dans le localstorage:
let basket = JSON.parse(localStorage.getItem("stockProduct"));
//console.log("voici le panier:",basket)

//________ declaration/initialisation de variables :
let allButtonSuppr = [];
let allInput = [];

//________________________________________ GESTION AFFICHAGE PAGE ____________________________________/
//________ boucle for of qui parcourt chaque produit du panier et requete son produit via son id:
for (let element of basket) {
  fetch("http://localhost:3000/api/products/" + element.id)
    .then((resultats) => resultats.json())
    .then(function (value) {
      const item = value;
      //console.log("voici les infos du produit:",item)

//________ creation/selection des elements html pour affichage des "infos produit" dans le DOM:
      let cartItem = document.createElement("article");
      cartItem.className = "cart__item";
      cartItem.setAttribute("data-id", element.id);
      cartItem.setAttribute("data-color", element.color);

      let cartImg = document.createElement("div");
      cartImg.className = "cart__item__img";

      let imageElement = document.createElement("img");
      imageElement.src = item.imageUrl;
      imageElement.alt = item.altTxt;

      let cartContent = document.createElement("div");
      cartContent.className = "cart__item__content";

      let cartDescription = document.createElement("div");
      cartDescription.className = "cart__item__content__description";

      let nameElement = document.createElement("h2");
      nameElement.innerText = item.name;

      let colorElement = document.createElement("p");
      colorElement.innerText = element.color;

      let priceElement = document.createElement("p");
      priceElement.innerText = item.price + " " + "€";

      let cartSetting = document.createElement("div");
      cartSetting.className = "cart__item__content__settings";

      let cartQuantity = document.createElement("div");
      cartQuantity.className = "cart__item__content__settings__quantity";

      let quantityElement = document.createElement("p");
      quantityElement.innerText = "Qté :";

      let inputElement = document.createElement("input");
      inputElement.className = "itemQuantity";
      inputElement.type = "number";
      inputElement.name = "itemQuantity";
      inputElement.min = "1";
      inputElement.max = "100";
      inputElement.value = element.quantity;

      let cartDelete = document.createElement("div");
      cartDelete.className = "cart__item__content__settings__delete";

      let buttonSuppr = document.createElement("p");
      buttonSuppr.innerText = "Supprimer";
      buttonSuppr.className = "deleteItem";

      cartImg.appendChild(imageElement);
      cartItem.appendChild(cartImg);

      cartDescription.appendChild(nameElement);
      cartDescription.appendChild(colorElement);
      cartDescription.appendChild(priceElement);
      cartContent.appendChild(cartDescription);
      cartItem.appendChild(cartContent);

      cartQuantity.appendChild(quantityElement);
      cartQuantity.appendChild(inputElement);
      cartSetting.appendChild(cartQuantity);
      cartContent.appendChild(cartSetting);

      cartDelete.appendChild(buttonSuppr);
      cartSetting.appendChild(cartDelete);

      document.querySelector("#cart__items").appendChild(cartItem);

      let allButtonSuppr = document.querySelectorAll(".deleteItem");

      let allInput = document.querySelectorAll(".itemQuantity");

//________ appel des fonctions "suppr" et "change" pour execution (cf details ci-dessous):
      supprProduct(allButtonSuppr);
      changeQuantityProduct(allInput);
    });
}

//_____________________________________ CALCULS QUANTITES / MONTANTS __________________________________/
//________ creation fonction qui calcule la somme des quantités des produits stockés
//________ et affiche sa valeur dans le DOM:
function calculQuantTot(basket) {
  let sommeQuantity = 0;
  basket.forEach((element) => {
    sommeQuantity += parseInt(element.quantity);
  });
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = sommeQuantity;
  //console.log("somme des quantites des produits du panier:", sommeQuantity);
}
calculQuantTot(basket);

//________ creation fonction qui calcule le montant total des produits stockés 
//________ et affiche sa valeur dans le DOM:
function calculAmountTot(basket) {
  let totalAmount = 0;
  basket.forEach((element) => {
    fetch("http://localhost:3000/api/products/" + element.id)
      .then((resultats) => resultats.json())
      .then(function (value) {
        const item = value;
        totalAmount += parseInt(item.price) * parseInt(element.quantity);
        let totalPrice = document.getElementById("totalPrice");
        totalPrice.textContent = totalAmount;
        //console.log("montant total des produits:", totalAmount);
      });
  });
}
calculAmountTot(basket);

//_____________________________________ GESTION BOUTON SUPPRESSION  __________________________________/
//________ creation fonction qui permet la suppression d'un produit (dans localstorage && DOM):
//________ ecoute au click pour chaque bouton "supprimer",
//________ rapprochement du bouton avec son article parent et recuperation des id et color concernés,
//________ recuperation de tous les produits du panier qui ont (id  && couleur) != de celui du produit à suppr:
//________ enregistrement du panier filtré + suppression du DOM de l'article + recalcul des (quantite et montant) tot:
function supprProduct(allButtonSuppr) {
  for (let button of allButtonSuppr) {
    //console.log(button);

    button.addEventListener("click", function () {
      let basket = JSON.parse(localStorage.getItem("stockProduct"));
      let articleToSuppr = button.closest("article");
      let idToSuppr = articleToSuppr.dataset.id;
      let colorToSuppr = articleToSuppr.dataset.color;

      basket = basket.filter(
        (stock) => stock.id != idToSuppr || stock.color != colorToSuppr
      );

      localStorage.setItem("stockProduct", JSON.stringify(basket));
      //console.log(basket);
      articleToSuppr.remove();
      calculQuantTot(basket);
      calculAmountTot(basket);
    });
  }
}

//____________________________________ GESTION INPUT CHANGEMENT QUANTITE _________________________________/
//________ creation fonction qui permet la modification de la quantite d'un produit:
//________ ecoute d'un changement pour chaque input,
//________ rapprochement de la balise input avec son article parent et recuperation des id et color concernés,
//________ recherche dans le panier du produit qui a les mêmes (id && couleur) que celui dont on souhaite modifier la quantite,
//________ si ce produit est trouvé dans le panier et que la quantite renseignee repond à des conditions de validite 
//________ alors sa quantite est modifiée (= prend la valeur de l'input),
//________ sinon affichage d'un message pour rectification,
//________ enregistrement du "nouveau" panier + recalcul des (quantite et montant) tot
function changeQuantityProduct(allInput) {
  for (let input of allInput) {

    input.addEventListener("change", function () {
      let basket = JSON.parse(localStorage.getItem("stockProduct"));
      
      let articleTarget = input.closest("article");
      let idTarget = articleTarget.dataset.id;
      let colorTarget = articleTarget.dataset.color;
      
      let foundProduct = basket.find(
        (stock) => stock.id == idTarget && stock.color == colorTarget
      );
      
      if (foundProduct) {
        if (input.value >= 1 && input.value <= 100) {
          foundProduct.quantity = input.value;
        } else {
        alert(
          "La quantité renseignée doit être comprise entre 1 et 100 unités. Veuillez rectifier la quantité svp."
        );
        };
      };
      
      localStorage.setItem("stockProduct", JSON.stringify(basket));
      calculQuantTot(basket);
      calculAmountTot(basket);
    });
  };
};

//______________________________________________ GESTION FORMULAIRE ______________________________________/
//____________ selection des elements html :
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

let firstNameError = document.getElementById("firstNameErrorMsg");
let lastNameError = document.getElementById("lastNameErrorMsg");
let addressError = document.getElementById("addressErrorMsg");
let cityError = document.getElementById("cityErrorMsg");
let emailError = document.getElementById("emailErrorMsg");

//____________ déclaration des regex pour verification de la validite des champs:
let textRegex = /^[a-z'àåáçéèêëîïìíñœæôöòóùûüúÿ\s-]{2,30}$/i;
let addressRegex = /^[a-z'àåáçéèêëîïìíñœæôöòóùûüúÿ{0-9}\s-]{2,60}$/i;
let emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//____________ ecoute des différents champs + verification validite des donnees (regex) + message erreur le cas échéant :
inputFirstName.addEventListener("change", function () {
  if (inputFirstName.value.match(textRegex) == null) {
    firstNameError.textContent = "Veuillez entrer votre prénom svp";
  } else {
    firstNameError.textContent = " ";
  }
});

inputLastName.addEventListener("change", function () {
  if (inputLastName.value.match(textRegex) == null) {
    lastNameError.textContent = "Veuillez entrer votre nom svp";
  } else {
    lastNameError.textContent = " ";
  }
});

inputAddress.addEventListener("change", function () {
  if (inputAddress.value.match(addressRegex) == null) {
    addressError.textContent = "Veuillez entrer votre adresse svp";
  } else {
    addressError.textContent = " ";
  }
});

inputCity.addEventListener("change", function () {
  if (inputCity.value.match(textRegex) == null) {
    cityError.textContent =
      "Veuillez entrer la ville de votre lieu de résidence";
  } else {
    cityError.textContent = " ";
  }
});

inputEmail.addEventListener("change", function () {
  if (inputEmail.value.match(emailRegex) == null) {
    emailError.textContent = "Veuillez entrer votre adresse mail svp";
  } else {
    emailError.textContent = " ";
  }
});

//___________________________________________ GESTION BOUTON COMMANDER ________________________________________/
//________recuperation sous forme de tableau de tous les id des produits du panier :
const productsId = basket.map((element) => element.id);
//console.log("voici le tableau de tous les id du panier:", productsId);

//________ selection de l'element html "bouton commander" et ecoute au click du bouton:
//________ verification de la presence et validite des champs,
//________ si champs valides, creation de l'objet qui contient les infos attendues par l'API,
//________ requete POST avec l'order envoyee à l'API,
//________ l'API renvoi notamment l'orderId et la page "confirmation", le panier est vidé,
//________ si champs non valides, affichage message erreur
let orderButton = document.getElementById("order");

orderButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    inputFirstName.value.match(textRegex) !== null &&
    inputLastName.value.match(textRegex) !== null &&
    inputAddress.value.match(addressRegex) !== null &&
    inputCity.value.match(textRegex) !== null &&
    inputEmail.value.match(emailRegex) !== null &&
    inputFirstName.value !== "" &&
    inputLastName.value !== "" &&
    inputAddress.value !== "" &&
    inputCity.value !== "" &&
    inputEmail.value !== ""
  ) {
   //console.log("Tous les champs sont valides, ok");

    const userInfo = {
      contact : {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value
      },
      products : productsId
    };
    //console.log("voici les infos du user:", userInfo);

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then((resultats) => resultats.json())
      .then((data) => {
        //console.log("voici la data suite au fetch POST :", data);
        window.location.href = "./confirmation.html?order=" + data.orderId;
        localStorage.clear();
      })
  } else {
    alert(
      "La commande ne peut pas être validée. Les champs doivent être renseignés correctement."
    );
  }
});
