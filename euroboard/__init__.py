from flask import Flask
import json

app = Flask(__name__)

@app.context_processor
def inject_eurovision_entries():
    entries = [
        'Austria: Who The Hell Is Edgar?',
        'Portugal: Ai Coração',
        'Switzerland: Watergun',
        'Poland: Solo',
        'Serbia: Samo Mi Se Spava',
        'France: Évidemment',
        'Cyprus: Break A Broken Heart',
        'Spain: EAEA',
        'Sweden: Tattoo',
        'Albania: Duje',
        'Italy: Due Vite',
        'Estonia: Bridges',
        'Finland: Cha Cha Cha',
        'Czechia: My Sister\'s Crown',
        'Australia: Promise',
        'Belgium: Because Of You',
        'Armenia: Future Lover',
        'Moldova: Soarele si Luna',
        'Ukraine: Heart of Steel',
        'Norway: Queen of Kings',
        'Germany: Blood & Glitter',
        'Lithuania: Stay',
        'Israel: Unicorn',
        'Slovenia: Carpe Diem',
        'Croatia: ŠĆ!',
        'United Kingdom: I Wrote A Song'
    ]
    scores = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]

    return dict(entries=json.dumps(entries),
        scores=json.dumps(scores))

app.config['SECRET_KEY'] = 'mysecretkey'
app.config['API_ROUTE'] = 'http://dreamlo.com/lb/0diIJCYnfk2_0Nf6qHou4QV\
    bH4wf7jZUemwMcMNawWww'
app.config['API_ROUTE_2'] = 'http://dreamlo.com/lb/645fc5028f40bb7d84d5d700/'

from euroboard import routes
