from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['API_ROUTE'] = 'http://dreamlo.com/lb/wPDIvBSjh0STdkNKpu0UOgFTezEMQb30C2W6AqKP7Ncw'

from euroboard import routes