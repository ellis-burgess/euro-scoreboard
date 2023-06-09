from flask import Flask, render_template, url_for, request, jsonify, redirect, flash, session
from euroboard import app, hashing
import requests
from euroboard.forms import RegistrationForm, LoginForm

@app.route("/", methods=['GET', 'POST'])
def index():
    if 'username' in session:
        return redirect(url_for('all_results'))
    form = LoginForm()
    if form.validate_on_submit():
        user = requests.get(
            'http://dreamlo.com/lb/645fa8768f40bb7d84d59e27/pipe-get/'
            + form.username.data + '-UN')
        if user == '':
            flash('Invalid username.')
        elif not hashing.check_value(user.text.split("|")[3],
            form.password.data, salt=form.username.data):
            flash('Incorrect password.')
        else:
            session['username'] = form.username.data
            flash('You have been logged in.')
            return redirect(url_for('rate'))
    return render_template('index.html', title='Login', form=form)

@app.route("/rate")
def rate():
    if 'username' in session:
        return render_template('rate.html', title='Voting Time!')
    else:
        flash('You must be logged in to submit ratings!')
        return redirect(url_for('index'))

@app.route("/results")
def results():
    return render_template('results.html', title='Individual Results')

@app.route("/all_results")
def all_results():
    return render_template('all_results.html', title="Total Results")

@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'username' in session:
        flash('You can\'t register when you\'re already logged in!')
        return redirect(url_for('all_results'))
    form = RegistrationForm()
    if request.method == 'POST' and form.validate():
        hash_password = hashing.hash_value(form.password.data,
            salt=form.username.data)
        requests.get('\
            http://dreamlo.com/lb/wPDIvBSjh0STdkNKpu0UOgFTezEMQb30C2W6AqK'
            + 'P7Ncw/add/' + form.username.data + '-UN/0/0/'
            + hash_password)
        session['username'] = form.username.data
        flash('Registration successful! You are now logged in')
        return redirect(url_for('rate'))
    return render_template('register.html', title='Register', form=form)

@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out.')
    return redirect(url_for('index'))
