import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
    await readFile(new URL('./management-5175f-firebase-adminsdk-fbsvc-8c24eee239.json', import.meta.url))
  );

export default serviceAccount;