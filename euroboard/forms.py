from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SubmitField, HiddenField
from wtforms.validators import DataRequired, ValidationError, Regexp, EqualTo
import requests

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(),
        Regexp('^[a-z0-9]{5,15}$',
        message = 'Your username should be between 5 and 15 characters long, \
        and can only contain lower case letters or numbers.')])
    password = PasswordField('Password', validators=[DataRequired(),
        EqualTo('confirm_password',
        message = 'Passwords do not match. Please try again.'),
        Regexp('(^\w{6,20}$)',
        message = 'Your password should be between 6 and 20 characters long, \
        and can only contain letters, numbers, and underscores.')])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired()])
    submit = SubmitField('Register')

    def validate_username(self, username):
        """Checks if input username already exists; if it does, asks new user to select a new username"""
        user = requests.get(
            'http://dreamlo.com/lb/645fa8768f40bb7d84d59e27/pipe-get/' + username.data
            + '-UN')
        user = user.text
        print(user)
        if user is not '':
            raise ValidationError(
                'Username already exists. Please choose a different one.')

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
