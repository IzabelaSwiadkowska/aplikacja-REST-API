/* eslint-disable no-undef */
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const { uriDb } = require('../config');
require('dotenv').config();

beforeAll(async () => {
  try {
    await mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }
});

mongoose.set('strictQuery', false);

describe('singup controller', () => {
  const credentials = {
    email: 'izabel@gmail.com',
    password: 'h!741ds',
  };

  test('Should create a  user and return him', async () => {
    try {
      const resSignup = await supertest(app)
        .post('/users/signup')
        .send(credentials);
      expect(resSignup.statusCode).toBe(201);
      expect(resSignup.body).toBeTruthy();
      expect(typeof resSignup.body.user).toBe('object');
      expect(typeof resSignup.body.user.email).toBe('string');
      expect(typeof resSignup.body.user.subscription).toBe('string');
    } catch (e) {
      console.error(e);
    }
  });
});

describe('login controller', () => {
  const credentials = {
    email: 'izabel@gmail.com',
    password: 'h!741ds',
  };
  test('Should login a user and return status code 200', async () => {
    try {
      const resLogin = await supertest(app)
        .post('/users/login')
        .send(credentials);
      expect(resLogin.statusCode).toBe(200);
      expect(resLogin.body.token).toBeTruthy();
      expect(typeof resLogin.body.user).toBe('object');
      expect(typeof resLogin.body.user.email).toBe('string');
      expect(typeof resLogin.body.user.subscription).toBe('string');
    } catch (e) {
      console.error(e);
    }
  });

  afterAll(async () => {
    try {
      await mongoose.connection.close();
    } catch (e) {
      console.error(e);
    }
  });
});
