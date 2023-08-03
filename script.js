// script.js
async function updateCryptoPrices() {
    const cryptoPrices = await getCryptoPrices();
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';

    cryptoPrices.forEach((crypto, index) => {
        const row = tableBody.insertRow();
        const rankCell = row.insertCell();
        const nameCell = row.insertCell();
        const priceCell = row.insertCell();
        const webCell = row.insertCell();

        rankCell.innerText = index + 1;
        nameCell.innerText = crypto.name;
        priceCell.innerText = `$${crypto.price}`;
        webCell.innerHTML = `<a href="${crypto.web}" class="link" target="_blank">Xem thêm</a>`;
    });
}

async function getCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
        const data = await response.json();
        const cryptoPrices = data.map(coin => ({
            name: coin.name,
            price: coin.current_price,
            web: coin.links.homepage[0]
        }));
        return cryptoPrices;
    } catch (error) {
        console.error('Lỗi khi lấy giá Crypto:', error);
        return [];
    }
}

updateCryptoPrices();
setInterval(updateCryptoPrices, 30000); // Cập nhật giá mỗi 30 giây
