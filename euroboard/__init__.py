from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['API_ROUTE'] = 'http://dreamlo.com/lb/0diIJCYnfk2_0Nf6qHou4QVbH4wf7jZUemwMcMNawWww'
app.config['API_ROUTE_2'] = 'http://dreamlo.com/lb/645fc5028f40bb7d84d5d700/'

from euroboard import routes