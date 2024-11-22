const prefix = '/unify_users/user/';

const withPrefix = (url: string) => prefix + url;

// 登陆
export const loginUrl = withPrefix('login');

// md5(pwd+res.n.random_key)
export const getMd5KeyUrl = withPrefix('rsa/public/key/query');
