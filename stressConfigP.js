import { sleep, check } from 'k6';
import http from 'k6/http';

export const options = {
  duration: '1m',
  vus: 100,
  ext: {
    loadimpact: {
      distribution: {
        'amazon:us:portland': { loadZone: 'amazon:us:portland', percent: 100 },
      },
    },
  },
};

export default function () {
  const wrapper = () => {
    const n = Math.floor(Math.random() * 10000000);
    const URL = `http://localhost:3001/api/images/?id=${n}`; // ???
    const response = http.get(URL);
    check(response, {
      'is status 200': (r) => r.status === 200,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
    });
  };
  const rps = 10;
  for (let i = 0; i < rps; i++) {
    wrapper();
  }
  sleep(0.1);
}
