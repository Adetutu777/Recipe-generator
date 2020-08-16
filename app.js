

// let mySearch = searchBox.value;
// searchBox.value='';
// search meal & get recipe
// 
let getRecipe =(e)=>{
    e.preventDefault();
// input validation
    let mySearch = searchBox.value;
    console.log(mySearch);
     // // Clear form
    searchBox.value='';

    

    // to get value
    if(mySearch){
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mySearch}`)
      // .then(m=>()=>{
      //   error.style.display='none';
      // })
      // .then(c=>count+1)
      // .then(d=>()=>{
      //   if (count>=1){
      //     logobox.classList.add('result-div', 'img-after-result');
      //   }
      // })
      .then(res=>res.json())
      .then(data => {
        console.log(data);
        // title.style.display='block';
        // title = myRecipe.innerHTML;

     

        if(data.meals ===null){
          console.log('no result')
          
          nullResp.style.display = 'block';
          myRecipe.innerHTML ='';
         

        }else{
          myRecipe.innerHTML=data.meals.map(meal=>`
          <div class ='img-meal'>
          <img src = '${meal.strMealThumb}' alt ='${meal.strMeal}'/>
         <div class='meal-desc' />
         <h4>${meal.strMeal}</h4>.

         </div>

         </div>


          </div>
          `) .join('');

        }

      });

    }else{
      checkValue.classList.add("error");
      console.log('please type in a meal');
      checkValue.innerHTML ='please type in a meal';
    }

}

// let enterSrch =()=>{
//   mealBox.style.display = 'none';
// }
// let reloadFunc = () => location.reload();

// dom events
let count =0;
const mealBox = document.getElementById('mealbox');
  const searchBox=document.getElementById('searchbox');
  const myBtn = document.getElementById('mybtn');
   const title =document.getElementById('title');
   const  myRecipe = document.getElementById('myrecipe');
   const checkValue = document.getElementById('check-value');
   const searchTitle =document.getElementById('searchtitle');
   const search =document.getElementById('search');
   const nullResp = document.getElementById('nully-resp');

//event listener
myBtn.addEventListener('click',  getRecipe);
     
