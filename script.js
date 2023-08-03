// script.js
async function updateCryptoPrices() {
    const cryptoPrices = await getCryptoPrices();
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';

    cryptoPrices.forEach(crypto => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell();
        const priceCell = row.insertCell();
        const infoCell = row.insertCell();
        nameCell.innerText = crypto.name;
        priceCell.innerText = `$${crypto.price}`;
        infoCell.innerHTML = `<a href="${crypto.infoUrl}" class="link" target="_blank">Xem thêm</a>`;
    });
}

async function getCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,polkadot,binancecoin,litecoin,chainlink,stellar,bitcoin-cash&vs_currencies=usd');
        const data = await response.json();
        const cryptoPrices = Object.keys(data).map(name => ({
            name,
            price: data[name].usd,
            infoUrl: `https://www.coingecko.com/en/coins/${name}`
        }));
        return cryptoPrices;
    } catch (error) {
        console.error('Lỗi khi lấy giá Crypto:', error);
        return [];
    }
}

updateCryptoPrices();
setInterval(updateCryptoPrices, 30000); // Cập nhật giá mỗi 30 giây
