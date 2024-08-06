var $aQcfN$firebaseapp = require("firebase/app");
var $aQcfN$firebasefirestore = require("firebase/firestore");



// Firebaseプロジェクトの設定
const $a55a62f5fb368873$var$firebaseConfig = {
    apiKey: "AIzaSyBA2NazmqtWXZ5U7PExOvLf5w13jq1wR2Y",
    authDomain: "recipe-search-e481e.firebaseapp.com",
    projectId: "recipe-search-e481e",
    storageBucket: "recipe-search-e481e",
    messagingSenderId: "801965558067",
    appId: "1:801965558067:web:6efe116b3739d877c45646",
    measurementId: "G-BK5N1FDQZQ"
};
// Firebase初期化
const $a55a62f5fb368873$var$app = (0, $aQcfN$firebaseapp.initializeApp)($a55a62f5fb368873$var$firebaseConfig);
const $a55a62f5fb368873$var$db = (0, $aQcfN$firebasefirestore.getFirestore)($a55a62f5fb368873$var$app);
let $a55a62f5fb368873$var$ingredientSelectCount = 1;
document.getElementById("add-ingredient-button").addEventListener("click", ()=>{
    $a55a62f5fb368873$var$ingredientSelectCount++;
    const newSelect = document.createElement("select");
    newSelect.id = `ingredient-select-${$a55a62f5fb368873$var$ingredientSelectCount}`;
    newSelect.name = "ingredient";
    newSelect.innerHTML = document.getElementById("ingredient-select-1").innerHTML;
    const newLabel = document.createElement("label");
    newLabel.htmlFor = newSelect.id;
    newLabel.textContent = `\u{98DF}\u{6750}${$a55a62f5fb368873$var$ingredientSelectCount}\u{304B}\u{3089}\u{691C}\u{7D22}:`;
    const container = document.getElementById("ingredient-select-container");
    container.appendChild(newLabel);
    container.appendChild(newSelect);
});
document.getElementById("recipe-form").addEventListener("submit", async (event)=>{
    event.preventDefault();
    const ingredients = [];
    for(let i = 1; i <= $a55a62f5fb368873$var$ingredientSelectCount; i++){
        const ingredient = document.getElementById(`ingredient-select-${i}`).value;
        if (ingredient) ingredients.push(ingredient);
    }
    const dish = document.getElementById("dish-select").value;
    let searchCriteria;
    if (ingredients.length > 0) searchCriteria = [
        "ingredients",
        ingredients
    ];
    else if (dish) searchCriteria = [
        "name",
        dish
    ];
    else {
        alert("\u98DF\u6750\u307E\u305F\u306F\u6599\u7406\u540D\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        return;
    }
    console.log("Searching for recipes with:", searchCriteria[1]);
    try {
        let q;
        if (searchCriteria[0] === "ingredients") q = (0, $aQcfN$firebasefirestore.query)((0, $aQcfN$firebasefirestore.collection)($a55a62f5fb368873$var$db, "recipes"));
        else q = (0, $aQcfN$firebasefirestore.query)((0, $aQcfN$firebasefirestore.collection)($a55a62f5fb368873$var$db, "recipes"), (0, $aQcfN$firebasefirestore.where)("name", "==", searchCriteria[1]));
        const querySnapshot = await (0, $aQcfN$firebasefirestore.getDocs)(q);
        const results = querySnapshot.docs.map((doc)=>doc.data());
        let filteredResults;
        if (searchCriteria[0] === "ingredients") // 選択されたすべての食材を含むレシピをフィルタリング
        filteredResults = results.filter((recipe)=>searchCriteria[1].every((ingredient)=>recipe.ingredients.includes(ingredient)));
        else // 料理名で検索された場合、結果はそのまま
        filteredResults = results;
        console.log("Filtered Results:", filteredResults);
        $a55a62f5fb368873$var$displayResults(filteredResults, searchCriteria[0]);
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
});
document.getElementById("reset-button").addEventListener("click", ()=>{
    document.getElementById("recipe-form").reset();
    document.getElementById("results").innerHTML = "";
    // セレクトボックスのリセット
    const container = document.getElementById("ingredient-select-container");
    while(container.children.length > 2)container.removeChild(container.lastChild);
    $a55a62f5fb368873$var$ingredientSelectCount = 1;
});
function $a55a62f5fb368873$var$displayResults(results, criteria) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    if (results.length > 0) results.forEach((dish)=>{
        const dishElement = document.createElement("div");
        if (criteria === "name") dishElement.textContent = `${dish.name}: ${dish.ingredients.join(", ")}`;
        else dishElement.textContent = dish.name;
        resultsDiv.appendChild(dishElement);
    });
    else resultsDiv.textContent = "\u4E00\u81F4\u3059\u308B\u6599\u7406\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002";
}


//# sourceMappingURL=index.js.map
