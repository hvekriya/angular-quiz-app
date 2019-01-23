import { browser, by, element, $$ } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('.intro h1')).getText();
  }

  getStartButton() {
    return element(by.id('startQuiz')).isPresent();
  }

  startQuiz() {
    return element(by.id('startQuiz')).click();
  }

  getQuestionText() {
    return element(by.id('question')).getText();
  }

  getAnswerOptions() {
    // Trying the $$ shortcut
    return $$('#options div').count();
  }

  getSubmitButton() {
    return element(by.buttonText('Submit')).isPresent();
  }
}
