function toggleLangMenu() {
    const menu = document.getElementById('langMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function changeLanguage(lang) {
    const translations = {
        'az': {
            login: 'Giriş Et',
            register: 'Qeydiyyat',
            noAcc: 'Hesabınız yoxdur? Qeydiyyat',
            hasAcc: 'Artıq hesabınız var? Giriş',
            wallet: 'Cüzdanı Bağla'
        },
        'tr': {
            login: 'Giriş Yap',
            register: 'Kayıt Ol',
            noAcc: 'Hesabınız yok mu? Hemen Kaydol',
            hasAcc: 'Zaten üye misiniz? Giriş Yap',
            wallet: 'Cüzdanı Bağla'
        }
    };

    if (translations[lang]) {
        document.getElementById('login-btn').innerText = translations[lang].login;
        document.getElementById('reg-btn').innerText = translations[lang].register;
        document.getElementById('no-acc-text').innerHTML = translations[lang].noAcc;
        document.getElementById('has-acc-text').innerHTML = translations[lang].hasAcc;
        document.getElementById('wallet-btn').innerText = translations[lang].wallet;
    }
    toggleLangMenu();
}

function login() {
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    new TradingView.widget({
        "autosize": true, "symbol": "BINANCE:BTCUSDT", "interval": "D", "theme": "dark", "style": "1", "locale": "tr", "container_id": "tradingview_btc"
    });
}

function toggleAuth() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}
