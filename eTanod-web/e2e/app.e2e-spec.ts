import { EtanodWebPage } from './app.po';

describe('etanod-web App', () => {
  let page: EtanodWebPage;

  beforeEach(() => {
    page = new EtanodWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
