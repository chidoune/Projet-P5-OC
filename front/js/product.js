/*************************** FICHIER PRODUCT.JS (RATTACHE A PRODUCT.HTML) ***************************/

//_______________________________________ GESTION AFFICHAGE PAGE ____________________________________/
//________ requete GET de l'ensemble des produits puis recuperation de la reponse au format json puis integration de celle-ci dans une constante "products":
fetch("http://localhost:3000/api/products")
  .then((resultats) => resultats.json())
  .then(function (value) {
    const products = value;
    //console.log("voici le tableau de tous les produits:", products);

//________ recuperation de l'id d'un produit via son url (lien dans la page accueil):
    const productId = new URL(window.location.href).searchParams.get("id");
    //console.log(productId)

//________ requete GET d'un produit via son id puis recuperation de la reponse au format json:
    fetch("http://localhost:3000/api/products/" + productId)
      .then((resultats) => resultats.json())
      .then(function (value) {
        //console.log("voici les infos du produit en cours:",value)

//________ puis boucle for of qui parcourt le tableau "products" et compare l'id du produit avec chacun des id de "products"
//________ si la correspondance est trouvée alors les elements du produit sont créés/selectionnés et affichés dans le DOM:     
        for (let product of products) {
          if (productId === product._id) {

            const imageElement = document.createElement("img");
            imageElement.src = product.imageUrl;
            imageElement.alt = product.altTxt;
            document.querySelector(".item__img").appendChild(imageElement);

            document.getElementById("title").textContent = product.name;
            document.getElementById("price").textContent = product.price;
            document.getElementById("description").textContent = product.description;
              

//________ boucle for of qui parcourt le tableau des couleurs du produit et crée l'element "option" avec choix des couleurs et l'affichage dans le DOM:
            for (let color of product.colors) {
              const colorElement = document.createElement("option");
              colorElement.textContent = color;
              document.querySelector("#colors").appendChild(colorElement);
            }
          }
        }
      });

//_____________________________________ GESTION AJOUT PRODUIT / PANIER _______________________________/
//________ creation d'une fonction qui enregistre le panier dans le localstorage:
    function saveStock(stock) {
      localStorage.setItem("stockProduct", JSON.stringify(stock));
    }

//________ creation d'une fonction qui recupere le panier à partir du localstorage:
    function getStock() {
      let stock = localStorage.getItem("stockProduct");
      if (stock == null) {
        return [];
      } else {
        return JSON.parse(stock);
      }
    }

//________ creation d'une fonction qui permet d'ajouter un produit au panier ou de modifier sa quantité:
//________ recherche si les references (id && color) du produit ajouté existent deja dans le panier,
//________ si c'est le cas, alors la quantite du produit deja en stock est incrementée avec celle du produit ajouté sous réserve de conditions,
    function addStock(product) {
      let stock = getStock();
      let foundProduct = stock.find(
        (stock) => stock.id == product.id && stock.color == product.color
        );    
      if (foundProduct) {
        if (product.quantity >= 1 && product.quantity <= 99) {
          if (product.quantity <= 100 - parseInt(foundProduct.quantity)) {
            foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(product.quantity);             
          } else if (product.quantity > 100 - parseInt(foundProduct.quantity)) {
            let limitQuantity = 100 - parseInt(foundProduct.quantity)
            alert("La quantité du produit ne peut pas dépasser 100 unités. Vous ne pouvez rajouter que " + limitQuantity + " unités du produit.");
          }
        }
//________ si ce n'est pas le cas, le produit est ajouté au panier:
      } else {
        if (
          product.color !== "" &&
          product.quantity >= 1 &&
          product.quantity <= 100
        ) {
          stock.push(product);
        }
      }
//________ le "nouveau" panier est ensuite enregistré dans le localstorage:
      saveStock(stock);
    }

//____________________________________ GESTION BOUTON "AJOUTER PANIER" ______________________________/
//________ selection des elements dans le html :
    const orderButton = document.querySelector("#addToCart");
    const quantityStock = document.getElementById("quantity");
    const colorStock = document.getElementById("colors");
//________ ecoute au click du bouton -> definition du panier et appel de la fonction addStock:
    orderButton.addEventListener("click", function () {
      let stock = {
        id: productId,
        quantity: quantityStock.value,
        color: colorStock.value,
      };
      addStock(stock);
    });
  });
