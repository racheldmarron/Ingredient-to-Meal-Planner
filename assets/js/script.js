// Define all DOM elements here
const getRecipeBtn = document.querySelector('.get-recipes')
const recipeResults = document.querySelector('.recipe-results')
const recipeNumber = document.querySelector('#recipe-number')
const myIngCheck = document.querySelector('.myIngCheck')
const ingredientInput = document.querySelector("#ing-text");
const ingredientForm = document.querySelector("#ing-form");
const ingredientList = document.querySelector("#ing-list");

var ingredients = [];

//API INFO HERE
const APIKEY = '5f7f6407a3df426fb065f2211ab36e41'


// Event Listeners Here
getRecipeBtn.addEventListener('click', getRecipe)

ingredientList.addEventListener("click", function(event) {
  var element = event.target; 
    var index = element.parentElement.getAttribute("data-index");
    ingredients.splice(index, 1);
    storeIngs();
    renderIngs();

});


ingredientForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var ingredientText = ingredientInput.value.trim();
  if (ingredientText === "") {
    return;
  }
  ingredients.push(ingredientText);
  ingredientInput.value = "";
  storeIngs();
  renderIngs();
});


// Functions Here
function renderIngs() {
  ingredientList.innerHTML = "";
  for (var i = 0; i < ingredients.length; i++) {
    var ingredient = ingredients[i];
    var li = document.createElement("li");
    li.textContent = ingredient;
    li.setAttribute('data-index', i);
    li.classList.add('col')
    li.classList.add('s3')
    ingredientList.appendChild(li);
  }
}

function init() {
  var storedIngs = JSON.parse(localStorage.getItem("Ings"));
  if (storedIngs !== null) {
    ingredients = storedIngs;
  }
  renderIngs();
}

function storeIngs() {
  localStorage.setItem("Ings", JSON.stringify(ingredients));
}


function getRecipe() {

    if (myIngCheck.checked){
        var myIngRank = "&ranking=2"
    }
    else {var myIngRank = ""}
    console.log(myIngRank)

    var ingredients = JSON.parse(localStorage.getItem("Ings"));
    console.log(ingredients)
    var recipeURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=`
    + ingredients 
    + myIngRank
    + `&number=`
    + recipeNumber.value
    + `&ignorePantry&apiKey=`
    + APIKEY; 

    console.log(recipeURL)
    fetch(recipeURL)
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .then((data) => generateRecipe(data))
}

function generateRecipe(data){
    let generatedRecipe = '';
    data.map(result => {
        generatedRecipe += 
        `
        <div class="col s6 m4 xl3">
        <div class="recipe-card card flow-text">
          <div class="card-image img-adjust waves-effect waves-block waves-light">
            <img class="img activator" src="${result.image}" alt="A picture of generated recipe">
          </div>
          <div class="card-content flow-text">
            <span class="recipe-title card-title flow-text activator grey-text text-darken-4"git>${result.title}<i class="material-icons right"></i></span>
            <p><a class="recipe-link" "href="#" data-recipe="${result.id}">Link to Recipe</a></p>
          </div>
          <div class="card-reveal flow-text">
            <span class="recipe-title flow-text card-title grey-text text-darken-4">${result.title}<i class="material-icons right">X</i></span>
            <p class="currentRecipeIngredient">Missing Ingredients: <span class="missingIng">${result.missedIngredientCount}</span></p>
          </div>
        </div>
    </div>
     `  
    })
    recipeResults.innerHTML = generatedRecipe;
}

// // Sidenav
// var instance = M.Sidenav.getInstance(elem);
// instance.open();
// instance.close();

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
//     var collapsibleElem = document.querySelector('.collapsible');
//     var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);
// });
        
