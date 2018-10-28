/**
 * @file 主题色配置
 * @module app/theme/config
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';
import { SaThemeConfigProvider } from './theme.configProvider';
import { ColorHelper } from './theme.constants';

@Injectable()
export class SaThemeConfig {

  constructor(private _saConfig: SaThemeConfigProvider) {
    this._config();
  }

  private _config() {
    this._saConfig.changeTheme({ name: 'dark' });

    // let colorScheme = {
    //   primary: '#209e91',
    //   info: '#2dacd1',
    //   success: '#90b900',
    //   warning: '#dfb81c',
    //   danger: '#e85656',
    // };
    // this._saConfig.changeColors({
    //   default: '#4e4e55',
    //   defaultText: '#e2e2e2',
    //   border: '#dddddd',
    //   borderDark: '#aaaaaa',
    //
    //   primary: colorScheme.primary,
    //   info: colorScheme.info,
    //   success: colorScheme.success,
    //   warning: colorScheme.warning,
    //   danger: colorScheme.danger,
    //
    //   primaryLight: ColorHelper.tint(colorScheme.primary, 30),
    //   infoLight: ColorHelper.tint(colorScheme.info, 30),
    //   successLight: ColorHelper.tint(colorScheme.success, 30),
    //   warningLight: ColorHelper.tint(colorScheme.warning, 30),
    //   dangerLight: ColorHelper.tint(colorScheme.danger, 30),
    //
    //   primaryDark: ColorHelper.shade(colorScheme.primary, 15),
    //   infoDark: ColorHelper.shade(colorScheme.info, 15),
    //   successDark: ColorHelper.shade(colorScheme.success, 15),
    //   warningDark: ColorHelper.shade(colorScheme.warning, 15),
    //   dangerDark: ColorHelper.shade(colorScheme.danger, 15),
    //
    //   dashboard: {
    //     blueStone: '#005562',
    //     surfieGreen: '#0e8174',
    //     silverTree: '#6eba8c',
    //     gossip: '#b9f2a1',
    //     white: '#10c4b5',
    //   },
    // });
  }
}
