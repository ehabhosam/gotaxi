import * as SecureStore from 'expo-secure-store';

export async function secureSave(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getSecurelySaved(key) {
    let result = await SecureStore.getItemAsync(key);
    return result? result : null; 
}

export async function deleteSecurelySaved(key, options = {}) {
    await SecureStore.deleteItemAsync(key, options);
}