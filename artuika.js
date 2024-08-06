import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, getDocs } from "firebase/firestore";

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

document.getElementById('add-ingredient-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const ingredientName = document.getElementById('ingredient-name').value;

    if (!ingredientName) {
        alert('食材名を入力してください。');
        return;
    }

    try {
        // Check if ingredient already exists
        const q = query(collection(db, 'ingredients'));
        const querySnapshot = await getDocs(q);
        const existingIngredients = querySnapshot.docs.map(doc => doc.data().name);

        if (existingIngredients.includes(ingredientName)) {
            document.getElementById('message').textContent = 'この食材は既に存在します。';
        } else {
            await addDoc(collection(db, 'ingredients'), {
                name: ingredientName
            });
            document.getElementById('message').textContent = '食材が追加されました。';
        }
    } catch (error) {
        console.error('Error adding document: ', error);
        document.getElementById('message').textContent = '食材の追加に失敗しました。';
    }

    document.getElementById('add-ingredient-form').reset();
});

document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});
