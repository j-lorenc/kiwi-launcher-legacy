import { v4 as uuid } from 'uuid';
import keytar from 'keytar';

const SERVICE_KEY = 'KIWI_LAUNCHER';

export const generateKey = (): string => {
  return uuid();
};

const retrieveEncryptionKey = async (): Promise<string> => {
  return (await keytar.getPassword(SERVICE_KEY, 'encryption')) || '';
};

export const generateEncryptionKey = async (): Promise<string> => {
  let key = await retrieveEncryptionKey();

  if (!key) {
    await keytar.setPassword(SERVICE_KEY, 'encryption', generateKey());
    key = await retrieveEncryptionKey();
  }

  return key;
};
