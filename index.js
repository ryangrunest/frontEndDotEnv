const keys = {
  MEASUREMENT_ID: 'G-8JPJ4BEEWT',
  NEXT_PUBLIC_APP_ID:
    '1:496062853871:web:30a427c740d371018f611a',
  NEXT_PUBLIC_MESSAGING_SENDER_ID: '496062853871',
  NEXT_PUBLIC_STORAGE_BUCKET: 'myblog-3536b.appspot.com',
  NEXT_PUBLIC_PROJECT_ID: 'myblog-3536b',
  NEXT_PUBLIC_DB_URL: 'https://myblog-3536b.firebaseio.com',
  NEXT_PUBLIC_AUTH_DOMAIN: 'myblog-3536b.firebaseapp.com',
  NEXT_PUBLIC_API_KEY: 'AIzaSyCYBzQ6yAAZFpTIMUAjuei6bl0iolSmbjA',
};

const fdd = {
  init: async keys => {
    console.log(keys);

    if (!window) {
      throw new Error('must use fdd in the browser');
    }

    try {
      const arrayOfKeys = Array.from(Object.keys(keys));
      const arrayOfValues = Array.from(Object.values(keys));
      let encodedValues = [];
      let key = await fdd.getEncryptionKey();

      arrayOfValues.forEach(async (value, asdf) => {
        let eValue = fdd.encodeValue(value);
        let i = await fdd.encryptValue(key, eValue);
        let a = new Uint8Array(i);
        let v = '';
        a.forEach(index => {
          v += String.fromCharCode(index);
        });
        console.log(v);
        encodedValues.push({ [arrayOfKeys[asdf]]: v });
        console.log(encodedValues);
      });
    } catch (err) {
      console.warn(
        'error with fdd config. you are doing something wrong: \n',
        err
      );
    }
  },
  encodeValue: value => {
    let enc = new TextEncoder();
    return enc.encode(value);
  },
  getEncryptionKey: () => {
    return new Promise(async resolve => {
      let key = await crypto.subtle.generateKey(
        {
          name: 'AES-CTR',
          length: 256,
        },
        false,
        ['encrypt', 'decrypt']
      );
      resolve(key);
    });
  },
  encryptValue: (key, value) => {
    const counter = window.crypto.getRandomValues(
      new Uint8Array(16)
    );

    return new Promise(async resolve => {
      let encryptedValue = await window.crypto.subtle.encrypt(
        {
          name: 'AES-CTR',
          counter,
          length: 64,
        },
        key,
        value
      );
      // console.log(encryptedValue, key, value);
      resolve(encryptedValue);
    });
  },
};

fdd.init(keys);

// let iv = new Uint8Array(16);
// let key = new Uint8Array(16);
// let data = new Uint8Array(123897123);
// //crypto functions are wrapped in promises so we have to use await and make sure the function that
// //contains this code is an async function
// //encrypt function wants a cryptokey object
// async function main() {
//   const key_encoded = await crypto.subtle.importKey(
//     'raw',
//     key.buffer,
//     'AES-CTR',
//     false,
//     ['encrypt', 'decrypt']
//   );
//   const encrypted_content = await window.crypto.subtle.encrypt(
//     {
//       name: 'AES-CTR',
//       counter: iv,
//       length: 128,
//     },
//     key_encoded,
//     data
//   );

//   //Uint8Array
//   console.log(encrypted_content, d);
// }

// main();

/*
  Generate a sign/verify key, then set up event listeners
  on the "Sign" and "Verify" buttons.
  */
// window.crypto.subtle
//   .generateKey(
//     {
//       name: 'ECDSA',
//       namedCurve: 'P-384',
//     },
//     true,
//     ['sign', 'verify']
//   )
//   .then(keyPair => {
//     console.log(keyPair);
//     let message = getMessageEncoding('beef');
//     window.crypto.subtle
//       .sign(
//         {
//           name: 'ECDSA',
//           hash: { name: 'SHA-384' },
//         },
//         keyPair.privateKey,
//         message
//       )
//       .then(res => {
//         console.log(res);
//         let array = new Uint32Array(res);
//         let val = '';
//         array.forEach(index => {
//           val += String.fromCharCode(index);
//         });
//         console.log(val);
//       });
// signMessage(keyPair.privateKey);
// verifyMessage(keyPair.publicKey);
// });

/*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for sign operation.
  */
function getMessageEncoding(message) {
  const enc = new TextEncoder();
  return enc.encode(message);
}
