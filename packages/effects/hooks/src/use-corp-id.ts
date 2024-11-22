import { useAppConfig } from './use-app-config';

export function useCoprId(
  env: Record<string, any>,
  isProduction: boolean,
): string {
  // 本地化配置的corpId优先级最高
  const config = useAppConfig(env, isProduction);
  if (config.corpId) {
    return config.corpId;
  }
  // 如果本地化没有或者不是本地化的
  // url参数中获取
  const param = new URLSearchParams(location.search);
  let corpId = param.get('corpId');
  if (corpId) {
    return corpId;
  }
  // URL 参数中没有，从sessionStorage中获取
  corpId = sessionStorage.getItem('corpId');
  if (corpId) return corpId;

  if (!corpId) {
    throw new Error('corpId is not found');
  }
  return corpId;
}
