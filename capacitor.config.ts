import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.filmlab.camera',
  appName: 'FilmLab Camera',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
    permissions: [
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.READ_EXTERNAL_STORAGE'
    ]
  }
};

export default config;