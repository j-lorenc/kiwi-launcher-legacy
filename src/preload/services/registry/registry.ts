import * as Registry from 'winreg';

class RegistryService {
  static getRegistryKeys(registryKey: Winreg.Registry): Promise<Winreg.Registry[]> {
    return new Promise((resolve, reject) => {
      registryKey.keys((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }

  static getRegistryValues(registryValues: Winreg.Registry): Promise<Registry.RegistryItem[]> {
    return new Promise((resolve, reject) => {
      registryValues.values((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }

  static parseRegistryObj(obj: Registry.RegistryItem[]): RegistryMap {
    return obj.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {} as RegistryMap);
  }
}

interface RegistryMap {
  [key: string]: string;
}

export default RegistryService;
