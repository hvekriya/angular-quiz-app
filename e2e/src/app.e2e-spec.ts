import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Random Quiz App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to the Quiz App');
  });

  it('should display "start the quiz button"', () => {
    expect(page.getStartButton());
  });

  it('should start the quiz and display "Question 1"', () => {
    page.startQuiz();
    expect(page.getQuestionText()).toEqual('Question 1');
  });

  it('should display 4 options', () => {
    expect(page.getAnswerOptions()).toBe(4);
  });

  it('should display "Submit" button', () => {
    expect(page.getSubmitButton);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      })
    );
  });
});
