const request = require('supertest');
const bcrypt = require('bcrypt');
const { app } = require('../index');

// Mock the database model
jest.mock('../models/mainModel', () => ({
    registerUser: jest.fn(),
    getUserByEmail: jest.fn()
}));

const UserModel = require('../models/mainModel');

// Mock bcrypt to avoid real hashing
jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn()
}));

describe('API tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ----------------------
    // REGISTER
    // ----------------------
    describe('POST /users/register', () => {

        test('should register a new user successfully', async () => {
            UserModel.registerUser.mockResolvedValue({ insertId: 42 });
            bcrypt.hash.mockResolvedValue('hashedpassword');

            const res = await request(app)
                .post('/users/register')
                .send({
                    name: 'John Doe',
                    email: 'john@test.com',
                    phone_num: '123456789',
                    password: 'secret'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.msg).toBe("Sikeres regisztráció!");
            expect(UserModel.registerUser).toHaveBeenCalledWith(
                'John Doe',
                'john@test.com',
                '123456789',
                'hashedpassword'
            );
        });

        test('should fail if a field is missing', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    name: 'John Doe',
                    email: '', // missing
                    phone_num: '123456789',
                    password: 'secret'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.msg).toBe("Minden mező kitöltése kötelező!");
        });

        test('should fail if MySQL throws duplicate email error', async () => {
            bcrypt.hash.mockResolvedValue('hashedpassword');
            UserModel.registerUser.mockRejectedValue({
                code: "ER_DUP_ENTRY",
                sqlMessage: "Duplicate entry 'john@test.com' for key 'email'"
            });

            const res = await request(app)
                .post('/users/register')
                .send({
                    name: 'John Doe',
                    email: 'john@test.com',
                    phone_num: '123456789',
                    password: 'secret'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.msg).toBe("Ezzel az email címmel már regisztráltak!");
        });
    });

    // ----------------------
    // LOGIN
    // ----------------------
    describe('POST /users/login', () => {
        test('should login successfully', async () => {
            const fakeUser = {
                id: 1,
                name: 'John',
                email: 'john@test.com',
                phone_num: '123',
                password: 'hashedpassword'
            };
            UserModel.getUserByEmail.mockResolvedValue(fakeUser);
            bcrypt.compare.mockResolvedValue(true);

            const agent = request.agent(app); // to keep session

            const res = await agent
                .post('/users/login')
                .send({
                    email: 'john@test.com',
                    password: 'secret'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.msg).toBe("Sikeres bejelentkezés!");
            expect(UserModel.getUserByEmail).toHaveBeenCalledWith('john@test.com');
            expect(bcrypt.compare).toHaveBeenCalledWith('secret', 'hashedpassword');
        });

        test('should fail with wrong email', async () => {
            UserModel.getUserByEmail.mockResolvedValue(null);

            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'wrong@test.com',
                    password: 'secret'
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.msg).toBe("Helytelen email cím vagy jelszó!");
        });

        test('should fail with wrong password', async () => {
            const fakeUser = {
                id: 1,
                name: 'John',
                email: 'john@test.com',
                phone_num: '123',
                password: 'hashedpassword'
            };
            UserModel.getUserByEmail.mockResolvedValue(fakeUser);
            bcrypt.compare.mockResolvedValue(false);

            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'john@test.com',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.msg).toBe("Helytelen email cím vagy jelszó!");
        });
    });

    // ----------------------
    // GET routes (optional)
    // ----------------------
    describe('GET routes', () => {
        test('GET / should render mainpage', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
        });

        test('GET /login should render login page', async () => {
            const res = await request(app).get('/login');
            expect(res.statusCode).toBe(200);
        });

        test('GET /register should render register page', async () => {
            const res = await request(app).get('/register');
            expect(res.statusCode).toBe(200);
        });
    });

});
