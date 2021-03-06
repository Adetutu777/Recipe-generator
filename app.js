const searchBox = document.getElementById('searchbox');
//console.log(searchBox)
let mealArray = [];


let errIndicator=''
let getRecipe = (e) => {

  let mySearch = searchBox.value;
  e.preventDefault();

  //Check if user do not enter any value
  if (mySearch.length ===0){
    errorFunc()
    return;
  }

  // check id user input less than 2 characters
  if (mySearch.length <=2){
    checkValue.innerHTML='meal name too short, try another search'
    return;
  }
   spinnerLoading();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mySearch}`)
 
    .then((i) => i.json())
    .then((r) => (() => {
              //check if the returned data is null
              errIndicator= r;
            mealArray = [...r.meals];
            displayUI();
           
          })()
    )
   
   .finally(f =>{
    spinnerFinish() 
    // if returned data is null let user know meal cannt be found
    if(errIndicator.meals===null){
      checkValue.innerHTML =`${searchbox.value} not found, try another search`
      searchBox.value = '';
    }

   })
        
};




  //add slice method to display  max  9 results 
  //irrespective of what is gotten from the api
let displayRes = () => {
  myRecipe.innerHTML = mealArray.slice(0, 9).map(
    (meal, index) => `
        <div class ='img-meal'>
        <img src = '${meal.strMealThumb}' alt ='${meal.strMeal}'/>
        <div class='meal-desc' />
        <h4>${meal.strMeal}</h4>.
        <button 
        class='full-details'
        id='full-details'
        onclick="fullMeals(this)"
        value=${index}>Full Info </button>
        </div>
         </div>
         </div>
        
          `
  ).join('')
};

let noResult = () => {
  nullResp.style.display = 'block';
  myRecipe.innerHTML = '';
};

let errorFunc = () => {
  checkValue.classList.add('error');
  console.log('please type in a meal');
  checkValue.innerHTML = 'please type in a meal';
};


//let user know meal not found
let invalidInput =()=>{
    checkValue.classList.add('error');
  checkValue.innerHTML = 'Meal not found, try another search';
  spinnerEnd()
  return;

}


let displayUI = () => {
  searchBox.value = '';
  displayRes();
  directionBtn.style.display='block';
  // title.innerHTML=`<h2>Search results for '${mySearch}'</h2>`
};


let ingMesh = {
  ing: [],
  measure: [],
};

let fullMeals = (e) => {
  
  let currentMeal = mealArray[e.value];
  Object.keys(currentMeal).forEach((key) => {
    // check if strmeasure is in available in the keys
    let m = key.includes('strMeasure');
    // grab the values of each available keys values and push into the empty array ingMesh
    m ? ingMesh.measure.push(currentMeal[key]) : '';

    let n = key.includes('strIngredient');
    n ? ingMesh.ing.push(currentMeal[key]) : '';
  });

// filter the measurement that are not empty that contains two or more elements & filter the elements that returns strings with spaces in between
 ingMesh.measure = ingMesh.measure.filter((m) => m != ' ');
//  filter out single elements that returns empty string with no spacing in between
	  ingMesh.measure = ingMesh.measure.filter((m) => m != '');
  ingMesh.ing = ingMesh.ing.filter((v) => v != '');
	

  console.log('my ingredients', ingMesh);
  
  myRecipe.innerHTML= `
  <div class ='my-inst'>
  <h4>${currentMeal.strMeal}</h4>
  <img src = '${currentMeal.strMealThumb}' class='mymeal' alt ='${currentMeal.strMeal}'/>

  <div class = 'my-inst-info'>
  <h2 class ='cookIns'>Category:</h2>
  <h5 class='MealIns'> ${currentMeal.strCategory}</h3>

  <h2 class ='cookIns'>Area:</h2>
  <h5 class='MealIns'> ${currentMeal.strArea}</h3>

    <h2 class ='cookIns'>Ingredients</h2>
 <h4 class='MealIns'> ${ingMesh.ing ? `<p>${ingMesh.ing} </p>`: ''}</h4>

    <h2 class ='cookIns'>Cooking Instructions:</h2>
    <h4 class ='MealIns'> ${currentMeal.strInstructions}</h4>

    <h2 class='cookIns'>Click link below for youtube description</h2>
    <p class='MealIns'><a class ='youlink' href='${currentMeal.strYoutube}'class='link'>${currentMeal.strYoutube}</a></p>
    </div>
    </div>

  ` 
};

let hideBtn= (e) => {

  myRecipe.style.display='none';
  fullMeal.style.display='block';
  loadingspinner.style.display='block'

}

const mealBox = document.getElementById('mealbox');
const myBtn = document.getElementById('mybtn');
const title = document.getElementById('title');
const myRecipe = document.getElementById('myrecipe');
const checkValue = document.getElementById('check-value');
const searchTitle = document.getElementById('searchtitle');
const search = document.getElementById('search');
const nullResp = document.getElementById('nully-resp');
const fullMeal = document.getElementById('meal-full-details');
//const fullMealBtn = document.getElementById('full-details');
const directionBtn = document.getElementById('direction-btn');
const loadingCont = document.getElementById('container');
//event listener
myBtn.addEventListener('click', getRecipe);


//instantiate loadind
let spinnerLoading = () => {
  checkValue.innerHTML=''
  myRecipe.innerHTML ='';
mybtn.classList.add('hide');
 loadingCont.classList.remove('hide'); 
}

//remove loading
let spinnerFinish=()=>{
   loadingCont.classList.add('hide');
 mybtn.classList.remove('hide');
}
loadingCont.classList.add('hide'); 
