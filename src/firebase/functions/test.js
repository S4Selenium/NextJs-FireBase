const firebase = require("@firebase/testing");
const fs = require("fs");

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLRMexhCQyhC4ek5txrmCTNOugYSVJWdI",
  authDomain: "nova-bd8bd.firebaseapp.com",
  projectId: "nova-bd8bd",
  storageBucket: "nova-bd8bd.appspot.com",
  messagingSenderId: "99056299917",
  appId: "1:99056299917:web:c220a47dcf0603f52657c4",
};

// Rules for Firestore and Authentication
const firestoreRules = fs.readFileSync("path/to/firestore.rules", "utf8");
const authRules = fs.readFileSync("path/to/auth.rules", "utf8");

describe("Firebase Auth and Firestore Rules Test", () => {
  // Initialize Firebase app with custom rules
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: firebaseConfig.projectId,
      rules: firestoreRules,
    });
    await firebase.loadAuthRules({
      projectId: firebaseConfig.projectId,
      rules: authRules,
    });
  });

  // Clear the Firebase emulator data after each test
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: firebaseConfig.projectId });
  });

  // Clean up Firebase resources after all tests
  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  test("Signup with different username and password", async () => {
    const auth = firebase.auth();
    const userCredential = await auth.createUserWithEmailAndPassword(
      "testuser1@example.com",
      "testpassword1"
    );
    expect(userCredential.user).not.toBeNull();
  });

  test("Signup with same username and password", async () => {
    const auth = firebase.auth();
    // Use the same credentials as the first test
    await expect(
      auth.createUserWithEmailAndPassword(
        "testuser1@example.com",
        "testpassword1"
      )
    ).rejects.toThrow("auth/email-already-in-use");
  });

  test("Login with valid credentials", async () => {
    const auth = firebase.auth();
    const userCredential = await auth.signInWithEmailAndPassword(
      "testuser1@example.com",
      "testpassword1"
    );
    expect(userCredential.user).not.toBeNull();
  });

  test("Login with invalid credentials", async () => {
    const auth = firebase.auth();
    // Use incorrect password for login
    await expect(
      auth.signInWithEmailAndPassword("testuser1@example.com", "wrongpassword")
    ).rejects.toThrow("auth/wrong-password");
  });
});
