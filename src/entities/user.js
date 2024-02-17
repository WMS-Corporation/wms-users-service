class User{
    constructor(codUser, username, password, name, surname, type, token) {
        this._codUser = codUser;
        this._username = username;
        this._password = password;
        this._name = name;
        this._surname = surname;
        this._type = type;
        this._token= token
    }


    set token(value) {
        this._token = value;
    }

    get token() {
        return this._token;
    }

    get codUser() {
        return this._codUser;
    }

    set codUser(value) {
        this._codUser = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get surname() {
        return this._surname;
    }

    set surname(value) {
        this._surname = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}
module.exports = {User};