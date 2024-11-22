import { objectPick } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';

interface BasicUserInfo {
  /**
   * 头像
   */
  avatar: string;
  job_number: string;
  /**
   * 用户昵称
   */
  realName: string;
  /**
   * 用户角色
   */
  roles?: string[];
  session_id: string;
  user_avatar: string;
  user_code: string;
  user_id: string;
  user_name: string;
  /**
   * 用户id
   */
  userId: string;
  /**
   * 用户名
   */
  username: string;
}

interface AccessState {
  /**
   * 用户信息
   */
  userInfo: BasicUserInfo | null;
  /**
   * 用户角色
   */
  userRoles: string[];
}

/**
 * @zh_CN 用户信息相关
 */
export const useUserStore = defineStore('core-user', {
  actions: {
    setUserInfo(userInfo: BasicUserInfo | null) {
      // 设置用户信息
      this.userInfo = userInfo;
      if (userInfo !== null) {
        objectPick(userInfo, [
          'user_id',
          'user_name',
          'user_code',
          'session_id',
          'job_number',
          'user_avatar',
          'role_id',
          'role_type',
        ]).forEach((value: string, key: string) => {
          sessionStorage.setItem(key, value);
        });
      }

      // 设置角色信息
      const roles = userInfo?.roles ?? [];
      this.setUserRoles(roles);
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles;
    },
  },
  state: (): AccessState => ({
    userInfo: null,
    userRoles: [],
  }),
});

// 解决热更新问题
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
