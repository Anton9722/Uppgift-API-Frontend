let categoryDiv = document.getElementById("categoryDiv");
let searchDiv = document.getElementById("searchDiv");
let categoryTitle = document.getElementById("categoryTitle");
let recipePageDiv = document.getElementById("recipePageDiv");
let titleAndImgDiv = document.getElementById("titleAndImgDiv");
let instructionAndBtnDiv = document.getElementById("instructionAndBtnDiv");
let savedRecipesBtn = document.getElementById("savedRecipesBtn");
let searchBar = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
let savedRecipesDiv = document.getElementById("savedRecipesDiv");
startPage();

//funktion för att skapa startsidan
function startPage() {
    savedRecipesDiv.hidden = true;
    searchDiv.hidden = false;
    categoryTitle.hidden = false;
    titleAndImgDiv.hidden = true;
    categoryDiv.style.gridTemplateColumns = "repeat(2, 1fr)";
    //fetchar alla kategorier
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => {
    
        //loopar igenom alla kategorier och lägger till titel och bild för varje kategori i min "catagoryDiv"
        data.categories.map((category) => {
            let categorySelector = document.createElement("div");
            let categoryName = document.createElement("h2");
            let thumbNail = document.createElement("img");
    
            categorySelector.style.backgroundColor = "#CEDEBD";
            categorySelector.style.margin = '20px';
            categorySelector.style.borderRadius = "5px";
    
            thumbNail.src = category.strCategoryThumb;
            thumbNail.style.marginTop = "10px";
    
            categoryName.innerText = category.strCategory;
    
            categorySelector.appendChild(thumbNail);
            categorySelector.appendChild(categoryName);
            categoryDiv.appendChild(categorySelector)
    
            //lägger till en eventlistner till varje div så vi kan klicka och välja rätt kategori
            categorySelector.addEventListener("click", () => {
                
                //fångar vilken kategori användaren klickat på
                let selectedCategory = category.strCategory;
    
                //rensar diven när användare klickat på en katogori
                categoryDiv.innerHTML = ""
    
                buildCategorySearchResult(categoryDiv, selectedCategory);
    
            })
            //lägger till effekt när man har muspekaren på diven så man ska förstå att det är en knapp
            categorySelector.addEventListener("mouseover", () => {
                categorySelector.style.backgroundColor = "#435334";
                categorySelector.style.boxShadow = "10px 20px 30px black"
            })
            //tar bort effekten igen när muspekaren inte är på diven
            categorySelector.addEventListener("mouseout", () => {
                categorySelector.style.backgroundColor = "#CEDEBD";
                categorySelector.style.boxShadow = "";
            })
        })
    
    
    })
}



//funktion som skriver ut resultat av vald kategori
function buildCategorySearchResult(parentDiv, category) {

    //skapar lista som vi ska skriva ut resultaten i
    let resultUl = document.createElement("ul");

    parentDiv.style.gridTemplateColumns = "";
    
    //fetchar alla matträtter från vald kategori
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category)
    .then(res => res.json())
    .then(data => {
        
        //loopar igenom alla meals från en kategori och lägger till det elementen som behövs
        data.meals.map((meal) => {
            
            let li = document.createElement("li");

            let searchResultImg = document.createElement("img");
            searchResultImg.src = meal.strMealThumb;
            searchResultImg.style.width = "200px";

            let searchResultMealName = document.createElement("h1");
            searchResultMealName.innerText = meal.strMeal;
            searchResultMealName.style.marginLeft = "auto";
            searchResultMealName.style.marginRight = "auto";
            searchResultMealName.style.marginTop = "auto";
            searchResultMealName.style.marginBottom = "auto";

            let btn = document.createElement("button");
            btn.innerText = "Recipe"
            btn.style.marginLeft = "auto";
            btn.style.marginRight = "15px";
            btn.style.marginTop = "auto";
            btn.style.marginBottom = "auto";

            li.appendChild(searchResultImg);
            li.appendChild(searchResultMealName);
            li.appendChild(btn);
            resultUl.appendChild(li);
            parentDiv.appendChild(resultUl);

            //när användare klickar på knappen så kallar vi på vår funtion som bygger upp recept
            btn.addEventListener("click", () => {
                //skickar med id så vi vet vilket recept vi ska visa
                buildRecipePage(meal.idMeal);
            })
            
        })

    })

}

//funktion som bygger recept sidan efter specifikt id
function buildRecipePage(mealId) {
    //gömmer vissa element och tömmer allt i categoryDiv
    searchDiv.hidden = true;
    categoryTitle.hidden = true;
    categoryDiv.innerHTML = "";
    titleAndImgDiv.hidden = false;

    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)
    .then(res => res.json())
    .then(data => {

        let meal = data.meals[0];
        console.log(meal);

        //arrays för alla ingredients och mesurements
        let ingredientsArray = [];
        let measurementArray = [];

        //loopar igenom json objektet och pushar in ingredients i ingredientsArray och mesurements i mesurmentArray
        Object.keys(meal).forEach(function(key) {

            if (key.includes("Ingredient") && meal[key] != " " && meal[key] != "" && meal[key] != null){

                ingredientsArray.push(meal[key]);

            } else if (key.includes("Measure") && meal[key] != " " && meal[key] != "" && meal[key] != null) {

                measurementArray.push(meal[key]);
            }
        })

        let title = document.createElement("h1");
        title.innerText = meal.strMeal;

        let img = document.createElement("img");
        img.src = meal.strMealThumb;
        img.style.width = "450px";

        let btn = document.createElement("button");
        btn.innerText = "Save This Recipe"

        let commentInput = document.createElement("input");
        commentInput.placeholder = "This comment will also be saved...";

        let ul = document.createElement("ul");
        let ingreTitle = document.createElement("h2")
        ingreTitle.innerText = "Ingredients"
        ul.appendChild(ingreTitle);

        //loopar igenom array och lägger till ingredients och mesurments i ul 
        for(i = 0; i < ingredientsArray.length; i++) {
            let li = document.createElement("li");
            li.innerText = ingredientsArray[i] + " (Measurement: " + measurementArray[i] + ")";
            ul.appendChild(li);
        }

        let instructions = document.createElement("p");
        instructions.innerText = meal.strInstructions;

        let homeBtn = document.createElement("button");
        homeBtn.innerText = "Go Back"
        

        titleAndImgDiv.appendChild(homeBtn);
        titleAndImgDiv.appendChild(title);
        titleAndImgDiv.appendChild(img);
        titleAndImgDiv.appendChild(instructions);
        instructionAndBtnDiv.appendChild(ul);
        instructionAndBtnDiv.appendChild(commentInput);
        instructionAndBtnDiv.appendChild(btn);

        //knapp för att spara recipe
        btn.addEventListener("click", () => {
            saveRecipe(meal.idMeal, commentInput.value);
        })

        //för att gå tillbaka till startsidan
        homeBtn.addEventListener("click", () => {
            title.remove();
            img.remove();
            instructions.remove();
            ul.remove();
            btn.remove();
            homeBtn.remove();
            commentInput.remove();
            startPage();
        })

    })

}


//funktion för att spara recipe i databasen
function saveRecipe(mealId, comment) {
    
    let mealData = {
        id: mealId,
        comment: comment,
    };
    fetch("http://localhost:8080/meal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData),
    })
    .then(res => res.json())
    .then(data => {
        alert("Recipe Saved")
    });
    
}

searchBtn.addEventListener("click", () => {
    
    if(searchBar.value == "") {
        alert("The SearchBar Cant Be Empty")
    }
    else {
        
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchBar.value)
        .then(res => res.json())
        .then(data => {
            if(data.meals != null) {
                let resultUl = document.createElement("ul");
                categoryDiv.style.gridTemplateColumns = "";
                categoryDiv.innerHTML = "";
                data.meals.map((meal) => {
                    
                    let li = document.createElement("li");
        
                    let searchResultImg = document.createElement("img");
                    searchResultImg.src = meal.strMealThumb;
                    searchResultImg.style.width = "200px";
        
                    let searchResultMealName = document.createElement("h1");
                    searchResultMealName.innerText = meal.strMeal;
                    searchResultMealName.style.marginLeft = "auto";
                    searchResultMealName.style.marginRight = "auto";
                    searchResultMealName.style.marginTop = "auto";
                    searchResultMealName.style.marginBottom = "auto";
        
                    let btn = document.createElement("button");
                    btn.innerText = "Recipe"
                    btn.style.marginLeft = "auto";
                    btn.style.marginRight = "15px";
                    btn.style.marginTop = "auto";
                    btn.style.marginBottom = "auto";
        
                    li.appendChild(searchResultImg);
                    li.appendChild(searchResultMealName);
                    li.appendChild(btn);
                    resultUl.appendChild(li);
                    categoryDiv.appendChild(resultUl);
        
                    //när användare klickar på knappen så kallar vi på vår funtion som bygger upp recept
                    btn.addEventListener("click", () => {
                        //skickar med id så vi vet vilket recept vi ska visa
                        buildRecipePage(meal.idMeal);
                    })
                    
                })

            } else {
                alert("No Results For That Search")
            }
            
        })

    }

})

//knapp för att se alla sparade recept
savedRecipesBtn.addEventListener("click", () => {

    let imgLink = getMealImgFromId("52767");
    console.log(imgLink);

    savedRecipesDiv.hidden = false;
    searchDiv.hidden = true;
    categoryTitle.hidden = true;
    categoryDiv.innerHTML = "";

    fetch("http://localhost:8080/meals")
    .then(res => res.json())
    .then(data => {

        let ul = document.createElement("ul");

        data.map((meal) => {
            console.log(meal);
            let li = document.createElement("li");
        })
    })

})

//funktion som hämtar bilden för ett recept efter specifikt id
async function getMealImgFromId(mealId) {
   const res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)
   const data = await res.json()
   let imgLink = data.meals[0].strMealThumb;
   return imgLink;
}