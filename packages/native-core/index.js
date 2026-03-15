import { createRequire } from 'node:module';
import { platform, arch } from 'node:process';

const require = createRequire(import.meta.url);

let nativeBinding = null;

switch (platform) {
  case 'darwin':
    switch (arch) {
      case 'x64':
        nativeBinding = require('./gemini-cli-native-core.darwin-x64.node');
        break;
      case 'arm64':
        nativeBinding = require('./gemini-cli-native-core.darwin-arm64.node');
        break;
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`);
    }
    break;
  case 'win32':
    switch (arch) {
      case 'x64':
        nativeBinding = require('./gemini-cli-native-core.win32-x64-msvc.node');
        break;
      case 'arm64':
        nativeBinding = require('./gemini-cli-native-core.win32-arm64-msvc.node');
        break;
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`);
    }
    break;
  case 'linux':
    switch (arch) {
      case 'x64':
        nativeBinding = require('./gemini-cli-native-core.linux-x64-gnu.node');
        break;
      case 'arm64':
        nativeBinding = require('./gemini-cli-native-core.linux-arm64-gnu.node');
        break;
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`);
    }
    break;
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`);
}

if (!nativeBinding) {
  throw new Error(`Failed to load native binding`);
}

export const { RopeBuffer } = nativeBinding;
export default nativeBinding;
