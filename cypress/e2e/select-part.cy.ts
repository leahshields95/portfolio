
describe("select part tests", () => {

  beforeEach(() => {
    cy.visitAndCheck("/");
  });


  it("should allow you to choose a part", () => {
    cy.get('select').eq(0).select('Parts');
    cy.get('select').eq(1).select('Pedals');
    cy.get('select').eq(2).select('Addict Aluminium Pedals');
  });

  it("subcategory should not be clickable when category not selected", () => {
    cy.get('select').eq(1).should('be.disabled');

    cy.get('select').eq(0).select('Parts');
    cy.get('select').eq(1).should('not.be.disabled');
  });

  it("part name should not be clickable when subcategory not selected", () => {
    cy.get('select').eq(0).select('Parts');
    cy.get('select').eq(2).should('be.disabled');

    cy.get('select').eq(1).select('Tyres');
    cy.get('select').eq(2).should('not.be.disabled');
  });

  it("subcategories should change when category changes", () => {
    cy.get('select').eq(0).select('Parts');
    cy.get('select').eq(1).contains('Tyres');
    cy.get('select').eq(1).contains('20"').should('not.exist');

    cy.get('select').eq(0).select('Unicycles');
    cy.get('select').eq(1).contains('Tyres').should('not.exist');
    cy.get('select').eq(1).contains('20"');
  });

  it("subcategory should be deselected when category changes", () => {
    cy.get('select').eq(0).select('Parts');
    cy.get('select').eq(1).select('Tyres');
    cy.get('select').eq(1).should('have.value', 'Tyres');
    cy.get('select').eq(2).select('36" TA Tyre');

    cy.get('select').eq(0).select('Unicycles');
    cy.get('select').eq(1).should('have.value', 'default');
    cy.get('select').eq(1).contains('Tyres').should('not.exist');
    cy.get('select').eq(1).contains('24"');
    cy.get('select').eq(2).should('be.disabled');
  });
});
