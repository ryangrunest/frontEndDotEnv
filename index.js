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
  init: values => {
    console.log('encoding these values...', values);
    return new Promise(async (resolve, reject) => {
      if (!window) {
        throw new Error('must use fdd in the browser');
      }

      try {
        const { arrayOfKeys, arrayOfValues } =
          encode.splitObjectIntoTwoArrays(values);
        let encryptionKey = await encode.getEncryptionKey();
        let encodedValues = [];

        for (let x = 0; x < arrayOfValues.length; x++) {
          let eValue = encode.encodeValue(arrayOfValues[x]);
          let i = await encode.encryptValue(
            encryptionKey,
            eValue
          );
          let a = new Uint8Array(i);
          let v = '';
          a.forEach(index => {
            v += String.fromCharCode(index);
          });
          encodedValues.push({ [arrayOfKeys[x]]: v });
        }
        console.log('encoded values:\n', encodedValues);
        resolve({ encodedValues, encryptionKey });
      } catch (err) {
        console.warn(
          'error with fdd config. you are doing something wrong: \n',
          err
        );
        reject(false);
      }
    });
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
    let { encodedValues, encryptionKey } = await encode.init(
      keys
    );

    window.encodedValues = encodedValues;

    console.log(
      'encoded values:\n',
      encodedValues,
      '\nencryption key:\n',
      encryptionKey
    );

    let decodedValues = fdd.decodeValues(encodedValues);
  },
  decodeValues: values => {
    console.log('decoding values', values);
    for (let i = 0; i < values.length; i++) {
      fdd.decodeValue(values[i]);
    }
  },
  decodeValue: value => {
    console.log('decoding value:\n', value);
    return value;
  },
  getCipherTextFromUIntArray: () => {},
};

fdd.init(keys);
