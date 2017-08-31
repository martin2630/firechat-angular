import { FirebaseappPage } from './app.po';

describe('firebaseapp App', () => {
  let page: FirebaseappPage;

  beforeEach(() => {
    page = new FirebaseappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
