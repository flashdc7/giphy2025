import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideMenuHeader } from './side-menu-header/side-menu-header';
import { SideMenuOptions } from './side-menu-options/side-menu-options';

@Component({
  selector: 'gif-side-menu',
  imports: [SideMenuHeader, SideMenuOptions],
  templateUrl: './gif-side-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifSideMenu { }
