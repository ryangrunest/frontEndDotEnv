const keys = {
  beans: 'one',
  cheese: 'two',
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
      console.log(key);

      arrayOfValues.forEach(async value => {
        let eValue = fdd.encodeValue(value);
        let i = await fdd.encryptValue(key, eValue);

        encodedValues.push(i);
      });
      console.log(arrayOfKeys, arrayOfValues, encodedValues);
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
      console.log(encryptedValue, key, value);
      resolve(encryptedValue);
    });
  },
};

fdd.init(keys);

let iv = new Uint8Array(16);
let key = new Uint8Array(16);
let data = new Uint8Array(123897123);
//crypto functions are wrapped in promises so we have to use await and make sure the function that
//contains this code is an async function
//encrypt function wants a cryptokey object
async function main() {
  const key_encoded = await crypto.subtle.importKey(
    'raw',
    key.buffer,
    'AES-CTR',
    false,
    ['encrypt', 'decrypt']
  );
  const encrypted_content = await window.crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      counter: iv,
      length: 128,
    },
    key_encoded,
    data
  );

  let d = new DataView(encrypted_content).getInt16(0);

  //Uint8Array
  console.log(encrypted_content, d);
}

// main();
