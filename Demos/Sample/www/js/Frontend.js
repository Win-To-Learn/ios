(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * frontend.js
 *
 * Interface to manage login / registration / management
 */
'use strict';

var config = require('./config.js');
var LoginPage = require('./LoginPage.js');
var RegisterPage = require('./RegisterPage.js');

$(function () {
    var page;
    $('.hidden').hide();
    if ($('#login-page').length) {
        page = new LoginPage(config);
    } else if ($('#register-page').length) {
        page = new RegisterPage(config);
    }
});
},{"./LoginPage.js":2,"./RegisterPage.js":3,"./config.js":4}],2:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

var LoginPage = function (config) {
    this.config = config;

    this.$msg = $('#login-dialog .message');

    for (var i = 1; i <= 2; i++) {
        var tags = this.config.gamerTags[i];
        for (var j = 0, l = tags.length; j < l; j++) {
            $('#gt' + i).append('<option>' + tags[j] + '</option>');
        }
    }

    $('.select').selectmenu();
    $('.loginbutton').button({icons: {primary: 'ui-icon-triangle-1-e'}});
    $('.accordion').accordion({heightStyle: 'content'});

    var self = this;
    $('#guestlogin').click(function () {
        self.doLogin({
            server: $('#server').val(),
            tag: $('#gt1').val() + ' ' + $('#gt2').val()
        });
    });
    $('#userlogin').click(function () {
        self.doLogin({
            user: $('#username').val(),
            pass: $('#password').val()
        });
    });
};

LoginPage.prototype.doLogin = function (data) {
    if (!data.tag && (data.user.length === 0 || data.pass.length === 0)) {
        this.setLoginError('Please enter a username and password');
    } else {
        $.ajax({
            url: 'http://pharcoder-single-1.elasticbeanstalk.com:8080/api/login',
            type: 'POST',
            data: data,
            //contentType: 'application/json',
            context: this,
            success: this.loginSuccess,
            error: this.loginError
        });
    }
};

LoginPage.prototype.loginSuccess = function (data, status) {
    window.location = data.goto;
};

LoginPage.prototype.loginError = function (jq, status, httpError) {
    if (status === 'error' && httpError === 'Unauthorized') {
        this.setLoginError('Wrong username or password');
    } else {
        this.setLoginError('There was a problem reaching the server. Please try again later.');
    }
};

LoginPage.prototype.setLoginError = function (error) {
    if (!error) {
        this.$msg.hide();
    } else {
        this.$msg.html(error);
        this.$msg.show();
    }
};

module.exports = LoginPage;
},{}],3:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

var RegisterPage = function (config) {
    this.config = config;

    this.$msg = $('#register-dialog .message');

    //for (var i = 1; i <= 2; i++) {
    //    var tags = this.config.gamerTags[i];
    //    for (var j = 0, l = tags.length; j < l; j++) {
    //        $('#gt' + i).append('<option>' + tags[j] + '</option>');
    //    }
    //}

    //$('.select').selectmenu();
    //$('.loginbutton').button({icons: {primary: 'ui-icon-triangle-1-e'}});
    $('.accordion').accordion({heightStyle: 'content'});
    $('#userregister').button({icons: {primary: 'ui-icon-triangle-1-e'}});

    var self = this;
    $('#userregister').click(function () {
        self.doRegister({
            user: $('#username').val(),
            pass: $('#password').val()
        });
    });
};


RegisterPage.prototype.doRegister = function (data) {
    if (data.user.length === 0 || data.pass.length === 0) {
        this.setLoginError('Please enter a username and password');
    } else {
        $.ajax({
            url: '/api/register',
            type: 'POST',
            data: data,
            //contentType: 'application/json',
            context: this,
            success: this.registerSuccess,
            error: this.registerError
        });
    }
};

RegisterPage.prototype.registerSuccess = function (data, status) {
    window.location = data.goto;
};

RegisterPage.prototype.registerError = function (jq, status, httpError) {
    if (status === 'error' && httpError === 'Unauthorized') {
        this.setRegisterError('Wrong username or password');
    } else {
        this.setRegisterError('There was a problem reaching the server. Please try again later.');
    }
};

RegisterPage.prototype.setRegisterError = function (error) {
    if (!error) {
        this.$msg.hide();
    } else {
        this.$msg.html(error);
        this.$msg.show();
    }
};

module.exports = RegisterPage;
},{}],4:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

module.exports = {
    gamerTags: {
        1: [
            'super',
            'awesome',
            'rainbow',
            'double',
            'triple',
            'vampire',
            'princess',
            'ice',
            'fire',
            'robot',
            'werewolf',
            'sparkle',
            'infinite',
            'cool',
            'yolo',
            'swaggy',
            'zombie',
            'samurai',
            'dancing',
            'power',
            'gold',
            'silver',
            'radioactive',
            'quantum',
            'brilliant',
            'mighty',
            'random'
        ],
        2: [
            'tiger',
            'ninja',
            'princess',
            'robot',
            'pony',
            'dancer',
            'rocker',
            'master',
            'hacker',
            'rainbow',
            'kitten',
            'puppy',
            'boss',
            'wizard',
            'hero',
            'dragon',
            'tribute',
            'genius',
            'blaster',
            'spider'
        ]
    }
};
},{}]},{},[1])


},{"./LoginPage.js":2,"./RegisterPage.js":3,"./config.js":4}],2:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

var LoginPage = function (config) {
    this.config = config;

    this.$msg = $('#login-dialog .message');

    for (var i = 1; i <= 2; i++) {
        var tags = this.config.gamerTags[i];
        for (var j = 0, l = tags.length; j < l; j++) {
            $('#gt' + i).append('<option>' + tags[j] + '</option>');
        }
    }

    $('.select').selectmenu();
    $('.loginbutton').button({icons: {primary: 'ui-icon-triangle-1-e'}});
    $('.accordion').accordion({heightStyle: 'content'});

    var self = this;
    $('#guestlogin').click(function () {
        self.doLogin({
            server: $('#server').val(),
            tag: $('#gt1').val() + ' ' + $('#gt2').val()
        });
    });
    $('#userlogin').click(function () {
        self.doLogin({
            user: $('#username').val(),
            pass: $('#password').val()
        });
    });
};

LoginPage.prototype.doLogin = function (data) {
    if (!data.tag && (data.user.length === 0 || data.pass.length === 0)) {
        this.setLoginError('Please enter a username and password');
    } else {
        $.ajax({
            url: 'http://pharcoder-single-1.elasticbeanstalk.com:8080/api/login',
            type: 'POST',
            data: data,
            //contentType: 'application/json',
            context: this,
            success: this.loginSuccess,
            error: this.loginError
        });
    }
};

LoginPage.prototype.loginSuccess = function (data, status) {
    window.location = data.goto;
};

LoginPage.prototype.loginError = function (jq, status, httpError) {
    if (status === 'error' && httpError === 'Unauthorized') {
        this.setLoginError('Wrong username or password');
    } else {
        this.setLoginError('There was a problem reaching the server. Please try again later.');
    }
};

LoginPage.prototype.setLoginError = function (error) {
    if (!error) {
        this.$msg.hide();
    } else {
        this.$msg.html(error);
        this.$msg.show();
    }
};

module.exports = LoginPage;
},{}],3:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

var RegisterPage = function (config) {
    this.config = config;

    this.$msg = $('#register-dialog .message');

    //for (var i = 1; i <= 2; i++) {
    //    var tags = this.config.gamerTags[i];
    //    for (var j = 0, l = tags.length; j < l; j++) {
    //        $('#gt' + i).append('<option>' + tags[j] + '</option>');
    //    }
    //}

    //$('.select').selectmenu();
    //$('.loginbutton').button({icons: {primary: 'ui-icon-triangle-1-e'}});
    $('.accordion').accordion({heightStyle: 'content'});
    $('#userregister').button({icons: {primary: 'ui-icon-triangle-1-e'}});

    var self = this;
    $('#userregister').click(function () {
        self.doRegister({
            user: $('#username').val(),
            pass: $('#password').val()
        });
    });
};


RegisterPage.prototype.doRegister = function (data) {
    if (data.user.length === 0 || data.pass.length === 0) {
        this.setLoginError('Please enter a username and password');
    } else {
        $.ajax({
            url: '/api/register',
            type: 'POST',
            data: data,
            //contentType: 'application/json',
            context: this,
            success: this.registerSuccess,
            error: this.registerError
        });
    }
};

RegisterPage.prototype.registerSuccess = function (data, status) {
    window.location = data.goto;
};

RegisterPage.prototype.registerError = function (jq, status, httpError) {
    if (status === 'error' && httpError === 'Unauthorized') {
        this.setRegisterError('Wrong username or password');
    } else {
        this.setRegisterError('There was a problem reaching the server. Please try again later.');
    }
};

RegisterPage.prototype.setRegisterError = function (error) {
    if (!error) {
        this.$msg.hide();
    } else {
        this.$msg.html(error);
        this.$msg.show();
    }
};

module.exports = RegisterPage;
},{}],4:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

module.exports = {
    gamerTags: {
        1: [
            'super',
            'awesome',
            'rainbow',
            'double',
            'triple',
            'vampire',
            'princess',
            'ice',
            'fire',
            'robot',
            'werewolf',
            'sparkle',
            'infinite',
            'cool',
            'yolo',
            'swaggy',
            'zombie',
            'samurai',
            'dancing',
            'power',
            'gold',
            'silver',
            'radioactive',
            'quantum',
            'brilliant',
            'mighty',
            'random'
        ],
        2: [
            'tiger',
            'ninja',
            'princess',
            'robot',
            'pony',
            'dancer',
            'rocker',
            'master',
            'hacker',
            'rainbow',
            'kitten',
            'puppy',
            'boss',
            'wizard',
            'hero',
            'dragon',
            'tribute',
            'genius',
            'blaster',
            'spider'
        ]
    }
};
},{}]},{},[1])


},{"./LoginPage.js":2,"./RegisterPage.js":3,"./config.js":4}],2:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

var LoginPage = function (config) {
    this.config = config;

    this.$msg = $('#login-dialog .message');

    for (var i = 1; i <= 2; i++) {
        var tags = this.config.gamerTags[i];
        for (var j = 0, l = tags.length; j < l; j++) {
            $('#gt' + i).append('<option>' + tags[j] + '</option>');
        }
    }

    $('.select').selectmenu();
    $('.loginbutton').button({icons: {primary: 'ui-icon-triangle-1-e'}});
    $('.accordion').accordion({heightStyle: 'content'});

    var self = this;
    $('#guestlogin').click(function () {
        self.doLogin({
            server: $('#server').val(),
            tag: $('#gt1').val() + ' ' + $('#gt2').val()
        });
    });
    $('#userlogin').click(function () {
        self.doLogin({
            user: $('#username').val(),
            pass: $('#password').val()
        });
    });
};

LoginPage.prototype.doLogin = function (data) {
    if (!data.tag && (data.user.length === 0 || data.pass.length === 0)) {
        this.setLoginError('Please enter a username and password');
    } else {
        $.ajax({
            url: 'http://pharcoder-single-1.elasticbeanstalk.com:8080/api/login',
            type: 'POST',
            data: data,
            //contentType: 'application/json',
            context: this,
            success: this.loginSuccess,
            error: this.loginError
        });
    }
};

LoginPage.prototype.loginSuccess = function (data, status) {
    window.location = data.goto;
};

LoginPage.prototype.loginError = function (jq, status, httpError) {
    if (status === 'error' && httpError === 'Unauthorized') {
        this.setLoginError('Wrong username or password');
    } else {
        this.setLoginError('There was a problem reaching the server. Please try again later.');
    }
};

LoginPage.prototype.setLoginError = function (error) {
    if (!error) {
        this.$msg.hide();
    } else {
        this.$msg.html(error);
        this.$msg.show();
    }
};

module.exports = LoginPage;
},{}],3:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

var RegisterPage = function (config) {
    this.config = config;

    this.$msg = $('#register-dialog .message');

    //for (var i = 1; i <= 2; i++) {
    //    var tags = this.config.gamerTags[i];
    //    for (var j = 0, l = tags.length; j < l; j++) {
    //        $('#gt' + i).append('<option>' + tags[j] + '</option>');
    //    }
    //}

    //$('.select').selectmenu();
    //$('.loginbutton').button({icons: {primary: 'ui-icon-triangle-1-e'}});
    $('.accordion').accordion({heightStyle: 'content'});
    $('#userregister').button({icons: {primary: 'ui-icon-triangle-1-e'}});

    var self = this;
    $('#userregister').click(function () {
        self.doRegister({
            user: $('#username').val(),
            pass: $('#password').val()
        });
    });
};


RegisterPage.prototype.doRegister = function (data) {
    if (data.user.length === 0 || data.pass.length === 0) {
        this.setLoginError('Please enter a username and password');
    } else {
        $.ajax({
            url: '/api/register',
            type: 'POST',
            data: data,
            //contentType: 'application/json',
            context: this,
            success: this.registerSuccess,
            error: this.registerError
        });
    }
};

RegisterPage.prototype.registerSuccess = function (data, status) {
    window.location = data.goto;
};

RegisterPage.prototype.registerError = function (jq, status, httpError) {
    if (status === 'error' && httpError === 'Unauthorized') {
        this.setRegisterError('Wrong username or password');
    } else {
        this.setRegisterError('There was a problem reaching the server. Please try again later.');
    }
};

RegisterPage.prototype.setRegisterError = function (error) {
    if (!error) {
        this.$msg.hide();
    } else {
        this.$msg.html(error);
        this.$msg.show();
    }
};

module.exports = RegisterPage;
},{}],4:[function(require,module,exports){
/**
 * Created by jay on 9/6/15.
 */

module.exports = {
    gamerTags: {
        1: [
            'super',
            'awesome',
            'rainbow',
            'double',
            'triple',
            'vampire',
            'princess',
            'ice',
            'fire',
            'robot',
            'werewolf',
            'sparkle',
            'infinite',
            'cool',
            'yolo',
            'swaggy',
            'zombie',
            'samurai',
            'dancing',
            'power',
            'gold',
            'silver',
            'radioactive',
            'quantum',
            'brilliant',
            'mighty',
            'random'
        ],
        2: [
            'tiger',
            'ninja',
            'princess',
            'robot',
            'pony',
            'dancer',
            'rocker',
            'master',
            'hacker',
            'rainbow',
            'kitten',
            'puppy',
            'boss',
            'wizard',
            'hero',
            'dragon',
            'tribute',
            'genius',
            'blaster',
            'spider'
        ]
    }
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvanMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL0Zyb250ZW5kLmpzIiwianMvanMvanMvTG9naW5QYWdlLmpzIiwianMvanMvanMvUmVnaXN0ZXJQYWdlLmpzIiwianMvanMvanMvY29uZmlnLmpzIiwianMvanMvTG9naW5QYWdlLmpzIiwianMvanMvUmVnaXN0ZXJQYWdlLmpzIiwianMvanMvY29uZmlnLmpzIiwianMvTG9naW5QYWdlLmpzIiwianMvUmVnaXN0ZXJQYWdlLmpzIiwianMvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUNBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogZnJvbnRlbmQuanNcbiAqXG4gKiBJbnRlcmZhY2UgdG8gbWFuYWdlIGxvZ2luIC8gcmVnaXN0cmF0aW9uIC8gbWFuYWdlbWVudFxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5qcycpO1xudmFyIExvZ2luUGFnZSA9IHJlcXVpcmUoJy4vTG9naW5QYWdlLmpzJyk7XG52YXIgUmVnaXN0ZXJQYWdlID0gcmVxdWlyZSgnLi9SZWdpc3RlclBhZ2UuanMnKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhZ2U7XG4gICAgJCgnLmhpZGRlbicpLmhpZGUoKTtcbiAgICBpZiAoJCgnI2xvZ2luLXBhZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgcGFnZSA9IG5ldyBMb2dpblBhZ2UoY29uZmlnKTtcbiAgICB9IGVsc2UgaWYgKCQoJyNyZWdpc3Rlci1wYWdlJykubGVuZ3RoKSB7XG4gICAgICAgIHBhZ2UgPSBuZXcgUmVnaXN0ZXJQYWdlKGNvbmZpZyk7XG4gICAgfVxufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxudmFyIExvZ2luUGFnZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuJG1zZyA9ICQoJyNsb2dpbi1kaWFsb2cgLm1lc3NhZ2UnKTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDI7IGkrKykge1xuICAgICAgICB2YXIgdGFncyA9IHRoaXMuY29uZmlnLmdhbWVyVGFnc1tpXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGwgPSB0YWdzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgJCgnI2d0JyArIGkpLmFwcGVuZCgnPG9wdGlvbj4nICsgdGFnc1tqXSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5zZWxlY3QnKS5zZWxlY3RtZW51KCk7XG4gICAgJCgnLmxvZ2luYnV0dG9uJykuYnV0dG9uKHtpY29uczoge3ByaW1hcnk6ICd1aS1pY29uLXRyaWFuZ2xlLTEtZSd9fSk7XG4gICAgJCgnLmFjY29yZGlvbicpLmFjY29yZGlvbih7aGVpZ2h0U3R5bGU6ICdjb250ZW50J30pO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQoJyNndWVzdGxvZ2luJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmRvTG9naW4oe1xuICAgICAgICAgICAgc2VydmVyOiAkKCcjc2VydmVyJykudmFsKCksXG4gICAgICAgICAgICB0YWc6ICQoJyNndDEnKS52YWwoKSArICcgJyArICQoJyNndDInKS52YWwoKVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAkKCcjdXNlcmxvZ2luJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmRvTG9naW4oe1xuICAgICAgICAgICAgdXNlcjogJCgnI3VzZXJuYW1lJykudmFsKCksXG4gICAgICAgICAgICBwYXNzOiAkKCcjcGFzc3dvcmQnKS52YWwoKVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUuZG9Mb2dpbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKCFkYXRhLnRhZyAmJiAoZGF0YS51c2VyLmxlbmd0aCA9PT0gMCB8fCBkYXRhLnBhc3MubGVuZ3RoID09PSAwKSkge1xuICAgICAgICB0aGlzLnNldExvZ2luRXJyb3IoJ1BsZWFzZSBlbnRlciBhIHVzZXJuYW1lIGFuZCBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2xvZ2luJyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAvL2NvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICAgICAgc3VjY2VzczogdGhpcy5sb2dpblN1Y2Nlc3MsXG4gICAgICAgICAgICBlcnJvcjogdGhpcy5sb2dpbkVycm9yXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUubG9naW5TdWNjZXNzID0gZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IGRhdGEuZ290bztcbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUubG9naW5FcnJvciA9IGZ1bmN0aW9uIChqcSwgc3RhdHVzLCBodHRwRXJyb3IpIHtcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InICYmIGh0dHBFcnJvciA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgdGhpcy5zZXRMb2dpbkVycm9yKCdXcm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0TG9naW5FcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicpO1xuICAgIH1cbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUuc2V0TG9naW5FcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy4kbXNnLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRtc2cuaHRtbChlcnJvcik7XG4gICAgICAgIHRoaXMuJG1zZy5zaG93KCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2dpblBhZ2U7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxudmFyIFJlZ2lzdGVyUGFnZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuJG1zZyA9ICQoJyNyZWdpc3Rlci1kaWFsb2cgLm1lc3NhZ2UnKTtcblxuICAgIC8vZm9yICh2YXIgaSA9IDE7IGkgPD0gMjsgaSsrKSB7XG4gICAgLy8gICAgdmFyIHRhZ3MgPSB0aGlzLmNvbmZpZy5nYW1lclRhZ3NbaV07XG4gICAgLy8gICAgZm9yICh2YXIgaiA9IDAsIGwgPSB0YWdzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgIC8vICAgICAgICAkKCcjZ3QnICsgaSkuYXBwZW5kKCc8b3B0aW9uPicgKyB0YWdzW2pdICsgJzwvb3B0aW9uPicpO1xuICAgIC8vICAgIH1cbiAgICAvL31cblxuICAgIC8vJCgnLnNlbGVjdCcpLnNlbGVjdG1lbnUoKTtcbiAgICAvLyQoJy5sb2dpbmJ1dHRvbicpLmJ1dHRvbih7aWNvbnM6IHtwcmltYXJ5OiAndWktaWNvbi10cmlhbmdsZS0xLWUnfX0pO1xuICAgICQoJy5hY2NvcmRpb24nKS5hY2NvcmRpb24oe2hlaWdodFN0eWxlOiAnY29udGVudCd9KTtcbiAgICAkKCcjdXNlcnJlZ2lzdGVyJykuYnV0dG9uKHtpY29uczoge3ByaW1hcnk6ICd1aS1pY29uLXRyaWFuZ2xlLTEtZSd9fSk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJCgnI3VzZXJyZWdpc3RlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5kb1JlZ2lzdGVyKHtcbiAgICAgICAgICAgIHVzZXI6ICQoJyN1c2VybmFtZScpLnZhbCgpLFxuICAgICAgICAgICAgcGFzczogJCgnI3Bhc3N3b3JkJykudmFsKClcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuZG9SZWdpc3RlciA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKGRhdGEudXNlci5sZW5ndGggPT09IDAgfHwgZGF0YS5wYXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnNldExvZ2luRXJyb3IoJ1BsZWFzZSBlbnRlciBhIHVzZXJuYW1lIGFuZCBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAvL2NvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICAgICAgc3VjY2VzczogdGhpcy5yZWdpc3RlclN1Y2Nlc3MsXG4gICAgICAgICAgICBlcnJvcjogdGhpcy5yZWdpc3RlckVycm9yXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUucmVnaXN0ZXJTdWNjZXNzID0gZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IGRhdGEuZ290bztcbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUucmVnaXN0ZXJFcnJvciA9IGZ1bmN0aW9uIChqcSwgc3RhdHVzLCBodHRwRXJyb3IpIHtcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InICYmIGh0dHBFcnJvciA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgdGhpcy5zZXRSZWdpc3RlckVycm9yKCdXcm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJFcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicpO1xuICAgIH1cbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuc2V0UmVnaXN0ZXJFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy4kbXNnLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRtc2cuaHRtbChlcnJvcik7XG4gICAgICAgIHRoaXMuJG1zZy5zaG93KCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWdpc3RlclBhZ2U7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2FtZXJUYWdzOiB7XG4gICAgICAgIDE6IFtcbiAgICAgICAgICAgICdzdXBlcicsXG4gICAgICAgICAgICAnYXdlc29tZScsXG4gICAgICAgICAgICAncmFpbmJvdycsXG4gICAgICAgICAgICAnZG91YmxlJyxcbiAgICAgICAgICAgICd0cmlwbGUnLFxuICAgICAgICAgICAgJ3ZhbXBpcmUnLFxuICAgICAgICAgICAgJ3ByaW5jZXNzJyxcbiAgICAgICAgICAgICdpY2UnLFxuICAgICAgICAgICAgJ2ZpcmUnLFxuICAgICAgICAgICAgJ3JvYm90JyxcbiAgICAgICAgICAgICd3ZXJld29sZicsXG4gICAgICAgICAgICAnc3BhcmtsZScsXG4gICAgICAgICAgICAnaW5maW5pdGUnLFxuICAgICAgICAgICAgJ2Nvb2wnLFxuICAgICAgICAgICAgJ3lvbG8nLFxuICAgICAgICAgICAgJ3N3YWdneScsXG4gICAgICAgICAgICAnem9tYmllJyxcbiAgICAgICAgICAgICdzYW11cmFpJyxcbiAgICAgICAgICAgICdkYW5jaW5nJyxcbiAgICAgICAgICAgICdwb3dlcicsXG4gICAgICAgICAgICAnZ29sZCcsXG4gICAgICAgICAgICAnc2lsdmVyJyxcbiAgICAgICAgICAgICdyYWRpb2FjdGl2ZScsXG4gICAgICAgICAgICAncXVhbnR1bScsXG4gICAgICAgICAgICAnYnJpbGxpYW50JyxcbiAgICAgICAgICAgICdtaWdodHknLFxuICAgICAgICAgICAgJ3JhbmRvbSdcbiAgICAgICAgXSxcbiAgICAgICAgMjogW1xuICAgICAgICAgICAgJ3RpZ2VyJyxcbiAgICAgICAgICAgICduaW5qYScsXG4gICAgICAgICAgICAncHJpbmNlc3MnLFxuICAgICAgICAgICAgJ3JvYm90JyxcbiAgICAgICAgICAgICdwb255JyxcbiAgICAgICAgICAgICdkYW5jZXInLFxuICAgICAgICAgICAgJ3JvY2tlcicsXG4gICAgICAgICAgICAnbWFzdGVyJyxcbiAgICAgICAgICAgICdoYWNrZXInLFxuICAgICAgICAgICAgJ3JhaW5ib3cnLFxuICAgICAgICAgICAgJ2tpdHRlbicsXG4gICAgICAgICAgICAncHVwcHknLFxuICAgICAgICAgICAgJ2Jvc3MnLFxuICAgICAgICAgICAgJ3dpemFyZCcsXG4gICAgICAgICAgICAnaGVybycsXG4gICAgICAgICAgICAnZHJhZ29uJyxcbiAgICAgICAgICAgICd0cmlidXRlJyxcbiAgICAgICAgICAgICdnZW5pdXMnLFxuICAgICAgICAgICAgJ2JsYXN0ZXInLFxuICAgICAgICAgICAgJ3NwaWRlcidcbiAgICAgICAgXVxuICAgIH1cbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxudmFyIExvZ2luUGFnZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuJG1zZyA9ICQoJyNsb2dpbi1kaWFsb2cgLm1lc3NhZ2UnKTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDI7IGkrKykge1xuICAgICAgICB2YXIgdGFncyA9IHRoaXMuY29uZmlnLmdhbWVyVGFnc1tpXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGwgPSB0YWdzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgJCgnI2d0JyArIGkpLmFwcGVuZCgnPG9wdGlvbj4nICsgdGFnc1tqXSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5zZWxlY3QnKS5zZWxlY3RtZW51KCk7XG4gICAgJCgnLmxvZ2luYnV0dG9uJykuYnV0dG9uKHtpY29uczoge3ByaW1hcnk6ICd1aS1pY29uLXRyaWFuZ2xlLTEtZSd9fSk7XG4gICAgJCgnLmFjY29yZGlvbicpLmFjY29yZGlvbih7aGVpZ2h0U3R5bGU6ICdjb250ZW50J30pO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQoJyNndWVzdGxvZ2luJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmRvTG9naW4oe1xuICAgICAgICAgICAgc2VydmVyOiAkKCcjc2VydmVyJykudmFsKCksXG4gICAgICAgICAgICB0YWc6ICQoJyNndDEnKS52YWwoKSArICcgJyArICQoJyNndDInKS52YWwoKVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAkKCcjdXNlcmxvZ2luJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmRvTG9naW4oe1xuICAgICAgICAgICAgdXNlcjogJCgnI3VzZXJuYW1lJykudmFsKCksXG4gICAgICAgICAgICBwYXNzOiAkKCcjcGFzc3dvcmQnKS52YWwoKVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUuZG9Mb2dpbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKCFkYXRhLnRhZyAmJiAoZGF0YS51c2VyLmxlbmd0aCA9PT0gMCB8fCBkYXRhLnBhc3MubGVuZ3RoID09PSAwKSkge1xuICAgICAgICB0aGlzLnNldExvZ2luRXJyb3IoJ1BsZWFzZSBlbnRlciBhIHVzZXJuYW1lIGFuZCBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2xvZ2luJyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAvL2NvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICAgICAgc3VjY2VzczogdGhpcy5sb2dpblN1Y2Nlc3MsXG4gICAgICAgICAgICBlcnJvcjogdGhpcy5sb2dpbkVycm9yXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUubG9naW5TdWNjZXNzID0gZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IGRhdGEuZ290bztcbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUubG9naW5FcnJvciA9IGZ1bmN0aW9uIChqcSwgc3RhdHVzLCBodHRwRXJyb3IpIHtcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InICYmIGh0dHBFcnJvciA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgdGhpcy5zZXRMb2dpbkVycm9yKCdXcm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0TG9naW5FcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicpO1xuICAgIH1cbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUuc2V0TG9naW5FcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy4kbXNnLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRtc2cuaHRtbChlcnJvcik7XG4gICAgICAgIHRoaXMuJG1zZy5zaG93KCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2dpblBhZ2U7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxudmFyIFJlZ2lzdGVyUGFnZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuJG1zZyA9ICQoJyNyZWdpc3Rlci1kaWFsb2cgLm1lc3NhZ2UnKTtcblxuICAgIC8vZm9yICh2YXIgaSA9IDE7IGkgPD0gMjsgaSsrKSB7XG4gICAgLy8gICAgdmFyIHRhZ3MgPSB0aGlzLmNvbmZpZy5nYW1lclRhZ3NbaV07XG4gICAgLy8gICAgZm9yICh2YXIgaiA9IDAsIGwgPSB0YWdzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgIC8vICAgICAgICAkKCcjZ3QnICsgaSkuYXBwZW5kKCc8b3B0aW9uPicgKyB0YWdzW2pdICsgJzwvb3B0aW9uPicpO1xuICAgIC8vICAgIH1cbiAgICAvL31cblxuICAgIC8vJCgnLnNlbGVjdCcpLnNlbGVjdG1lbnUoKTtcbiAgICAvLyQoJy5sb2dpbmJ1dHRvbicpLmJ1dHRvbih7aWNvbnM6IHtwcmltYXJ5OiAndWktaWNvbi10cmlhbmdsZS0xLWUnfX0pO1xuICAgICQoJy5hY2NvcmRpb24nKS5hY2NvcmRpb24oe2hlaWdodFN0eWxlOiAnY29udGVudCd9KTtcbiAgICAkKCcjdXNlcnJlZ2lzdGVyJykuYnV0dG9uKHtpY29uczoge3ByaW1hcnk6ICd1aS1pY29uLXRyaWFuZ2xlLTEtZSd9fSk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJCgnI3VzZXJyZWdpc3RlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5kb1JlZ2lzdGVyKHtcbiAgICAgICAgICAgIHVzZXI6ICQoJyN1c2VybmFtZScpLnZhbCgpLFxuICAgICAgICAgICAgcGFzczogJCgnI3Bhc3N3b3JkJykudmFsKClcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuZG9SZWdpc3RlciA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKGRhdGEudXNlci5sZW5ndGggPT09IDAgfHwgZGF0YS5wYXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnNldExvZ2luRXJyb3IoJ1BsZWFzZSBlbnRlciBhIHVzZXJuYW1lIGFuZCBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAvL2NvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICAgICAgc3VjY2VzczogdGhpcy5yZWdpc3RlclN1Y2Nlc3MsXG4gICAgICAgICAgICBlcnJvcjogdGhpcy5yZWdpc3RlckVycm9yXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUucmVnaXN0ZXJTdWNjZXNzID0gZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IGRhdGEuZ290bztcbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUucmVnaXN0ZXJFcnJvciA9IGZ1bmN0aW9uIChqcSwgc3RhdHVzLCBodHRwRXJyb3IpIHtcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InICYmIGh0dHBFcnJvciA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgdGhpcy5zZXRSZWdpc3RlckVycm9yKCdXcm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJFcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicpO1xuICAgIH1cbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuc2V0UmVnaXN0ZXJFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy4kbXNnLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRtc2cuaHRtbChlcnJvcik7XG4gICAgICAgIHRoaXMuJG1zZy5zaG93KCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWdpc3RlclBhZ2U7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2FtZXJUYWdzOiB7XG4gICAgICAgIDE6IFtcbiAgICAgICAgICAgICdzdXBlcicsXG4gICAgICAgICAgICAnYXdlc29tZScsXG4gICAgICAgICAgICAncmFpbmJvdycsXG4gICAgICAgICAgICAnZG91YmxlJyxcbiAgICAgICAgICAgICd0cmlwbGUnLFxuICAgICAgICAgICAgJ3ZhbXBpcmUnLFxuICAgICAgICAgICAgJ3ByaW5jZXNzJyxcbiAgICAgICAgICAgICdpY2UnLFxuICAgICAgICAgICAgJ2ZpcmUnLFxuICAgICAgICAgICAgJ3JvYm90JyxcbiAgICAgICAgICAgICd3ZXJld29sZicsXG4gICAgICAgICAgICAnc3BhcmtsZScsXG4gICAgICAgICAgICAnaW5maW5pdGUnLFxuICAgICAgICAgICAgJ2Nvb2wnLFxuICAgICAgICAgICAgJ3lvbG8nLFxuICAgICAgICAgICAgJ3N3YWdneScsXG4gICAgICAgICAgICAnem9tYmllJyxcbiAgICAgICAgICAgICdzYW11cmFpJyxcbiAgICAgICAgICAgICdkYW5jaW5nJyxcbiAgICAgICAgICAgICdwb3dlcicsXG4gICAgICAgICAgICAnZ29sZCcsXG4gICAgICAgICAgICAnc2lsdmVyJyxcbiAgICAgICAgICAgICdyYWRpb2FjdGl2ZScsXG4gICAgICAgICAgICAncXVhbnR1bScsXG4gICAgICAgICAgICAnYnJpbGxpYW50JyxcbiAgICAgICAgICAgICdtaWdodHknLFxuICAgICAgICAgICAgJ3JhbmRvbSdcbiAgICAgICAgXSxcbiAgICAgICAgMjogW1xuICAgICAgICAgICAgJ3RpZ2VyJyxcbiAgICAgICAgICAgICduaW5qYScsXG4gICAgICAgICAgICAncHJpbmNlc3MnLFxuICAgICAgICAgICAgJ3JvYm90JyxcbiAgICAgICAgICAgICdwb255JyxcbiAgICAgICAgICAgICdkYW5jZXInLFxuICAgICAgICAgICAgJ3JvY2tlcicsXG4gICAgICAgICAgICAnbWFzdGVyJyxcbiAgICAgICAgICAgICdoYWNrZXInLFxuICAgICAgICAgICAgJ3JhaW5ib3cnLFxuICAgICAgICAgICAgJ2tpdHRlbicsXG4gICAgICAgICAgICAncHVwcHknLFxuICAgICAgICAgICAgJ2Jvc3MnLFxuICAgICAgICAgICAgJ3dpemFyZCcsXG4gICAgICAgICAgICAnaGVybycsXG4gICAgICAgICAgICAnZHJhZ29uJyxcbiAgICAgICAgICAgICd0cmlidXRlJyxcbiAgICAgICAgICAgICdnZW5pdXMnLFxuICAgICAgICAgICAgJ2JsYXN0ZXInLFxuICAgICAgICAgICAgJ3NwaWRlcidcbiAgICAgICAgXVxuICAgIH1cbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxudmFyIExvZ2luUGFnZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuJG1zZyA9ICQoJyNsb2dpbi1kaWFsb2cgLm1lc3NhZ2UnKTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDI7IGkrKykge1xuICAgICAgICB2YXIgdGFncyA9IHRoaXMuY29uZmlnLmdhbWVyVGFnc1tpXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGwgPSB0YWdzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgJCgnI2d0JyArIGkpLmFwcGVuZCgnPG9wdGlvbj4nICsgdGFnc1tqXSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5zZWxlY3QnKS5zZWxlY3RtZW51KCk7XG4gICAgJCgnLmxvZ2luYnV0dG9uJykuYnV0dG9uKHtpY29uczoge3ByaW1hcnk6ICd1aS1pY29uLXRyaWFuZ2xlLTEtZSd9fSk7XG4gICAgJCgnLmFjY29yZGlvbicpLmFjY29yZGlvbih7aGVpZ2h0U3R5bGU6ICdjb250ZW50J30pO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQoJyNndWVzdGxvZ2luJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmRvTG9naW4oe1xuICAgICAgICAgICAgc2VydmVyOiAkKCcjc2VydmVyJykudmFsKCksXG4gICAgICAgICAgICB0YWc6ICQoJyNndDEnKS52YWwoKSArICcgJyArICQoJyNndDInKS52YWwoKVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAkKCcjdXNlcmxvZ2luJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmRvTG9naW4oe1xuICAgICAgICAgICAgdXNlcjogJCgnI3VzZXJuYW1lJykudmFsKCksXG4gICAgICAgICAgICBwYXNzOiAkKCcjcGFzc3dvcmQnKS52YWwoKVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUuZG9Mb2dpbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKCFkYXRhLnRhZyAmJiAoZGF0YS51c2VyLmxlbmd0aCA9PT0gMCB8fCBkYXRhLnBhc3MubGVuZ3RoID09PSAwKSkge1xuICAgICAgICB0aGlzLnNldExvZ2luRXJyb3IoJ1BsZWFzZSBlbnRlciBhIHVzZXJuYW1lIGFuZCBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2xvZ2luJyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAvL2NvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICAgICAgc3VjY2VzczogdGhpcy5sb2dpblN1Y2Nlc3MsXG4gICAgICAgICAgICBlcnJvcjogdGhpcy5sb2dpbkVycm9yXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUubG9naW5TdWNjZXNzID0gZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IGRhdGEuZ290bztcbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUubG9naW5FcnJvciA9IGZ1bmN0aW9uIChqcSwgc3RhdHVzLCBodHRwRXJyb3IpIHtcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InICYmIGh0dHBFcnJvciA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgdGhpcy5zZXRMb2dpbkVycm9yKCdXcm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0TG9naW5FcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicpO1xuICAgIH1cbn07XG5cbkxvZ2luUGFnZS5wcm90b3R5cGUuc2V0TG9naW5FcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy4kbXNnLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRtc2cuaHRtbChlcnJvcik7XG4gICAgICAgIHRoaXMuJG1zZy5zaG93KCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2dpblBhZ2U7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxudmFyIFJlZ2lzdGVyUGFnZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuJG1zZyA9ICQoJyNyZWdpc3Rlci1kaWFsb2cgLm1lc3NhZ2UnKTtcblxuICAgIC8vZm9yICh2YXIgaSA9IDE7IGkgPD0gMjsgaSsrKSB7XG4gICAgLy8gICAgdmFyIHRhZ3MgPSB0aGlzLmNvbmZpZy5nYW1lclRhZ3NbaV07XG4gICAgLy8gICAgZm9yICh2YXIgaiA9IDAsIGwgPSB0YWdzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgIC8vICAgICAgICAkKCcjZ3QnICsgaSkuYXBwZW5kKCc8b3B0aW9uPicgKyB0YWdzW2pdICsgJzwvb3B0aW9uPicpO1xuICAgIC8vICAgIH1cbiAgICAvL31cblxuICAgIC8vJCgnLnNlbGVjdCcpLnNlbGVjdG1lbnUoKTtcbiAgICAvLyQoJy5sb2dpbmJ1dHRvbicpLmJ1dHRvbih7aWNvbnM6IHtwcmltYXJ5OiAndWktaWNvbi10cmlhbmdsZS0xLWUnfX0pO1xuICAgICQoJy5hY2NvcmRpb24nKS5hY2NvcmRpb24oe2hlaWdodFN0eWxlOiAnY29udGVudCd9KTtcbiAgICAkKCcjdXNlcnJlZ2lzdGVyJykuYnV0dG9uKHtpY29uczoge3ByaW1hcnk6ICd1aS1pY29uLXRyaWFuZ2xlLTEtZSd9fSk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJCgnI3VzZXJyZWdpc3RlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5kb1JlZ2lzdGVyKHtcbiAgICAgICAgICAgIHVzZXI6ICQoJyN1c2VybmFtZScpLnZhbCgpLFxuICAgICAgICAgICAgcGFzczogJCgnI3Bhc3N3b3JkJykudmFsKClcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuZG9SZWdpc3RlciA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKGRhdGEudXNlci5sZW5ndGggPT09IDAgfHwgZGF0YS5wYXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnNldExvZ2luRXJyb3IoJ1BsZWFzZSBlbnRlciBhIHVzZXJuYW1lIGFuZCBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAvL2NvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICAgICAgc3VjY2VzczogdGhpcy5yZWdpc3RlclN1Y2Nlc3MsXG4gICAgICAgICAgICBlcnJvcjogdGhpcy5yZWdpc3RlckVycm9yXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUucmVnaXN0ZXJTdWNjZXNzID0gZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IGRhdGEuZ290bztcbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUucmVnaXN0ZXJFcnJvciA9IGZ1bmN0aW9uIChqcSwgc3RhdHVzLCBodHRwRXJyb3IpIHtcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InICYmIGh0dHBFcnJvciA9PT0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgdGhpcy5zZXRSZWdpc3RlckVycm9yKCdXcm9uZyB1c2VybmFtZSBvciBwYXNzd29yZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJFcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicpO1xuICAgIH1cbn07XG5cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuc2V0UmVnaXN0ZXJFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy4kbXNnLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRtc2cuaHRtbChlcnJvcik7XG4gICAgICAgIHRoaXMuJG1zZy5zaG93KCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWdpc3RlclBhZ2U7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGpheSBvbiA5LzYvMTUuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2FtZXJUYWdzOiB7XG4gICAgICAgIDE6IFtcbiAgICAgICAgICAgICdzdXBlcicsXG4gICAgICAgICAgICAnYXdlc29tZScsXG4gICAgICAgICAgICAncmFpbmJvdycsXG4gICAgICAgICAgICAnZG91YmxlJyxcbiAgICAgICAgICAgICd0cmlwbGUnLFxuICAgICAgICAgICAgJ3ZhbXBpcmUnLFxuICAgICAgICAgICAgJ3ByaW5jZXNzJyxcbiAgICAgICAgICAgICdpY2UnLFxuICAgICAgICAgICAgJ2ZpcmUnLFxuICAgICAgICAgICAgJ3JvYm90JyxcbiAgICAgICAgICAgICd3ZXJld29sZicsXG4gICAgICAgICAgICAnc3BhcmtsZScsXG4gICAgICAgICAgICAnaW5maW5pdGUnLFxuICAgICAgICAgICAgJ2Nvb2wnLFxuICAgICAgICAgICAgJ3lvbG8nLFxuICAgICAgICAgICAgJ3N3YWdneScsXG4gICAgICAgICAgICAnem9tYmllJyxcbiAgICAgICAgICAgICdzYW11cmFpJyxcbiAgICAgICAgICAgICdkYW5jaW5nJyxcbiAgICAgICAgICAgICdwb3dlcicsXG4gICAgICAgICAgICAnZ29sZCcsXG4gICAgICAgICAgICAnc2lsdmVyJyxcbiAgICAgICAgICAgICdyYWRpb2FjdGl2ZScsXG4gICAgICAgICAgICAncXVhbnR1bScsXG4gICAgICAgICAgICAnYnJpbGxpYW50JyxcbiAgICAgICAgICAgICdtaWdodHknLFxuICAgICAgICAgICAgJ3JhbmRvbSdcbiAgICAgICAgXSxcbiAgICAgICAgMjogW1xuICAgICAgICAgICAgJ3RpZ2VyJyxcbiAgICAgICAgICAgICduaW5qYScsXG4gICAgICAgICAgICAncHJpbmNlc3MnLFxuICAgICAgICAgICAgJ3JvYm90JyxcbiAgICAgICAgICAgICdwb255JyxcbiAgICAgICAgICAgICdkYW5jZXInLFxuICAgICAgICAgICAgJ3JvY2tlcicsXG4gICAgICAgICAgICAnbWFzdGVyJyxcbiAgICAgICAgICAgICdoYWNrZXInLFxuICAgICAgICAgICAgJ3JhaW5ib3cnLFxuICAgICAgICAgICAgJ2tpdHRlbicsXG4gICAgICAgICAgICAncHVwcHknLFxuICAgICAgICAgICAgJ2Jvc3MnLFxuICAgICAgICAgICAgJ3dpemFyZCcsXG4gICAgICAgICAgICAnaGVybycsXG4gICAgICAgICAgICAnZHJhZ29uJyxcbiAgICAgICAgICAgICd0cmlidXRlJyxcbiAgICAgICAgICAgICdnZW5pdXMnLFxuICAgICAgICAgICAgJ2JsYXN0ZXInLFxuICAgICAgICAgICAgJ3NwaWRlcidcbiAgICAgICAgXVxuICAgIH1cbn07Il19
