import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifSideMenu } from "../../components/gif-side-menu/gif-side-menu";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, GifSideMenu],
  templateUrl: './dashboard-page.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Dashboard { }
