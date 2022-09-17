// requete des produits + récupération des infos :   
fetch("http://localhost:3000/api/products")
  .then(function(resultats) {
    return resultats.json ()
    }
  )
.then(function(value) {
  const products = value;
    console.log(value);

// boucle for of pour parcourir le tableau products et afficher les élements souhaités :
for (let product of products) {

    const linkElement = document.createElement("a")
    linkElement.href = "./product.html?id=" + product._id

    const article = document.createElement("article")

    const imageElement = document.createElement("img")
    imageElement.src = product.imageUrl
    imageElement.alt = product.altTxt
 
    const nameElement = document.createElement("h3")
    nameElement.innerText = product.name

    const descriptionElement = document.createElement("p")
    descriptionElement.innerText = product.description
    
    article.appendChild(imageElement)
    article.appendChild(nameElement)
    article.appendChild(descriptionElement)

    linkElement.appendChild(article)
   
    const sectionItems = document.querySelector(".items")
    sectionItems.appendChild(linkElement)
}
})
.catch(function(error) {
    console.log(error);
})


