const DEV_SERVER = 'http://localhost:3000';

beforeEach(function () {
  cy.visit(`${DEV_SERVER}/components/preview/dialog`);
  /**
   * Use cypress aliases to share the context of the dialog, trigger, and close
   * elements across different assertions.
   */
  cy.get('[data-rvt-dialog="dialogExample"]').as('dialog');
  cy.get('[data-rvt-dialog-close="dialogExample"].rvt-dialog__close').as('dialogClose');
  cy.get('[data-rvt-dialog-trigger="dialogExample"]').as('dialogTrigger');
  cy.get('[data-rvt-dialog="dialogDialogExample"]').as('dialogDialog');
  cy.get('[data-rvt-dialog-close="dialogDialogExample"]').as('dialogDialogClose');
  cy.get('[data-rvt-dialog-trigger="dialogDialogExample"]').as('dialogDialogTrigger');

});

describe('Rivet basic dialog interactions', function () {
  it('Should see the dialog page', function () {
    cy.get('@dialogTrigger')
      .should('have.attr', 'data-rvt-dialog-trigger', 'dialogExample')
      .and('be.visible');

    cy.get('@dialog').should('not.be.visible');
  });

  it('Should be able to open the dialog', function () {
    cy.get('@dialog').should('not.be.visible');

    cy.get('@dialogTrigger').click();

    cy.get('@dialog').should('be.visible');
  });

  it('Should be able to close the dialog with a close button', function () {
    cy.get('@dialog').should('not.be.visible');

    cy.get('@dialogTrigger').click();

    cy.get('@dialog').should('be.visible');

    cy.get('@dialogClose').click();

    cy.get('@dialog').should('not.be.visible');
  });

  it('Should be able to close the dialog by clicking outside', function () {
    cy.get('@dialog').should('not.be.visible');

    cy.get('@dialogTrigger').click();

    cy.get('@dialog').should('be.visible');

    cy.get('body').click('topLeft');

    cy.get('@dialog').should('not.be.visible');
  });

  it('Should be able to open the dialog with the .open() method', function () {
    cy.get('@dialog').should('not.be.visible');

    cy.window().then(win => {
      var dialog = win.document.querySelector('[data-rvt-dialog="dialogExample"]');
      dialog.open();
    });

    cy.get('@dialog').should('be.visible');
  });

  it('Should be able to close the dialog with the .close() method', function () {
    cy.get('@dialog').should('not.be.visible');

    cy.get('@dialogTrigger').click();

    cy.get('@dialog').should('be.visible');

    cy.window().then(win => {
      var dialog = win.document.querySelector('[data-rvt-dialog="dialogExample"]');
      dialog.close();
    });

    cy.get('@dialog').should('not.be.visible');
  });

  it('Should be able to focus on the dialog trigger with the .focusTrigger() method', function() {
    cy.window().then(win => {
      var dialog = win.document.querySelector('[data-rvt-dialog="dialogExample"]');
      dialog.focusTrigger();
    });

    cy.get('[data-rvt-dialog-trigger="dialogExample"]').should('be.focused');
  });

  it('Should be able to focus on the dialog with the .focusDialog() method', function() {
    cy.window().then(win => {
      var dialog = win.document.querySelector('[data-rvt-dialog="dialogExample"]');
      dialog.open();
      dialog.focusDialog();
    });

    cy.get('[data-rvt-dialog="dialogExample"]').should('be.focused');
  });

  it('Should fire a rvt:dialogOpened custom event with correct element references', function() {
    cy.window().then(win => {
      var dialog = win.document.querySelector('[data-rvt-dialog="dialogExample"]');
      var eventFired = false;
      var eventDialogReference;
      
      win.addEventListener('rvt:dialogOpened', event => {
        eventFired = true;
        eventDialogReference = event.target == dialog;
      });
      
      dialog.open();
      
      if (!eventFired) throw new Error('Did not fire dialogOpened event');
      if (!eventDialogReference) throw new Error('Did not pass correct reference to emitting dialog component element');
    });
  });

  it('Should fire a rvt:dialogClosed custom event with correct element references', function() {
    cy.window().then(win => {
      var dialog = win.document.querySelector('[data-rvt-dialog="dialogExample"]');
      var eventFired = false;
      var eventDialogReference;
      
      win.addEventListener('rvt:dialogClosed', event => {
        eventFired = true;
        eventDialogReference = event.target == dialog;
      });
      
      dialog.open();
      dialog.close();
      
      if (!eventFired) throw new Error('Did not fire dialogClosed event');
      if (!eventDialogReference) throw new Error('Did not pass correct reference to emitting dialog component element');
    });
  });

});

describe('Rivet dialog dialog interactions', function () {
  it('Should not be able to close the dialog by clicking outside', function () {
    cy.get('@dialogDialog').should('not.be.visible');

    cy.get('@dialogDialogTrigger').click();

    cy.get('@dialogDialog').should('be.visible');

    cy.get('body').click(0, 0);

    cy.get('@dialogDialog').should('be.visible');
  });
});