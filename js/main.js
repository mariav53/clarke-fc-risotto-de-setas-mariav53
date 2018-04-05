const allPrices =[];
let listIngredients='';
let suma = 0;
const allItems = [];



//función para obetener datos de la api
function getData(){
  fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(function(response){
    return response.json();
  })
  .then(function(response){
    const ingredients = response.recipe.ingredients;

    //Mostrar ingredientes
    ingredients.forEach(function(ingredient, index){
    listIngredients += `
      <li class="ingredient_item">
        <input type="checkbox" name="ingredient_checkbox" id="">
        <input type="number" name="quantity" class="ingredient_quantity ingredient_quantity_${index}" onclick="sumarPrecioIngrediente(${index})" >
        <div class="ingredient_details">
          <h2 class="ingredient_name">${ingredient.product}</h2>
          <p class="ingredient_brand">${ingredient.brand ? ingredient.brand : 'N/A' }</p>
          <p class="ingredient_price ingredient_price_${index}">${ingredient.price}/kg</p>
        </div>
        <p class="ingredient_price_final ingredient_price_final_${index}"></p>
      </li>
    `;
    })

    //agregar ingredintes al html
    document.querySelector('.ingredients_list').innerHTML= listIngredients;

    //agregar otros datos de la receta
    const recipeName = document.querySelector('.main_header h1');
    recipeName.innerHTML = `${response.recipe.name}`;

    //mostrar gastos de invio
    const shippingCost = document.querySelector('.shipping_cost');
    shippingCost.innerHTML = `7.00${response.recipe.currency}`;

  //suma de todos los precios de los ingredientes
  // suma = 0;
  // for (var i=0; i<allPrices.length; i++) {
  //   suma +=allPrices[i]
  // }
  // document.querySelector('.items_subtotal').innerHTML= suma+'€';
  })
  .catch(function(error){
    console.log(error);
  })
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

//EventListeners
getData();
document.querySelector('.checkAll').addEventListener('click', checkAll);
document.querySelector('.uncheckAll').addEventListener('click', uncheckAll);


function sumarPrecioIngrediente(index) {
  const quantityValue = document.querySelector(`.ingredient_quantity_${index}`).value;
  const quantityItem = parseInt(document.querySelector(`.ingredient_quantity_${index}`).value);
  const priceValue = parseFloat(document.querySelector(`.ingredient_price_${index}`).innerHTML);
  const resultPrice = quantityValue * priceValue;
  const result = resultPrice.toFixed(2);
  const finalPrice = document.querySelector(`.ingredient_price_final_${index}`).innerHTML = result+'€';
  // console.log(result);

  //
  // suma = '';
  // for (var i=0; i<=b.length; i++) {
  //   suma += b[i];
  // }
  // document.querySelector('.items_subtotal').innerHTML= suma+'€';
}
