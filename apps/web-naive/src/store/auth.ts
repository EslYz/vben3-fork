import type { LoginAndRegisterParams } from '@vben/common-ui';
import type { UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import apiConstants from '@vben/api';
import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { useAppConfig, useCoprId } from '@vben/hooks';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { md5 } from 'js-md5';
import { defineStore } from 'pinia';

import { notification } from '#/adapter';
import { getUserInfoApi, logoutApi } from '#/api';
import { requestClient } from '#/api/request';
import { $t } from '#/locales';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: LoginAndRegisterParams,
    onSuccess?: () => Promise<void> | void,
  ) {
    const codeEnv = import.meta.env;
    const isProd = codeEnv.PROD;

    const corpId = useCoprId(codeEnv, isProd);
    const appConfig = useAppConfig(codeEnv, isProd);

    const { projectId } = appConfig;

    // 异步处理用户登录操作并获取 sessionId
    let userInfo: null | UserInfo = null;
    try {
      loginLoading.value = true;

      const md5Res = await requestClient.post(apiConstants.getMd5KeyUrl, {
        n: {
          user_code: params.username,
          out_organ_id: corpId,
          project_id: projectId,
        },
        a: {
          source: '3',
        },
      });

      const loginRes = await requestClient.post(apiConstants.loginUrl, {
        n: {
          user_code: params.username,
          user_pwd: md5(params.password + md5Res.n.random_key),
          out_organ_id: corpId,
          corp_id: corpId,
          project_id: projectId,
        },
        a: {
          source: '3',
        },
      });

      // 如果成功获取到 accessToken
      if (loginRes.n) {
        // 将 accessToken 存储到 accessStore 中
        accessStore.setSessionId(loginRes.n.session_id);

        // 获取用户信息并存储到 accessStore 中
        // const [fetchUserInfoResult, accessCodes] = await Promise.all([
        //   fetchUserInfo(),
        //   getAccessCodesApi(),
        // ]);

        userInfo = loginRes.n;

        userStore.setUserInfo(loginRes.n);
        // accessStore.setAccessCodes(accessCodes);

        onSuccess
          ? await onSuccess?.()
          : await router.push(userInfo?.homePath || DEFAULT_HOME_PATH);

        if (userInfo?.user_name) {
          notification.success({
            content: $t('authentication.loginSuccess'),
            description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.user_name}`,
            duration: 3000,
          });
        }
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登陆页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    let userInfo: null | UserInfo = null;
    userInfo = await getUserInfoApi();
    userStore.setUserInfo(userInfo);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
