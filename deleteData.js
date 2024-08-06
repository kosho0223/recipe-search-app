const admin = require('firebase-admin');
const serviceAccount = require('./recipe-search-e481e-firebase-adminsdk-h47jf-77bce20a03.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const deleteDocument = async (docId) => {
  try {
    await db.collection('recipes').doc(docId).delete();
    console.log('Document successfully deleted: ', docId);
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

// ドキュメントIDを指定して削除
deleteDocument('PPSMQW44FcJVRtD32JLv');
deleteDocument('nB1gM3Yf9QJFZjbNNYEI');
