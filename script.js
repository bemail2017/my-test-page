async function updateCryptoPrices() {
    const cryptoData = await getCryptoPrices();
    const currentTime = new Date().toLocaleTimeString();
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous data

    let rank = 1;
    for (const crypto of cryptoData) {
        const row = `
            <tr>
                <td>${rank}</td>
                <td>${crypto.name}</td>
                <td>$${crypto.price}</td>
                <td><a href="${crypto.web}" target="_blank">Xem thêm</a></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
        rank++;
    }

    const timeCell = document.getElementById('time');
    timeCell.innerText = currentTime;
}

async function getCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
        const data = await response.json();
        const cryptoData = data.map(crypto => {
            return {
                name: crypto.name,
                price: crypto.current_price,
                web: crypto.links.homepage[0]
            };
        });
        return cryptoData;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        return [];
    }
}

setInterval(updateCryptoPrices, 30000);
