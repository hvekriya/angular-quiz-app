import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Question {
  id: string;
  answers: Answer[];
}

interface Quiz {
  id: string;
  questions: Question[];
}

interface Answer {
  index: string;
  text: string;
}

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
  public getQuiz(): Observable<Quiz> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.generateQuiz());
      }, this.randomInt(3000));
    });
  }

  /**
   * Mocks sending a response to the server.
   *
   * Latency can be very high (up to 8000ms).
   * Failure is also likely (10% of calls fail).
   */
  answerQuestion = (questionId: string, answerIndex) => {
    return new Observable(observer => {
      console.log(answerIndex);
      if (answerIndex == 0) {
        observer.next('Correct question');
      } else {
        observer.error('Wrong question');
      }
    });
  };

  private generateQuiz(): Quiz {
    const quiz: Quiz = {
      id: this.generateString(this.ALPHANUMERIC, 8),
      questions: new Array<Question>()
    };
    for (let i = 8; i > 0; i--) {
      quiz.questions.push(this.generateQuestion());
    }
    return quiz;
  }

  private generateQuestion(): Question {
    const answers = new Array<Answer>();
    for (let index = 3; index >= 0; index--) {
      let length = this.randomInt(20);
      answers.push({
        index: '' + index,
        text: this.generatePseudoSentence(20)
      });
    }
    return {
      id: this.generateString(this.ALPHANUMERIC, 9),
      answers
    };
  }

  private ALPHANUMERIC = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split(
    ''
  );

  private generateString(chars, length): string {
    let id = '';
    for (let i = length; i > 0; i--) {
      id += chars[this.randomInt(chars.length) - 1];
    }
    return id;
  }

  generatePseudoSentence = num => {
    const LETTERS = 'abcdefghiklmnopqrstuvwxyz'.split('');
    const words = new Array<string>();
    for (let i = num; i > 0; i--) {
      let length = this.randomInt(9);
      words.push(this.generateString(LETTERS, length));
    }
    return words.join(' ');
  };

  private randomInt(max: number): number {
    return Math.ceil(Math.random() * max);
  }
}
