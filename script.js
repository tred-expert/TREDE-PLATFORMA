// --- DİL VƏ KEÇİD SİSTEMİ ---
let currentLang = 'tr';
const translations = {
    'az': { 
        ex: 'Mübadilə', wa: 'Pul Kisəsi', buy: 'Al', sell: 'Satış', dep: 'YATIRIM YAP', 
        bal: 'Toplam Balansınız', login: 'GİRİŞ YAP', reg: 'KAYIT OL',
        noAcc: 'Hesabınız yoxdur?', alreadyAcc: 'Artıq üzvüsünüz?',
        userPlace: 'İstifadəçi Adı', emailPlace: 'E-poçt'
    },
    'tr': { 
        ex: 'Mübadilə', wa: 'Pul Kisəsi', buy: 'Al', sell: 'Satış', dep: 'YATIRIM YAP', 
        bal: 'Toplam Bakiyeniz', login: 'GİRİŞ YAP', reg: 'KAYIT OL',
        noAcc: 'Hesabınız yok mu?', alreadyAcc: 'Zaten üye misiniz?',
        userPlace: 'Kullanıcı Adı', emailPlace: 'E-posta'
    }
};

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.getElementById('tab-ex').innerText = t.ex;
    document.getElementById('tab-wa').innerText = t.wa;
    document.getElementById('buy-btn').innerText = t.buy;
    document.getElementById('sell-btn').innerText = t.sell;
    document.getElementById('dep-btn').innerText = t.dep;
    document.getElementById('wallet-title').innerText = t.bal;
    document.getElementById('login-btn-text').innerText = t.login;
    document.getElementById('reg-btn-text').innerText = t.reg;
    document.getElementById('no-acc-text').innerText = t.noAcc;
    document.getElementById('already-acc-text').innerText = t.alreadyAcc;
    
    // Placeholderləri dəyiş
    document.getElementById('login-user').placeholder = t.userPlace;
    document.getElementById('reg-user').placeholder = t.userPlace;
    document.getElementById('reg-email').placeholder = t.emailPlace;

    document.getElementById('langMenuAuth').classList.add('hidden');
    document.getElementById('langMenuMain').classList.add('hidden');
}

function toggleAuth() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}

// --- ELEMENTLƏR VƏ QRAFİKLƏR ---
const assets = [
    { s: 'BTC', n: 'Bitcoin', p: '71,111', c: '-2.6%', l: '#f7931a' },
    { s: 'ETH', n: 'Ethereum', p: '3,542', c: '-1.5%', l: '#627eea' },
    { s: 'SOL', n: 'Solana', p: '145', c: '+3.1%', l: '#a236d6' },
    { s: 'XRP', n: 'Ripple', p: '0.62', c: '-0.4%', l: '#23292f' },
    { s: 'PEPE', n: 'Pepe', p: '0.000008', c: '+12%', l: '#226b3e' },
    { s: 'BNB', n: 'Binance', p: '595', c: '-1.7%', l: '#f3ba2f' },
    { s: 'DOGE', n: 'Doge', p: '0.15', c: '+2.4%', l: '#c3a634' },
    { s: 'XAU', n: 'Qızıl', p: '2,345', c: '+0.4%', l: '#d4af37' },
    { s: 'XAG', n: 'Gümüş', p: '28', c: '-1.1%', l: '#c0c0c0' },
    { s: 'OIL', n: 'Neft', p: '90', c: '+1.2%', l: '#3c3c3c' }
];

function initAssets() {
    const container = document.getElementById('assets-container');
    container.innerHTML = assets.map(a => `
        <div class="asset-row p-4 flex justify-between items-center" onclick="openTrade('${a.s}')">
            <div class="flex items-center gap-3">
                <div class="asset-logo" style="background-color: ${a.l}">${a.s.substring(0,2)}</div>
                <div><p class="font-bold text-sm text-white">${a.s}/USDT</p><p class="text-gray-500 text-[10px]">${a.n}</p></div>
            </div>
            <div class="text-right"><p class="text-sm font-mono text-white">${a.p}</p><p class="${a.c.includes('+') ? 'text-green-500' : 'text-red-500'} text-[10px]">${a.c}</p></div>
        </div>
    `).join('');
}

function openTrade(symbol) {
    document.getElementById('exchange-tab').classList.add('hidden');
    document.getElementById('trade-window').classList.remove('hidden');
    document.getElementById('trade-pair-name').innerText = symbol + "/USDT";
    const container = document.getElementById('tv_container');
    container.innerHTML = ""; 
    setTimeout(() => {
        new TradingView.widget({
            "autosize": true, "symbol": (symbol === 'XAU' || symbol === 'XAG' ? "OANDA:"+symbol+"USD" : "BINANCE:"+symbol+"USDT"),
            "interval": "1", "theme": "dark", "style": "1", "locale": currentLang, "container_id": "tv_container"
        });
    }, 100);
}

function showTab(tab) {
    document.getElementById('exchange-tab').classList.add('hidden');
    document.getElementById('wallet-tab').classList.add('hidden');
    document.getElementById('trade-window').classList.add('hidden');
    document.getElementById(tab + '-tab').classList.remove('hidden');
    if(tab === 'exchange') initAssets();
}

function login() {
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    initAssets();
}

function toggleMenu(id) { document.getElementById(id).classList.toggle('hidden'); }
function requestDeposit() { alert("Yetersiz Bakiye! Lütfen USDT (TRC-20) adresine yatırım yapın."); }
