export default encode = {
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
        .then(cipherText => {
          console.log('encrypted value', value);
          resolve({ cipherText, counter });
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
          this.splitObjectIntoTwoArrays(values);
        let encryptionKey = await this.encode.getEncryptionKey();
        let encodedValues = [];

        for (let x = 0; x < arrayOfValues.length; x++) {
          let eValue = this.encode.encodeValue(arrayOfValues[x]);
          let { cipherText, counter } =
            await encode.encryptValue(encryptionKey, eValue);
          let a = new Uint8Array(cipherText);
          let v = '';
          a.forEach(index => {
            v += String.fromCharCode(index);
          });
          encodedValues.push({
            [arrayOfKeys[x]]: {
              cipherText,
              counter,
              buffer: v,
            },
          });
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
