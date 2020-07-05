/// <reference types="cypress" />
const _ = Cypress._
const keys = require('../keys/keys')
// require node's url module
const url = require('url')

describe('Logging In', function () {
  const email = keys.email
  const pass = keys.pass
  Cypress.Commands.add('loginBySingleSignOn', (overrides = {}) => {
    Cypress.log({
      name: 'loginBySingleSignOn',
    })
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.visit('http://www.strava.com/oauth/authorize?client_id=43111&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read,activity:read,activity:write')
    cy.get('#email').type(email);
    cy.get('#password').type(pass)
    cy.get('#login-button').click()
    cy.get('#authorize').click()
    
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/dashboard',
    }
    _.extend(options, overrides)
    cy.request(options)
  })

  context('Login and redirect to dashboard', function () {
    it('can authenticate with cy.request', function () {
        cy.loginBySingleSignOn().then((resp) => {
        expect(resp.status).to.eq(200)
        cy.contains('Krzysztofb Cypress');
      })
    })

  })
})
