import { getGreeting } from '../support/app.po';

describe('lms', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to lms!');
  });
});
