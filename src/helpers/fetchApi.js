import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL =true
  ? "http://app.mediabox.bi:1480"
  : "http://192.168.43.84:8000";
/**
 * consomer une api avec les options par défaut
 * @param {string} url - le lien à appeler
 * @param {object} options - autres options comme les headers et le body
 * @returns {Promise}
 */
export default async function fetchApi(url, options = {}) {
  // const user = JSON.parse(localStorage.getItem('user'))
  const userF = await AsyncStorage.getItem("user");
  const user = JSON.parse(userF);
  // await wait(200)
  if (user)
    options = {
      ...options,
      headers: { ...options.headers, authorization: `bearer ${user.token}` },
    };
  const response = await fetch(API_URL + url, {
    ...options,
  });
  if (response.ok) {
    return response.json();
  } else {
    console.log(response);
    throw await response.json();
  }
}
