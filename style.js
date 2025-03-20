// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Login
document.getElementById('googleLogin').addEventListener('click', function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.getElementById('userGreeting').textContent = `Hello, ${user.displayName}!`;
            document.getElementById('userGreeting').style.display = "block";
            document.getElementById('googleLogin').style.display = "none";
            document.getElementById('logout').style.display = "block";
        })
        .catch(error => console.error("Login Error:", error));
});

// Logout
document.getElementById('logout').addEventListener('click', function () {
    auth.signOut()
        .then(() => {
            document.getElementById('userGreeting').style.display = "none";
            document.getElementById('googleLogin').style.display = "block";
            document.getElementById('logout').style.display = "none";
        })
        .catch(error => console.error("Logout Error:", error));
});

// Search Functionality
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const query = document.getElementById('searchQuery').value.trim();

    if (query) {
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        const aiUrl = `https://www.google.com/search?q=${encodeURIComponent(query + " site:openai.com OR site:deepmind.com OR site:anthropic.com")}`;
        const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

        document.getElementById('googleLink').href = googleUrl;
        document.getElementById('googleLink').textContent = `Search for "${query}" on Google`;

        document.getElementById('aiLink').href = aiUrl;
        document.getElementById('aiLink').textContent = `Search for "${query}" on AI Websites`;

        document.getElementById('youtubeLink').href = youtubeUrl;
        document.getElementById('youtubeLink').textContent = `Search for "${query}" on YouTube`;
    }
});
