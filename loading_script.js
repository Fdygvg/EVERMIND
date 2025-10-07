
// ==================== LOADING SCREEN ====================
function showLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('active');
    const homepage = document.getElementById('homepage');
    if (homepage) homepage.classList.remove('active');
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('fade-out');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.getElementById('homepage').classList.add('active');
    }, 500);
}
