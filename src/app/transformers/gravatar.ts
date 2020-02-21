/**
 * @file Gravatar 地址获取器
 * @author Surmon <https://github.com/surmon-china>
 */

import * as gravatar from 'gravatar';
import { GRAVATAR_API } from '@/config';

export function getGravatar(email: string): string {
  const gravatar_url = gravatar.url(email, { protocol: 'https' });
  return gravatar_url.replace('https://s.gravatar.com/avatar', GRAVATAR_API);
}

