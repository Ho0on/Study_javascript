'use strict';

class UserStorage {
    loginUser(id, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (
                    (id === 'hoon' && password === '1234') || (id === 'coder' && password === '4321')
                ) {
                    resolve(id);
                } else {
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    };

    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (user === 'hoon') {
                    resolve({ name: 'hoon', role: 'admin' });
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        });
    };

    async getUserWithRole(user, password) {
        const id = await this.loginUser(user, password);
        const role = await this.getRoles(id);
        return role;
    }
};

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage
    .loginUser(id, password)
    .then(user => userStorage.getRoles(user))
    .then(user => alert(`Hello ${user.name}, you have a ${user.role} role!`))
    .catch(error => console.log(error));


userStorage
    .getUserWithRole(id, password)
    .then(console.log);