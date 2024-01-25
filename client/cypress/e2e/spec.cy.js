describe('Página de inicio', () => {
  it('Entra correctamente', () => {
    cy.visit('/')

    cy.contains("Let's travel together!").click();

    cy.url().should('include', '/home');
  })
})

describe('Home', () => {

  it('Tienen que mostrarse un total de 10 países', () => {

    cy.visit('/home');

    cy.get('.country-card').should('have.length', 10);

  });
});


describe('Create Activity', () => {
  it('Debe acceder y crear una actividad correctamente en cada caso', () => {

    cy.visit('/home')

    cy.contains("Create Activity").click();
    
    cy.url().should('include', '/activities/form');

    cy.visit('/activities/form');

    //Valid input
    cy.get('[name="name"]').type('swimming');
    cy.get('.formError').should('contain', "Difficulty is required");
    cy.get('[name="difficulty"]').type('1');
    cy.get('[name="duration"]').type('17:30');
    cy.get('.formError').should('contain', ' Season is required ');
    cy.get('[name="season"]').select('Summer');
    cy.get('[name="countries"]').type('Argentina')
    cy.get('.searchResult').contains('Argentina').click();
    cy.get('[name="countries"]').type('Chile')
    cy.get('.searchResult').contains('Chile').click();
    cy.get('[name="countries"]').type('Madagascar')
    cy.get('.searchResult').contains('Madagascar').click();
    cy.contains('CREATE ACTIVITY').should('not.be.disabled');
    cy.reload();

    //Name
    cy.get('[name="name"]').type('a');
    cy.get('[name="difficulty"]').type('1');
    cy.get('[name="duration"]').type('17:30');
    cy.get('[name="season"]').select('Summer');
    cy.get('[name="countries"]').type('Argentina')
    cy.get('.searchResult').contains('Argentina').click();
    cy.get('.formError').should('have.text', "The name length can't be less than 3 words");
    // cy.get('.createActivity').should('be.disabled');
    cy.reload();
    cy.get('[name="name"]').type('!');
    cy.get('[name="difficulty"]').type('1');
    cy.get('[name="duration"]').type('17:30');
    cy.get('[name="season"]').select('Summer');
    cy.get('[name="countries"]').type('Argentina')
    cy.get('.searchResult').contains('Argentina').click();
    cy.get('.formError').should('have.text', "Name can only contain letters and spaces");
    // cy.get('[data-cy="createActivity"]').should('be.disabled');
    cy.reload();
    cy.get('[name="name"]').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.get('[name="difficulty"]').type('1');
    cy.get('[name="duration"]').type('17:30');
    cy.get('[name="season"]').select('Summer');
    cy.get('[name="countries"]').type('Argentina')
    cy.get('.searchResult').contains('Argentina').click();
    cy.get('.formError').should('have.text', "The length can't be more than 20 words");
    // cy.get('[data-cy="createActivity"]').should('be.disabled');
    cy.reload();


    // Difficulty
    cy.get('[name="difficulty"]').clear().type('10');
    // cy.get('[data-cy="createActivity"]').should('be.disabled');
    cy.get('.formError').should('have.contain', 'The difficulty range can only be from 1 to 5');
    cy.reload();

    //Countries
    cy.get('[name="name"]').type('swimming');
    cy.get('[name="difficulty"]').type('1');
    cy.get('[name="duration"]').type('17:30');
    cy.get('[name="season"]').select('Summer');
    cy.get('[name="countries"]').type('Madagascar')
    cy.get('.formError').should('have.text', " At least one country is required ");
    cy.get('.searchResult').contains('Madagascar').click();
    // cy.get('[data-cy="createActivity"]').should('not.be.disabled');
    cy.get('[data-cy="delete"]').click();
    cy.get('.formError').should('have.text', " At least one country is required ");
  
  });
});



describe('Search Bar', () => {

    it('Busca un país e ingresa a su detail. El detail debe tener los datos correctos del país buscado', () => {
    
    cy.visit('/home')
    
    cy.get('.searchBar').type('Argentinas').should('have.text', "")

    cy.get('.searchBar').type('Argentina');

    cy.contains("➕").click();
    
    cy.url().should('include', '/detail/ARG');
    
    cy.get('.detailCountry').should('exist');

    cy.get('.id').should('have.text', 'ARG');
    cy.get('.name').should('have.text', 'Argentina');
    // cy.get('.flags').should('have.text', "https://flagcdn.com/w320/ar.png");
    cy.get('.continent').should('have.text', 'South America');
    cy.get('.capital').should('have.text', 'Buenos Aires');
    cy.get('.subregion').should('have.text', 'South America');
    cy.get('.area').should('have.text', '2780400');
    cy.get('.population').should('have.text', '45376763');

  });
});