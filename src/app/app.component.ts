import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private quizStore: DataService) {}
  quiz = [];
  ngOnInit() {}
  start() {
    // Get the questions from the store
    this.quizStore.getQuiz().then(res => {
      this.quiz = res.questions;
    });
  }
  checkAnswer() {
    console.log('checkAnswer');
  }
  nextQuestion() {
    console.log(this.quiz);
  }
  reset() {
    console.log('reset');
  }
}
