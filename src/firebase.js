import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SEND_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
});

export const TYPE_COLLECTIONS = {
	BADMINTON_FTEL: 'BADMINTON_FTEL',
};

export const writeDataToFirestore = async ({ collection, docId, data }) => {
	try {
		const ref = firebase.firestore().collection(collection).doc(docId);
		const doc = await ref.get();

		const timestampData = { ...data };

		if (doc.exists) {
			await ref.update(Object.assign({}, timestampData));
			return { success: true, message: 'Document successfully updated!' };
		} else {
			await ref.set(Object.assign({}, { ...timestampData }));
			return { success: true, message: 'Document successfully created!' };
		}
	} catch (error) {
		return { success: false, error };
	}
};

export const readDataFromFirestore = async ({ collection, docId }) => {
	try {
		const ref = firebase.firestore().collection(collection).doc(docId);
		const doc = await ref.get();

		if (doc.exists) {
			return { success: true, data: doc.data() };
		} else {
			return {
				success: false,
				message: `Document with ID ${docId} does not exist.`,
			};
		}
	} catch (error) {
		return { success: false, error };
	}
};

export const fetchDataRead = async ({ collection, docId }) => {
	const result = await readDataFromFirestore({ collection, docId })
		.then((res) => {
			return res.success ? res.data : '';
		})
		.catch((error) => {
			return;
		});
	return result;
};

export const deleteDataFromFirestore = async ({ collection, docId }) => {
	try {
		const ref = firebase.firestore().collection(collection).doc(docId);
		const doc = await ref.get();

		if (doc.exists) {
			await ref.delete();
			return { success: true, message: 'Document successfully deleted!' };
		} else {
			return {
				success: false,
				message: `Document with ID ${docId} does not exist.`,
			};
		}
	} catch (error) {
		return { success: false, error };
	}
};

export const listenToDocumentChanges = ({ collection, docId, callback }) => {
	const ref = firebase.firestore().collection(collection).doc(docId);

	const unsubscribe = ref.onSnapshot(
		(doc) => {
			if (doc.exists) {
				callback({ success: true, data: doc.data() });
			} else {
				callback({
					success: false,
					message: `Document with ID ${docId} does not exist.`,
				});
			}
		},
		(error) => {
			callback({ success: false, error });
		},
	);

	// Trả về hàm unsubscribe để ngừng lắng nghe
	return unsubscribe;
};

const _firebaseStorage = firebase;

export default _firebaseStorage;
