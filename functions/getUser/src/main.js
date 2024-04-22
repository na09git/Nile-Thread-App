import { Client, Users } from 'node-appwrite';


// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?

  const client = new sdk.Client();

  const users = new sdk.Users(client);

  // The `req` object contains the request data
  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. function ");
  } else {
    console.log('APPWRITE_FUNCTION_ENDPOINT:', req.variables['APPWRITE_FUNCTION_ENDPOINT']);
    console.log('APPWRITE_FUNCTION_PROJECT_ID:', req.variables['APPWRITE_FUNCTION_PROJECT_ID']);
    console.log('APPWRITE_FUNCTION_API_KEY:', req.variables['APPWRITE_FUNCTION_API_KEY']);

    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);

  }

  // try {
  //   // Authenticate with your email and password
  //   await client.account.createSession('niletech1513@gmail.com', '12345678');

  const payload = JSON.parse(req.payload);
  console.log('payload:', payload);
  const response = await users.get(payload['owner_id']);

  const userData = {
    '$id': response.$id,
    'name': response.name
  };

  return res.json(userData);
  // } catch (error) {
  //   console.error('Authentication error:', error);
  //   return res.status(401).json({ error: 'Authentication error' });
  // }

};
