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

export {
  realmApp,
  login
}
