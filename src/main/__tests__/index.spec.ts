import { Application } from 'spectron';
import * as path from 'path';

let electronPath = path.join(__dirname, '..', '..', '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
  electronPath += '.cmd';
}

const appPath = path.join(__dirname, '..', '..', '..');

const app = new Application({
  path: electronPath,
  args: [appPath],
});

describe('', () => {
  beforeAll(() => {
    jest.setTimeout(30000);
  });

  beforeEach(() => {
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it('should open one window', async () => {
    const windowCount = await app.client.getWindowCount();
    expect(windowCount).toEqual(1);
  });
});
