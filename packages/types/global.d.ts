import type { RouteMeta as IRouteMeta } from '@vben-core/typings';

import 'vue-router';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends IRouteMeta {}
}

export interface VbenAdminProAppConfigRaw {
  VITE_GLOB_GATEWAY_BASE_URL: string;
  VITE_GLOB_APP_CORP_ID: string;
  VITE_GLOB_PROJECT_ID: string;
}

export interface ApplicationConfig {
  gatewayBaseUrl: string;
  corpId: string;
  projectId: string;
}

declare global {
  interface Window {
    _VBEN_ADMIN_PRO_APP_CONF_: VbenAdminProAppConfigRaw;
  }
}
