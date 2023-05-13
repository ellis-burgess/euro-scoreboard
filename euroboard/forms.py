from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.validators import DataRequired

class VotingForm(FlaskForm):
    douze =  SelectField('Douze Points', choices=[
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
                         ], validators=[DataRequired()])
