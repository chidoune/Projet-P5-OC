/***************************** FICHIER SCRIPT.JS (RATTACHE A INDEX.HTML) ****************************/

//_______________________________________ GESTION AFFICHAGE PAGE ____________________________________/
//________ requete GET de l'ensemble des produits + récupération des infos :   
fetch("http://localhost:3000/api/products")
//________ analyse de la reponse au format json :
.then((resultats) => resultats.json())
//________ récupération de la reponse et intégration dans une constante tableau "products" :
.then(function(value) {
  const products = value
  //console.log("voici le tableau de tous les produits:", products);

//________ boucle for of pour parcourir le tableau "products" :
for (let product of products) {

//________ création des elements html avec renseignement des attributs :

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

//________ selection de l'element html "section .items" et affichage des elements dans le DOM :
  const sectionItems = document.querySelector(".items")
  article.appendChild(imageElement)
  article.appendChild(nameElement)
  article.appendChild(descriptionElement)
  linkElement.appendChild(article)
  sectionItems.appendChild(linkElement)

}})
//________ sinon si la requete n'a pas fonctionnee affichage "error" dans la console :
.catch(function(error) {
    console.log(error)
})


