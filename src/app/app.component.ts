import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  quiz = [];
  questionNo = 0;
  question = [];
  inProgress = true;
  quizOver = false;
  answerMode = false;
  correctAns = false;

  constructor(
    private quizStore: DataService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {}
  start() {
    this.spinner.show();
    // Get the questions from the store
    this.quizStore.getQuiz().subscribe(res => {
      this.quiz = res.questions;
      this.question = this.quiz[this.questionNo].answers;
      this.inProgress = false;
      this.spinner.hide();
      console.log(this.quiz);
      console.log(this.question);
    });
  }
  checkAnswer() {
    this.answerMode = true;
    // this.spinner.show();
    const id = this.quiz[this.questionNo].id;
    const index = (<HTMLInputElement>(
      document.querySelector('input[name="answer"]:checked')
    )).value;
    this.quizStore.answerQuestion(id, index).subscribe(res => {
      console.log(res);
      this.spinner.hide();
    });
    if (!this.correctAns) {
      this.nextQuestion();
    }
  }
  nextQuestion() {
    if (!this.quizOver && this.questionNo < 7) {
      this.answerMode = false;
      this.questionNo++;
      this.question = this.quiz[this.questionNo].answers;
      if (this.questionNo > 6) {
        this.quizOver = true;
      }
    }
  }
  reset() {
    this.quiz = [];
    this.questionNo = 0;
    this.question = [];
    this.inProgress = true;
    this.quizOver = false;
  }
  ngOnDestroy() {}
}
