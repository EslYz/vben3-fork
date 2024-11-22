interface BasicOption {
  label: string;
  value: string;
}

type SelectOption = BasicOption;

type TabOption = BasicOption;

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
  role_id: string;
  role_type: string;
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

export type { BasicOption, BasicUserInfo, SelectOption, TabOption };
