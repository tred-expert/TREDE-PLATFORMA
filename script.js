let currentLang = 'tr';

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('hidden');
}

function changeLanguage(lang) {
    currentLang = lang;
    const t = {
        'az': { login: 'Giriş Et', register: 'Qeydiyyat', ex: 'Mübadilə', wa: 'Pul Kisəsi', dep: 'Yatırım Et', noAcc: 'Hesabınız yoxdur? Kaydol', hasAcc: 'Hesabınız var? Giriş' },
        'tr': { login: 'Giriş Yap', register: 'Kayıt Ol', ex: 'Mübadilə', wa: 'Cüzdan', dep: 'Yatırım Yap', noAcc: 'Hesabınız yok mu? Kaydol', hasAcc: 'Zaten üye misiniz? Giriş' }
    };
    
    document.getElementById('login-btn').innerText = t[lang].login;
    document.getElementById('reg-btn').innerText = t[lang].register;
    document.getElementById('tab-ex').innerText = t[lang].ex;
    document.getElementById('tab-wa').innerText = t[lang].wa;
    document.getElementById('no-acc-text').innerHTML = t[lang].noAcc;
    document.getElementById('has-acc-text').innerHTML = t[lang].hasAcc;
    
    // Menyuları bağla
    document.getElementById('langMenuAuth').classList.add('hidden');
    document.getElementById('langMenuMain').classList.add('hidden');
}

function login() {
    const isReg = !document.getElementById('registerForm').classList.contains('hidden');
    if (!isReg && document.getElementById('user-input').value === "") {
        alert(currentLang === 'az' ? "İstifadəçi adını yazın!" : "Kullanıcı adınızı girin!");
        return;
    }
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
}

function showTab(tab) {
    document.getElementById('exchange-tab').classList.add('hidden');
    document.getElementById('wallet-tab').classList.add('hidden');
    document.getElementById('trade-window').classList.add('hidden');
    document.getElementById(tab + '-tab').classList.remove('hidden');
}

function openTrade(symbol) {
    showTab('trade');
    new TradingView.widget({
        "autosize": true, "symbol": "BINANCE:" + symbol + "USDT",
        "theme": "dark", "container_id": "tradingview_btc"
    });
}

function requestDeposit() {
    alert("YETERSİZ BAKİYE!\n\nLütfen USDT (TRC-20) adresine transfer yapın:\nTS2b7...ADRESİNİZ");
}

function toggleAuth() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}
