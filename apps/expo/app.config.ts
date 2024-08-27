import { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    eas: {
      projectId: 'f6dd8390-8d42-4355-83d2-9e293ceeeacc',
    },
  },
  owner: process.env.EXPO_PUBLIC_EAS_OWNER,
  plugins: ['expo-router'],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  platforms: ['ios', 'android'],
  name: 'T4 App',
  slug: 't4-app',
  updates: {
    url: 'https://u.expo.dev/85fc6ccd-0ce1-4e4d-804c-b15df989f97e',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
})
