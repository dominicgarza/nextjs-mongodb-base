/**
 * Handle all Mongo Atlas Realm back-end logic
 */
import * as Realm from "realm-web";

const appId = process.env.ATLAS_APP_ID || '';
const realmApp = new Realm.App({ id: appId });

const login = async (email: any, password: any) => {
  const credentials = Realm.Credentials.emailPassword(
    email, password
  );

  return await realmApp.logIn(credentials);
}

const loginWithToken = async (token: any) => {

  /* interface UserParameters {
*   app: App;
*   id: string;
*   providerType: ProviderType;
*   accessToken: string;
*   refreshToken: string;
* } */

  //realmApp.logIn(credentials);

  const deez: any = {
    id: appId,
    accessToken: token
  }

  return new Realm.User(deez);
};

export {
  realmApp,
  login,
  loginWithToken
}
