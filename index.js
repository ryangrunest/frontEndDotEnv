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

const encode = {
  encodeValue: value => {
    let enc = new TextEncoder();
    return enc.encode(value);
  },
  encryptValue: (key, value) => {
    return new Promise(resolve => {
      const counter = window.crypto.getRandomValues(
        new Uint8Array(16)
      );

      window.crypto.subtle
        .encrypt(
          {
            name: 'AES-CTR',
            counter,
            length: 64,
          },
          key,
          value
        )
        .then(buffer => {
          resolve(buffer);
        });
    });
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
  init: async values => {
    console.log('encoding these values...', values);

    if (!window) {
      throw new Error('must use fdd in the browser');
    }

    try {
      const { arrayOfKeys, arrayOfValues } =
        encode.splitObjectIntoTwoArrays(values);
      let key = await encode.getEncryptionKey();

      let encodedValues = [];

      for (let x = 0; x < arrayOfValues.length; x++) {
        let eValue = encode.encodeValue(arrayOfValues[x]);
        let i = await encode.encryptValue(key, eValue);
        let a = new Uint8Array(i);
        let v = '';
        a.forEach(index => {
          v += String.fromCharCode(index);
        });
        encodedValues.push({ [arrayOfKeys[x]]: v });
      }
      console.log('encoded values:\n', encodedValues);
      return encodedValues;
    } catch (err) {
      console.warn(
        'error with fdd config. you are doing something wrong: \n',
        err
      );
    }
  },
  splitObjectIntoTwoArrays: obj => {
    if ((typeof obj === 'object') & (obj !== null)) {
      return {
        arrayOfKeys: Array.from(Object.keys(obj)),
        arrayOfValues: Array.from(Object.values(obj)),
      };
    } else {
      throw new Error('error encoding environment variables');
    }
  },
};

const fdd = {
  init: async keys => {
    let encodedValues = encode.init(keys);
  },
  decodeValues: values => {},
};

fdd.init(keys);

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
