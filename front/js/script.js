
/***************************** FICHIER SCRIPT.JS (RATTACHE A INDEX.HTML) ****************************/

//_______________________________________ GESTION AFFICHAGE PAGE ____________________________________/
//________ requete GET de l'ensemble des produits puis recuperation de la reponse au format json 
//________ puis integration de celle-ci dans une constante "products" (tableau d'objets):
fetch("http://localhost:3000/api/products")
.then((resultats) => resultats.json())
.then(function(value) {
  const products = value
  //console.log("voici le tableau de tous les produits:", products);

//________ et boucle for of qui parcourt chaque element du tableau pour creer 
//________ et afficher chacun des elements dans le DOM:
for (let product of products) {

  const article = document.createElement("article")

  const linkElement = document.createElement("a")
  linkElement.href = "./product.html?id=" + product._id

  const imageElement = document.createElement("img")
  imageElement.src = product.imageUrl
  imageElement.alt = product.altTxt
 
  const nameElement = document.createElement("h3")
  nameElement.innerText = product.name

  const descriptionElement = document.createElement("p")
  descriptionElement.innerText = product.description

  const sectionItems = document.querySelector(".items")
  article.appendChild(imageElement)
  article.appendChild(nameElement)
  article.appendChild(descriptionElement)
  linkElement.appendChild(article)
  sectionItems.appendChild(linkElement)

}})
//________ sinon si la requete n'a pas fonctionnee affichage "error" dans la console:
.catch(function(error) {
    console.log(error)
})


