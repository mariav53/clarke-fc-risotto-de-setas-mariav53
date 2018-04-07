const allPrices =[];
const allItems = [];
let listIngredients='';
let shippingPrice;
let recipeName;
let currency;
let ingredientFinalPrice;
let subtotal = '';
let sumaTotal;

//función para obetener datos de la api
function getData(){
  fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(function(response){
    return response.json();
  })
  .then(function(response){
    const recipe = response.recipe;
    const ingredients = response.recipe.ingredients;

    //Mostrar ingredientes
    ingredients.forEach(function(ingredient, index){
    listIngredients += `
      <li class="ingredient_item">
        <input type="checkbox" name="ingredient_checkbox"  class="ingredient_checkbox" value='' onclick="addCheckItem()" id="">
        <input type="number" name="quantity" min="1" class="ingredient_quantity ingredient_quantity_${index}" onclick="addPriceIngredient(${index})" >
        <div class="ingredient_details">
          <h2 class="ingredient_name">${ingredient.product}</h2>
          <p class="ingredient_brand">${ingredient.brand ? ingredient.brand : 'N/A' }</p>
          <p class="ingredient_price ingredient_price_${index}">${ingredient.price}/kg</p>
        </div>
        <p class="ingredient_price_final ingredient_price_final_${index}">${ingredient.price}€</p>
      </li>
    `;
    currency = recipe.currency;
    recipeName = recipe.name;
    shippingPrice = parseFloat(recipe['shipping-cost']).toFixed(2);
    })

    //agregar ingredintes al html
    document.querySelector('.ingredients_list').innerHTML= listIngredients;

    //agregar otros datos de la receta
    const recipeTitle = document.querySelector('.main_header h1');
    recipeTitle.innerHTML = recipeName;

    //mostrar gastos de invio
    const shippingCost = document.querySelector('.shipping_cost');
    shippingCost.innerHTML =shippingPrice + currency;
  })
  .catch(function(error){
    console.log(error);
  })
}
//funcion para aumentar precio del ingrediente segun cantidad seleccionada
function addPriceIngredient(index) {
  const quantityValue = document.querySelector(`.ingredient_quantity_${index}`).value;
  const quantityItem = parseInt(document.querySelector(`.ingredient_quantity_${index}`).value);
  const priceValue = parseFloat(document.querySelector(`.ingredient_price_${index}`).innerHTML);
  const resultPrice = quantityValue * priceValue;
  const result = resultPrice.toFixed(2);
  const finalPrice = document.querySelector(`.ingredient_price_final_${index}`).innerHTML = result+'€';
}

//funcion para obtener total de items seleccionados
function addCheckItem() {
  const allCheckbox = document.querySelectorAll('.ingredient_checkbox');
  const countItemsChecked = document.querySelector('.items_count');
  let totalItemsChecked = 0;

  //obtener numero de items seleccionados
  allCheckbox.forEach(function(checkbox, index){
    if (checkbox.checked){
      let finalPriceContainer = document.querySelector(`.ingredient_price_final_${index}`).innerHTML;
      let finalPriceArticle = parseFloat(finalPriceContainer).toFixed(2);

      allPrices.push(finalPriceArticle);

      subtotal += finalPriceArticle;
      totalItemsChecked += +1;
    }
  })

  //pintar total de items seleccionados en html
  countItemsChecked.innerHTML = 'Items: ' + totalItemsChecked;
  showSubtotal();
}

function showSubtotal() {
  let ItemsTotal = document.querySelector('.items_subtotal');
  ItemsTotal.innerHTML = subtotal + currency;
}

//función para seleccionar todos los checkbox
function checkAll(e){
  e.preventDefault();
	const items=document.getElementsByName('ingredient_checkbox');
	for(let i=0; i<items.length; i++){
		if(items[i].type=='checkbox')
		items[i].checked=true;
	}
}
//función para deseleccionar todos los checkbox
function uncheckAll(e){
  e.preventDefault();
	const items=document.getElementsByName('ingredient_checkbox');
	for(let i=0; i<items.length; i++){
		if(items[i].type=='checkbox')
		items[i].checked=false;
	}
}

function addTotal(){
  //shippingPrice+subtotal
}



//EventListeners
getData();
document.querySelector('.checkAll').addEventListener('click', checkAll);
document.querySelector('.uncheckAll').addEventListener('click', uncheckAll);
