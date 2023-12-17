const publicKey = 'afb9787b2a32e592331e2ba1de319880';
const privateKey = '66bacb880242f4f8ac1d176cfb10c55161abdbb6';

const ts = new Date().getTime(); // Get the current timestamp

// Create the hash using MD5 algorithm
const hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();

               
console.log('Timestamp (ts):', ts);
console.log('Generated Hash:', hash);

const baseCharactersUrl = 'https://gateway.marvel.com:443/v1/public/';
const baseComicsUrl = 'https://gateway.marvel.com:443/v1/public/comics?';
