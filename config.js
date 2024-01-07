const publicKey = 'afb9787b2a32e592331e2ba1de319880';
const hash = 'dfd439406c3e4955b8d47e3f1b615df0';
const ts ='1';
 // Get the current timestamp

// Create the hash using MD5 algorithm
//const hash1 = CryptoJS.MD5(ts+atob(hashcode)+publicKey).toString();

//const hash = CryptoJS.MD5('1'+(privateKey)+publicKey).toString();

               
//console.log('Timestamp (ts):', ts);
console.log('Generated Hash:', hash);

const baseCharactersUrl = 'https://gateway.marvel.com:443/v1/public/';
const baseComicsUrl = 'https://gateway.marvel.com:443/v1/public/comics?';
