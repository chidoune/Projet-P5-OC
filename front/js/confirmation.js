/************************ FICHIER CONFIRMATION.JS (RATTACHE A CONFIRMATION.HTML) ***********************/

// _________ recuperation de l'orderId dans l'url de la page "confirmation" envoyée en reponse :
const urlOrderId = new URL(window.location.href).searchParams.get("order");
console.log(urlOrderId);

//__________ selection de l'element html et affichage du numero de commande orderId:
const orderValidate = document.getElementById("orderId");
orderValidate.textContent = urlOrderId;
