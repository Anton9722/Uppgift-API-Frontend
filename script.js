let categoryDiv = document.getElementById("categoryDiv");
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
            console.log("click på: " + category.strCategory);
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