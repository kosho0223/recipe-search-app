import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
    newLabel.textContent = `食材${ingredientSelectCount}:`;

    const container = document.getElementById('ingredient-select-container');
    container.appendChild(newLabel);
    container.appendChild(newSelect);
});

document.getElementById('add-recipe-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = [];
    for (let i = 1; i <= ingredientSelectCount; i++) {
        const ingredient = document.getElementById(`ingredient-select-${i}`).value;
        if (ingredient) {
            ingredients.push(ingredient);
        }
    }

    if (!recipeName || ingredients.length === 0) {
        alert('料理名と少なくとも1つの食材を選択してください。');
        return;
    }

    try {
        await addDoc(collection(db, 'recipes'), {
            name: recipeName,
            ingredients: ingredients
        });
        document.getElementById('message').textContent = '料理が追加されました。';
    } catch (error) {
        console.error('Error adding document: ', error);
        document.getElementById('message').textContent = '料理の追加に失敗しました。';
    }

    document.getElementById('add-recipe-form').reset();
    ingredientSelectCount = 1;
    const container = document.getElementById('ingredient-select-container');
    while (container.children.length > 2) { // 最初の1つのセレクトボックスを残す
        container.removeChild(container.lastChild);
    }
});

document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});


