import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './components';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MenuBarComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
