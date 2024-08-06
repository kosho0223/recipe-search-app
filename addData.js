const admin = require('firebase-admin');
const serviceAccount = require('./recipe-search-e481e-firebase-adminsdk-h47jf-77bce20a03.json'); // ファイル名を修正

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const addRecipe = async (name, ingredients) => {
  try {
    const docRef = db.collection('recipes').doc();
    await docRef.set({
      name: name,
      ingredients: ingredients
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

addRecipe('餃子', ['小麦','卵','大豆','豚','鶏','ゴマ' ]);
addRecipe('肉まん', ['小麦','乳製品','大豆','豚','鶏','ゴマ' ]);
addRecipe('チャーハン', ['小麦','卵','乳製品','大豆','豚','鶏','ゴマ','ゼラチン' ]);
addRecipe('麻婆豆腐', ['小麦','乳製品','大豆','豚','鶏','ゴマ','ゼラチン' ]);
addRecipe('回鍋肉', ['小麦','卵','大豆','豚','鶏','ゴマ' ]);
addRecipe('青椒肉絲', ['小麦','卵','大豆','豚','牛肉','ゴマ' ]);