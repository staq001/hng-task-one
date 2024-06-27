import fetch from 'node-fetch';


const requestOptions = {
  method: 'GET',
};


export const city = await fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=fd42dc6d0d234b5f8ec3f3678577adc6", requestOptions).then(url => url.json().then(res => res.city.name).catch(err => console.log(err)));
