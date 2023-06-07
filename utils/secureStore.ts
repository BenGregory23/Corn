import * as SecureStore from 'expo-secure-store';

async function save(key:string, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key:string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    }else {
        return null;
    }
}

async function deleteValueFor(key:string) {
    await SecureStore.deleteItemAsync(key);
}

export { save, getValueFor, deleteValueFor };