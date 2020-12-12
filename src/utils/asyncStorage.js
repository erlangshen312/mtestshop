import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (name) => {
  try {
    const data = await AsyncStorage.getItem(name);
    // if (data === null) data = [];
    const d = JSON.parse(data);
    if (d !== 'null') {
      return d;
    }
  } catch (e) {
    console.log('get data : ' + e);
    return null;
  }
};

export const setData = async (name, data) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(data))
      .then(() => {
        console.log('‘It was saved successfully set to asyncStorage’');
      })
      .catch(() => {
        console.log('‘There was an error saving the data');
      });
  } catch (e) {
    console.log('set data : ' + e);
    return null;
  }
};

export const removeData = async (name) => {
  try {
    const object = await AsyncStorage.removeItem(name);
    const obj = JSON.parse(object);
    if (obj !== 'null') {
      return obj;
    }
  } catch (e) {
    console.log('remove data : ' + e);
    return null;
  }
};
