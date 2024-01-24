describe('Página de inicio', () => {
  it('Entra correctamente', () => {
    cy.visit('/')

    cy.contains("Let's travel together!").click();

    cy.url().should('include', '/home');
  })
})

describe('Chequea total de países', () => {

  it('Tienen que mostrarse un total de 10 países', () => {
    cy.visit('/home');

    cy.get('.currentCountries').should('have.length', 10);
  });
});


describe('Crea nueva actividad', () => {
  it('Debe responder correctamente en cada caso', () => {
    cy.visit('/activities/form');

    // Test case 1: Valid input
    cy.get('[name="name"]').type('swimming');
    cy.get('[name="difficulty"]').type('1');
    cy.get('[name="duration"]').type('17:30');
    cy.get('[name="season"]').select('Summer');
    // cy.get('[name="countries"]').type('Argentina').click();
    cy.get('.formButton').should('not.be.disabled');

    // Test case 2: Empty season
    cy.get('[name="season"]').select('');
    cy.get('.formButton').should('be.disabled');
    cy.get('.formError').should('have.text', ' Season is required. ');

    // Test case 3: Invalid difficulty
    cy.get('[name="difficulty"]').clear().type('10');
    cy.get('.formButton').should('be.disabled');
    cy.get('.formError').should('have.text', 'The difficulty range can only be from 1 to 5');

    // Test case 4: Invalid duration
    cy.get('[name="duration"]').clear().type('50:00');
    cy.get('.formButton').should('be.disabled');
    cy.get('.formError').should('have.text', 'The duration can\'t be more than 24 hours');

    // Test case 5: Adding multiple countries
    cy.get('[name="countries"]').clear().type('ARG');
    cy.get('.searchResults').contains('Argentina').click(); 
    cy.get('.countrySelected').should('have.length', 1);

    cy.get('[name="countries"]').clear().type('CHL');
    cy.get('.searchResults').contains('Chile').click();
    cy.get('.countrySelected').should('have.length', 2);

    cy.get('.formButton').should('not.be.disabled');
  });
});




describe('Corrobora el detail', () => {
  it('El detail tiene que devolver toda la información del país', () => {
    cy.get('/detail/ARG').should('deep.equal',
    { 
    "id": "ARG",
    "name": "Argentina",
    "flags": "https://flagcdn.com/w320/ar.png",
    "continent": "South America",
    "capital": "Buenos Aires",
    "subregion": "South America",
    "area": "2780400",
    "population": 45376763,
    "Activities": [{
			"name": "Skiing",
			"duration": "02:30:00",
			"difficulty": "5",
			"season": "Winter"
		},
		{
			"name": "Trekking",
			"duration": "09:00:00",
			"difficulty": "3",
			"season": "Summer"
		},
		{
			"name": "Argentina ",
			"duration": "12:30:00",
			"difficulty": "5",
			"season": "Autumn"
		}] 
  });   
  });
});
