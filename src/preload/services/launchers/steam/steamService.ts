import shell from 'child_process';
import path from 'path';
import steamRegistryService from './steamRegistryService';

class SteamService {
  async isInstalled(): Promise<boolean> {
    const installPath = await this.getInstallPath();
    return !!installPath;
  }

  async getInstallPath(): Promise<string> {
    return path.join(await steamRegistryService.getInstallPath(), 'Steam.exe');
  }

  async launchGame(id: string | number) {
    const steamInstallPath = await this.getInstallPath();

    shell.exec(`start steam://run/${id}`, {
      cwd: steamInstallPath.split('\\').slice(0, -1).join('\\'),
    });
  }
}

export default new SteamService();
