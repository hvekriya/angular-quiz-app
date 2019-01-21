import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {}

  /**
   * Mocks retrieving a Quiz from the server.
   *
   * Latency can be high (up to 3000ms).
   */
  getQuiz = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._generateQuiz());
      }, this._randomInt(3000));
    });
  };

  /**
   * Mocks sending a response to the server.
   *
   * Latency can be very high (up to 8000ms).
   * Failure is also likely (10% of calls fail).
   */
  answerQuestion = (questionId, answerIndex) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._randomInt(10) < 10) {
          resolve();
        } else {
          reject();
        }
      }, this._randomInt(8000));
    });
  };

  _generateQuiz = () => {
    const quiz = {
      id: this._generateString(this.ALPHANUMERIC, 8),
      questions: []
    };
    for (let i = 8; i > 0; i--) {
      quiz.questions.push(this._generateQuestion());
    }
    return quiz;
  };

  _generateQuestion = () => {
    const answers = [];
    for (let index = 3; index >= 0; index--) {
      let length = this._randomInt(20);
      answers.push({
        index,
        text: this._generatePseudoSentence(20)
      });
    }
    return {
      id: this._generateString(this.ALPHANUMERIC, 9),
      answers
    };
  };

  ALPHANUMERIC = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split(
    ''
  );

  _generateString = (chars, length) => {
    let id = '';
    for (let i = length; i > 0; i--) {
      id += chars[this._randomInt(chars.length) - 1];
    }
    return id;
  };

  _generatePseudoSentence = num => {
    const LETTERS = 'abcdefghiklmnopqrstuvwxyz'.split('');
    const words = [];
    for (let i = num; i > 0; i--) {
      let length = this._randomInt(9);
      words.push(this._generateString(LETTERS, length));
    }
    return words.join(' ');
  };

  _randomInt = max => {
    return Math.ceil(Math.random() * max);
  };
}
