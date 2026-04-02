import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  // 1. The State: Using Angular Signals for easy UI updates
  // Represents a 3x3 board: null = empty, 'X', or 'O'
  board = signal<(string | null)[]>(Array(9).fill(null));
  currentPlayer = signal<'X' | 'O'>('X');
  winner = signal<string | null>(null);

  // 2. The Action: Logic for making a move
  makeMove(index: number) {
    // Validation: Don't move if square is taken or game is over
    if (this.board()[index] || this.winner()) return;

    // Update board
    const newBoard = [...this.board()];
    newBoard[index] = this.currentPlayer();
    this.board.set(newBoard);

    // Check for winner or switch players
    if (this.checkWinner()) {
      this.winner.set(this.currentPlayer());
    } else {
      this.currentPlayer.set(this.currentPlayer() === 'X' ? 'O' : 'X');
    }
  }

  // 3. The Rules: Checking the board state
  private checkWinner(): boolean {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return lines.some(([a, b, c]) => 
      this.board()[a] && this.board()[a] === this.board()[b] && this.board()[a] === this.board()[c]
    );
  }

  resetGame() {
    this.board.set(Array(9).fill(null));
    this.currentPlayer.set('X');
    this.winner.set(null);
  }
}

