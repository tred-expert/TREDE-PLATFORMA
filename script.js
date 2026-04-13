// --- TRADE PRO REAL LOGIC ---
let balance = 0.00;

// 1. QLOBUS VƏ DİL FUNKSİYALARI (Avtomatik Dil Dəyişmə)
let currentLang = 'tr';
function toggleMenu(id) { document.getElementById(id).classList.toggle('hidden'); }

function changeLanguage(lang) {
    currentLang = lang;
    const t = {
        'az': { login: 'Giriş Et', register: 'Qeydiyyat', ex: 'Mübadilə', wa: 'Pul Kisəsi', dep: 'YATIRIM YAP', wit: 'PUL ÇIXAR', wallet: 'Cüzdanı Bağla', balance: 'Bakiyeniz' },
        'tr': { login: 'Giriş Yap', register: 'Kayıt Ol', ex: 'Mübadilə', wa: 'Cüzdan', dep: 'YATIRIM YAP', wit: 'PARA ÇEK', wallet: 'Cüzdanı Bağla', balance: 'Bakiyeniz' }
    };
    if (t[lang]) {
        document.getElementById('login-btn').innerText = t[lang].login;
        document.getElementById('reg-btn').innerText = t[lang].register;
        document.getElementById('tab-ex').innerText = t[lang].ex;
        document.getElementById('tab-wa').innerText = t[lang].wa;
        document.getElementById('dep-btn').innerText = t[lang].dep;
        document.getElementById('wit-btn').innerText = t[lang].wit;
        document.getElementById('wallet-btn').innerText = t[lang].wallet;
        document.getElementById('user-balance-text').innerText = t[lang].balance + ':';
    }
    document.getElementById('langMenuAuth').classList.add('hidden');
    document.getElementById('langMenuMain').classList.add('hidden');
}

// 2. GİRİŞ (Xətasız giriş sistemi)
function login() {
    const registerForm = document.getElementById('registerForm');
    const isReg = !registerForm.classList.contains('hidden');
    if (!isReg && document.getElementById('user-input').value === "") {
        alert(currentLang === 'az' ? "İstifadəçi adını yazın!" : "Kullanıcı adınızı girin!");
        return;
    }
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    initAssets(); // Elementləri yüklə
}

// 3. 10 ELEMENTLİ SİYAHI (HƏR BİRİNİN LOGOSU İLƏ)
const assets = [
    { s: 'BTC', n: 'Bitcoin', p: '71,111.55', c: '-2.62%', l: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg' },
    { s: 'ETH', n: 'Ethereum', p: '3,542.12', c: '-1.51%', l: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg' },
    { s: 'SOL', n: 'Solana', p: '145.22', c: '+3.12%', l: 'https://cryptologos.cc/logos/solana-sol-logo.svg' },
    { s: 'XRP', n: 'Ripple', p: '0.62', c: '-0.45%', l: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg' },
    { s: 'PEPE', n: 'Pepe Coin', p: '0.000008', c: '+12.5%', l: 'https://cryptologos.cc/logos/pepe-pepe-logo.svg' },
    { s: 'BNB', n: 'Binance Coin', p: '595.30', c: '-1.79%', l: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg' },
    { s: 'DOGE', n: 'Dogecoin', p: '0.15', c: '+2.40%', l: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg' },
    { s: 'XAUUSD', n: 'Qızıl (Gold)', p: '2,345.10', c: '+0.45%', l: 'https://img.icons8.com/emoji/96/gold-bars-emoji.png' },
    { s: 'XAGUSD', n: 'Gümüş (Silver)', p: '28.32', c: '-1.12%', l: 'https://img.icons8.com/emoji/96/diamond-emoji.png' },
    { s: 'UKOIL', n: 'Brent Neft', p: '90.15', c: '+1.20%', l: 'https://img.icons8.com/emoji/96/fuel-pump.png' }
];

function initAssets() {
    const container = document.getElementById('assets-container');
    if(!container) return;
    container.innerHTML = assets.map(a => `
        <div class="asset-row p-4 flex justify-between items-center" onclick="openTrade('${a.s}')">
            <div class="flex items-center gap-3">
                <img src="${a.l}" alt="${a.s}" class="w-10 h-10 rounded-full bg-[#1e2329] border border-gray-700 p-1">
                <div>
                    <p class="font-bold text-sm text-white">${a.s}/USDT</p>
                    <p class="text-gray-500 text-[10px]">${a.n}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm font-mono text-white">${a.p}</p>
                <p class="${a.c.includes('+') ? 'text-green-500' : 'text-red-500'} text-[10px] font-bold">${a.c}</p>
            </div>
        </div>
    `).join('');
}

// 4. TABLAR ARASI KEÇİD
function showTab(tab) {
    document.getElementById('exchange-tab').classList.add('hidden');
    document.getElementById('wallet-tab').classList.add('hidden');
    document.getElementById('trade-window').classList.add('hidden');
    
    document.getElementById(tab + '-tab').classList.remove('hidden');
    
    // Tab düymələrinin rəngini dəyiş
    const tabExBtn = document.getElementById('tab-ex');
    const tabWaBtn = document.getElementById('tab-wa');
    if(tabExBtn && tabWaBtn) {
        tabExBtn.classList.replace('text-white', 'text-gray-400');
        tabExBtn.classList.remove('border-b-2', 'border-yellow-500');
        tabWaBtn.classList.replace('text-white', 'text-gray-400');
        tabWaBtn.classList.remove('border-b-2', 'border-yellow-500');
        const activeBtn = tab === 'exchange' ? tabExBtn : tabWaBtn;
        activeBtn.classList.replace('text-gray-400', 'text-white');
        activeBtn.classList.add('border-b-2', 'border-yellow-500');
    }
    if(tab === 'exchange') initAssets();
}

// 5. TRADE PENCERESİNİ AÇIR (GÜNCƏL KUR VƏ QRAFİK)
function openTrade(symbol) {
    showTab('trade');
    
    // Qrafik yerini təmizlə - Qaranlıq səhifə olmasın deyə!
    const container = document.getElementById('tv_container');
    container.innerHTML = ""; 

    // TradingView Widget (Canlı Data)
    setTimeout(() => {
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol.includes('USD') ? "OANDA:" + symbol : (symbol === 'UKOIL' ? "TVC:UKOIL" : "BINANCE:" + symbol + "USDT"),
            "interval": "1",
            "theme": "dark",
            "style": "1",
            "locale": "tr",
            "container_id": "tv_container",
            "hide_top_toolbar": false,
            "allow_symbol_change": true,
            "save_image": false
        });
    }, 100);
}

// 6. YATIRIM TƏLƏBİ (TRUST WALLET ÜNVANI)
function requestDeposit() {
    const myAddress = "TS2b7...SENIN_TRC20_ADRESİN"; // <--- BURA ÖZ ADRESİNİ YAZ!
    alert("YETERSİZ BAKİYE!\n\nTicarete devam etmek için lütfen USDT (TRC-20) adresine yatırım yapın:\n\n" + myAddress);
}

function connectWallet() {
    alert(" Trust Wallet başarıyla bağlandı!");
}
