from faker import Faker
import random
import pandas as pd
from sqlalchemy import create_engine
import pandas.io.sql as psql
from datetime import date, timedelta

engine = create_engine('postgresql://postgres@localhost:5432/postgres')

sql_script = open("pets.sql", "r")
sql = sql_script.read()
engine.connect().execute(sql)

# initialising the faker module
fake = Faker()
fake.seed(4321)

# specify the number of users, petowners, pets, caretakers and services
# number of users >= petowners + caretakers
# number of pets >= petowners (one petowner to many pets)
# number of services >= caretakers (one caretakers to many services)
no_users = 500
no_petowners = 250
no_pets = 300
no_caretakers = 250
no_services = 280
no_bids = 500
no_homes = 600

# creating home table
home = pd.DataFrame({'id' :range(1, no_homes +1)})
home['address'] = home['id'].apply(lambda x: fake.street_address())
home['postcode'] = home['id'].apply(lambda x: fake.postalcode()).astype(int)
home['hometype'] = home['id'].apply(lambda x: fake.word(ext_word_list=['Bungalow','Semi-D','Terrace','Condominium','Flat','Apartment']))
home_df = home.set_index(keys='id', drop = True)
home_df.to_sql('homes', engine, if_exists='append')


# creating admin table
admin = pd.DataFrame({'id': [0]})
admin['name'] = 'admin'
admin['email'] = 'admin@admin.com'
admin['password'] = 'cs2102rocks'
admin['lastlogintimestamp'] = admin['id'].apply(lambda x: fake.date_time_between(start_date='-200d', 
                                                                                    end_date='now'))

# creating users table
users = pd.DataFrame({'id': range(1+ no_users, 1 + 2*no_users)})
users['name'] = users['id'].apply(lambda x: fake.name())
users['email'] = users['id'].apply(lambda x: fake.email())
users['password'] = users['id'].apply(lambda x: fake.password(length=10, 
                                                                special_chars=True, 
                                                                digits=True, 
                                                                upper_case=True, 
                                                                lower_case=True))
users['lastlogintimestamp'] = users['id'].apply(lambda x: fake.date_time_between(start_date='-200d', 
                                                                                    end_date='now'))
users['description'] = users['id'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                variable_nb_words=True,
                                                                ext_word_list=None))                                                                          
users= users.append(admin)
users['homeid'] = home['id'].sample(len(users),replace=True).values                                                                               
users_df = users.set_index(keys='id', drop = True)
users_df.to_sql('users', engine, if_exists='append')

admin_df = admin.set_index(keys='id', drop = True)
admin_df.to_sql('admins', engine, if_exists='append')

# create pet_owners table
pet_owners = users[:no_petowners][['id','name']].rename(columns ={'id':'oid','name':'owner_name'})
pet_owners_df = pet_owners.set_index(keys='oid', drop = True)
pet_owners_df.to_sql('petowners', engine, if_exists='append')


# create care_takers table
care_takers = users[no_caretakers:][['id','name']].rename(columns={'id':'cid'})
care_takers['pettype'] = care_takers['cid'].apply(lambda x: fake.word(ext_word_list=['Dog','Cat','Rabbit']))
care_takers['petsize'] = care_takers['cid'].apply(lambda x: random.randint(1,4))
care_takers['numofpet'] = care_takers['cid'].apply(lambda x: random.randint(1,8))
care_takers['housingoptions'] = care_takers['cid'].apply(lambda x: random.randint(0,3))
care_takers['miscoptions'] = care_takers['cid'].apply(lambda x: random.randint(0,3))
care_takers_df = care_takers.set_index(keys='cid', drop = True)
care_takers_df.to_sql('caretaker', engine, if_exists='append')

def pet_breed(x):
    if x == 'Dog':
        return fake.word(ext_word_list=['Husky','Poodle','Corgi','Terrier','Shitzu'])
    else:
        return 'Others'

# create pets table
pets = pd.DataFrame({'petid': range(1, 1 + no_pets)})
pets['oid'] = pet_owners['oid'].sample(len(pets), replace = True).values
pets['name'] = pets['oid'].apply(lambda x: fake.name())
pets[['weight','age']] = pets['oid'].apply(lambda x: pd.Series([random.randint(1,6),
                                                                random.randint(1,6)]))
pets['pettype'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Dog','Cat','Rabbit']))
pets['breed'] = pets['pettype'].apply(pet_breed)
pets['description'] = pets['oid'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                        variable_nb_words=True,
                                                                        ext_word_list=None))
pets['gender'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Male','Female']))
pets['medical_conditions'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Null','Chocolate','Teething']))
pets['image1'] = 'https://placeimg.com/640/480/animals'
pets['image2'] = 'https://placeimg.com/640/480/animals'
pets['image3'] = 'https://placeimg.com/640/480/animals'
pets_df = pets.drop(columns=['petid']).set_index(keys = ['name','oid'], drop=True)
# pets_df = pets.set_index(keys='petid', drop = True)
pets_df.to_sql('pets', engine, if_exists='append')

# create services table
services = pd.DataFrame({'serviceid':range(1,1+no_services)})
services['cid'] = care_takers['cid'].sample(len(services), replace = True).values
services['rate'] = services['cid'].apply(lambda x: random.randint(10,50))
services['service'] = services['cid'].apply(lambda x: fake.word(ext_word_list=["Pet Boarding", "Washing", "Walking", "Feeding", "Vet Visitation", "Overnight", "Drop In Visits","Pet Day Care"]))
services['startdate'] = services['cid'].apply(lambda x: fake.date_between(start_date='-100d', end_date='+100d'))
services['enddate'] = services['startdate'].apply(lambda x: x + timedelta(days = random.randint(30,90)))
services_df = services.drop(columns=['serviceid']).set_index(keys = ['service','cid','startdate'], drop=True)
services_df.to_sql('services', engine, if_exists='append')

# create bid table
bids = pd.DataFrame({'bidid':range(1, 1+no_bids)})
bids['petid'] = pets['petid'].sample(len(bids), replace = True).values
bids['petname'] = bids['petid'].apply(lambda x: pets[pets['petid'] == x]['name'].values[0])
bids['petownerid'] = bids['petid'].apply(lambda x: pets[pets['petid'] == x]['oid'].values[0])
bids['bidamount'] = bids['bidid'].apply(lambda x: random.randint(10,50))
bids['serviceid'] = services['serviceid'].sample(len(bids), replace = True).values
bids['caretakerid'] = bids['serviceid'].apply(lambda x: services[services['serviceid'] == x]['cid'].values[0])
bids['service'] = bids['serviceid'].apply(lambda x: services[services['serviceid'] == x]['service'].values[0])
bids['startdate'] = bids['serviceid'].apply(lambda x: services[services['serviceid'] == x]['startdate'].values[0])
bids['bidrequest'] = bids['bidid'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                variable_nb_words=True,
                                                                ext_word_list=None))
bids['bidstatus'] = bids['bidid'].apply(lambda x: fake.word(ext_word_list=['pending','accept','reject']))
bids['servicestartdate'] = bids['startdate'].apply(lambda x: x +timedelta(days = random.randint(1,15)))
bids['serviceenddate'] = bids['servicestartdate'].apply(lambda x: x + timedelta(days =  random.randint(5,15)))
bids['bidtimestamp'] =  bids['servicestartdate'].apply(lambda x: x - timedelta(days =  random.randint(10,20)))
bids['statustimestamp'] = bids['bidtimestamp']
bids.drop(columns=['petid','serviceid'], inplace= True)
bids_df = bids.set_index(keys= ['bidid','petownerid','caretakerid'],drop=True)
bids_df.to_sql('bid', engine, if_exists='append')