import { Component, inject } from '@angular/core';
import { GameLogicService } from './services/game-logic';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Inject the "brain" of our game
  game = inject(GameLogicService);
}
