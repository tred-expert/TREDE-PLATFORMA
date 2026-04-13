function toggleLangMenu() {
    const menu = document.getElementById('langMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function changeLanguage(lang) {
    const translations = {
        'az': {
            subtitle: 'Gələcəyin ticarətinə xoş gəldiniz',
            login: 'Giriş Et',
            register: 'Qeydiyyat',
            gold: 'QIZIL (XAU)',
            silver: 'GÜMÜŞ (XAG)',
            panel: 'Profil Xülasəsi',
            bal: 'Cəmi Balans',
            dep: 'YATIRIM ET',
            wit: 'PUL ÇIXAR',
            footer: 'Əməliyyatlarınız Trust Wallet protokolu ilə qorunur.'
        },
        'tr': {
            subtitle: 'Geleceğin ticaretine hoş geldiniz',
            login: 'Giriş Yap',
            register: 'Kayıt Ol',
            gold: 'ALTIN (XAU)',
            silver: 'GÜMÜŞ (XAG)',
            panel: 'Profil Özeti',
            bal: 'Toplam Varlık',
            dep: 'YATIRIM YAP',
            wit: 'PARA ÇEK',
            footer: 'İşlemleriniz Trust Wallet protokolü ile uçtan uca şifrelenmektedir.'
        }
        // Digər dilləri bura əlavə edə bilərik
    };

    if (translations[lang]) {
        document.getElementById('auth-subtitle').innerText = translations[lang].subtitle;
        document.getElementById('login-btn').innerText = translations[lang].login;
        document.getElementById('reg-btn').innerText = translations[lang].register;
        document.getElementById('gold-lbl').innerText = translations[lang].gold;
        document.getElementById('silver-lbl').innerText = translations[lang].silver;
        document.getElementById('panel-title').innerText = translations[lang].panel;
        document.getElementById('bal-lbl').innerText = translations[lang].bal;
        document.getElementById('dep-btn').innerText = translations[lang].dep;
        document.getElementById('wit-btn').innerText = translations[lang].wit;
        document.getElementById('footer-note').innerText = translations[lang].footer;
    }
    toggleLangMenu();
}

function login() {
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    new TradingView.widget({
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "D",
        "theme": "dark",
        "style": "1",
        "locale": "tr",
        "container_id": "tradingview_btc"
    });
    
    startBalance();
}

function toggleAuth() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}

let balance = 0.00;
function startBalance() {
    setInterval(() => {
        balance += Math.random() * 0.08;
        document.getElementById('user-balance').innerText = balance.toFixed(2);
    }, 3000);
}

function deposit() {
    alert("Minimum yatırım: 50 USDT. Lütfen cüzdanınızı bağlayın.");
}
