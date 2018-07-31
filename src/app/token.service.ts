
// 检查 token 的存在和有效性
export const checkTokenIsOk = () => {
  const token = localStorage.getItem('id_token');
  if (!!token) {
    if (Object.is(token.split('.').length, 3)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
