import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Firebaseプロジェクトの設定
const firebaseConfig = {
    apiKey: "AIzaSyBA2NazmqtWXZ5U7PExOvLf5w13jq1wR2Y",
    authDomain: "recipe-search-e481e.firebaseapp.com",
    projectId: "recipe-search-e481e",
    storageBucket: "recipe-search-e481e",
    messagingSenderId: "801965558067",
    appId: "1:801965558067:web:6efe116b3739d877c45646",
    measurementId: "G-BK5N1FDQZQ"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let ingredientSelectCount = 1;

document.getElementById('add-ingredient-button').addEventListener('click', () => {
    ingredientSelectCount++;
    const newSelect = document.createElement('select');
    newSelect.id = `ingredient-select-${ingredientSelectCount}`;
    newSelect.name = 'ingredient';
    newSelect.innerHTML = document.getElementById('ingredient-select-1').innerHTML;

    const newLabel = document.createElement('label');
    newLabel.htmlFor = newSelect.id;
    newLabel.textContent = `食材${ingredientSelectCount}から検索:`;

    const container = document.getElementById('ingredient-select-container');
    container.appendChild(newLabel);
    container.appendChild(newSelect);
});

document.getElementById('recipe-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const ingredients = [];
    for (let i = 1; i <= ingredientSelectCount; i++) {
        const ingredient = document.getElementById(`ingredient-select-${i}`).value;
        if (ingredient) {
            ingredients.push(ingredient);
        }
    }
    const dish = document.getElementById('dish-select').value;
    let searchCriteria;

    if (ingredients.length > 0) {
        searchCriteria = ['ingredients', ingredients];
    } else if (dish) {
        searchCriteria = ['name', dish];
    } else {
        alert('食材または料理名を選択してください。');
        return;
    }

    console.log('Searching for recipes with:', searchCriteria[1]);

    try {
        let q;
        if (searchCriteria[0] === 'ingredients') {
            q = query(collection(db, 'recipes'));
        } else {
            q = query(collection(db, 'recipes'), where('name', '==', searchCriteria[1]));
        }
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => doc.data());
        
        let filteredResults;
        if (searchCriteria[0] === 'ingredients') {
            // 選択されたすべての食材を含むレシピをフィルタリング
            filteredResults = results.filter(recipe => searchCriteria[1].every(ingredient => recipe.ingredients.includes(ingredient)));
        } else {
            // 料理名で検索された場合、結果はそのまま
            filteredResults = results;
        }
        
        console.log('Filtered Results:', filteredResults);

        displayResults(filteredResults, searchCriteria[0]);
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
});

document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('recipe-form').reset();
    document.getElementById('results').innerHTML = '';
    // セレクトボックスのリセット
    const container = document.getElementById('ingredient-select-container');
    while (container.children.length > 2) { // 最初の1つのセレクトボックスを残す
        container.removeChild(container.lastChild);
    }
    ingredientSelectCount = 1;
});

function displayResults(results, criteria) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length > 0) {
        results.forEach(dish => {
            const dishElement = document.createElement('div');
            if (criteria === 'name') {
                dishElement.textContent = `${dish.name}: ${dish.ingredients.join(', ')}`;
            } else {
                dishElement.textContent = dish.name;
            }
            resultsDiv.appendChild(dishElement);
        });
    } else {
        resultsDiv.textContent = '一致する料理が見つかりませんでした。';
    }
}




