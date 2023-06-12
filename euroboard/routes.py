from flask import Flask, render_template, url_for, request, jsonify, redirect, flash
from euroboard import app
import requests
from euroboard.forms import RegistrationForm, LoginForm

@app.route("/", methods=['GET', 'POST'])
def index():
    form = LoginForm()
    if form.validate_on_submit():
        user = requests.get(
            'http://dreamlo.com/lb/645fa8768f40bb7d84d59e27/pipe-get/'
            + form.username.data + '-UN')
        if user is '':
            flash('Invalid username.')
        elif form.password.data != user.text.split("|")[3]:
            flash('Incorrect password.')
        else:
            # login_user(user)
            flash('You have been logged in.')
            return redirect(url_for('rate'))
    return render_template('index.html', title='Login', form=form)

@app.route("/rate")
def rate():
    return render_template('rate.html', title='Voting Time!')

@app.route("/results")
def results():
    return render_template('results.html', title='Individual Results')

@app.route("/all_results")
def all_results():
    return render_template('all_results.html', title="Total Results")

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        requests.get('\
            http://dreamlo.com/lb/wPDIvBSjh0STdkNKpu0UOgFTezEMQb30C2W6AqK'
            + 'P7Ncw/add/' + form.username.data + '-UN/0/0/'
            + form.password.data)
        flash('Registration successful!')
    return render_template('register.html', title='Register', form=form)
