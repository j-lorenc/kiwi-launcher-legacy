import RegistryService from '../../registry/registry';
import Registry from 'winreg';

class SteamRegistryService {
  installPathRegistryKeys: Winreg.Registry = new Registry({
    hive: Registry.HKLM,
    key: '\\SOFTWARE\\WOW6432Node\\Valve\\Steam',
  });

  async getInstallPath(): Promise<string> {
    const registryPath = await RegistryService.getRegistryValues(this.installPathRegistryKeys);
    const registryObj = RegistryService.parseRegistryObj(registryPath);
    return registryObj['InstallPath'];
  }
}

export default new SteamRegistryService();
