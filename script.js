let categoryDiv = document.getElementById("categoryDiv");
categoryDiv.style.gridTemplateColumns = "repeat(2, 1fr)";

//fetchar alla kategorier
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
.then(res => res.json())
.then(data => {
    console.log(data);

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


//funktion som skriver ut resultat av vald kategori
function buildCategorySearchResult(parentDiv, category) {

    //skapar lista som vi ska skriva ut resultaten i
    let resultUl = document.createElement("ul");

    parentDiv.style.gridTemplateColumns = "";
    
    //fetchar alla matträtter från vald kategori
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category)
    .then(res => res.json())
    .then(data => {
        
        data.meals.map((meal) => {
            console.log(meal);
            
            //fångar id av meal
            let mealId = meal.idMeal;

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
            
        })

    })



}
