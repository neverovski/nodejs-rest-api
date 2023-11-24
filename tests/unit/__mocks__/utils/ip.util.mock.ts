export const IpUtilMock = [
  {
    headers: {},
    ip: null,
  },
  {
    headers: {
      'x-forwarded-for': '93.171.161.92',
    },
    ip: '93.171.161.92',
  },
  {
    headers: {
      'x-real-ip': '93.171.161.92',
      'x-forwarded-for': '93.171.161.92',
    },
    ip: '93.171.161.92',
  },
];
