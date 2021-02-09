import {group, sleep} from 'k6';
import http from 'k6/http';

export let options = {
  // maxRedirects: 0,
  vus: 500, // 10: 40ms, 100: 73ms, 1000: 1.43s , 10000: 14s
  // RPS: 300 /
  duration: '10s'
  // stages: [
  //   { target: 500, duration: '1s' },
  //   { target: 500, duration: '5s' },
  //   { target: 0, duration: '1s' }
  // ]
};

export default () => {
  let res = http.get('http://localhost/products');
  // psql
  // let res = http.get('http://localhost:3000/products/v4o2u9mtpnhl');
  sleep(1);
  // group('http://localhost:3000/products/601ea48fd9f58277b0bf5fcd'), () => {
  //   let req, res;
  //   req = [
  //     {
  //       'method': 'get',
  //       'url': 'http://localhost:3000/products/601ea48fd9f58277b0bf5fcd'
  //     }
  //   ];
  // res = http.batch(req);
  // };
  // mongo
};