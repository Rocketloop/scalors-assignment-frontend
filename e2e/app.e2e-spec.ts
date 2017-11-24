import { ChipsAutocompletePage } from './app.po';

describe('chips-autocomplete App', () => {
  let page: ChipsAutocompletePage;

  beforeEach(() => {
    page = new ChipsAutocompletePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
