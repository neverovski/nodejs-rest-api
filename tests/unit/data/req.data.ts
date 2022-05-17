export default [
  {
    headers: {
      host: 'localhost:5656',
      connection: 'keep-alive',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
      dnt: '1',
      'sec-ch-ua-mobile': '?0',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
      'sec-ch-ua-platform': '"macOS"',
      accept:
        'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'no-cors',
      'sec-fetch-dest': 'image',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    },
    ip: '127.0.0.1',
  },
  {
    headers: {
      'user-agent': 'vscode-restclient',
      'content-type': 'application/json',
      'accept-encoding': 'gzip, deflate',
      host: '127.0.0.1:5656',
      connection: 'close',
    },
    ip: '127.0.0.1',
  },
  {
    headers: {
      host: 'api.test.com',
      'x-real-ip': '93.171.161.92',
      'x-forwarded-for': '93.171.161.92',
      connection: 'close',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
      accept: 'application/json, text/plain, */*',
      dnt: '1',
      'sec-ch-ua-mobile': '?0',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
      'sec-ch-ua-platform': '"macOS"',
      origin: 'https://test.com',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      referer: 'https://test.com/',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    },
    ip: '93.171.161.92',
  },
];
