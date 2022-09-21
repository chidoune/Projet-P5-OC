/*************************** FICHIER CONFIRMATION.JS (RATTACHE A CONFIRMATION.HTML) ***************************/

// _________ récupération de l'orderId dans l'url de la page "confirmation" envoyée en réponse :
const urlOrderId = new URL(window.location.href).searchParams.get("orderId")
console.log(urlOrderId)

//__________ selection de l'element html et intégration du numero de commande orderId:
const orderValidate = document.getElementById("orderId")
orderValidate.textContent = urlOrderId
