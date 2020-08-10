

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
    if(mySearch.trim()){
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mySearch}`)
      .then(res=>res.json())
      .then(data => {
        console.log(data);

        
        title.style.display='block';
        title=searchTitle.innerHTML;

      });

    }else{
      checkValue.classList.add("error");
      console.log('please type in a meal');
      checkValue.innerHTML ='please type in a meal';
    }

    // trying ternary operator
    // (mySearch.trim() ? "fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mySearch}`)"
    // .then(res=>res.json())
    // .then(data => {console.log(data)}) : 'please enter a value');



    

   
   


}

// dom events
  const searchBox=document.getElementById('searchbox');
  const myBtn = document.getElementById('mybtn');
   const title =document.getElementById('title');
   const  myRecipe = document.getElementById('myrecipe');
   const checkValue = document.getElementById('check-value');
   const searchTitle =document.getElementById('searchtitle');

//event lkstener
// myBtn.addEventListener('click', console.log('hi'));

myBtn.addEventListener('click',  getRecipe);
     
