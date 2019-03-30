from faker import Faker
import random
import pandas as pd
from sqlalchemy import create_engine
import pandas.io.sql as psql

engine = create_engine('postgresql://postgres@localhost:5432/postgres')

sql_script = open("pets.sql", "r")
sql = sql_script.read()
engine.connect().execute(sql)

# initialising the faker module
fake = Faker()

# specify the number of users, petowners, pets, caretakers and services
# number of users >= petowners + caretakers
# number of pets >= petowners (one petowner to many pets)
# number of services >= caretakers (one caretakers to many services)
no_users = 230
no_petowners = 60
no_pets = 70
no_caretakers = 40
no_services = 60
no_bids = 200

# creating users table
users = pd.DataFrame({'id': range(1, 1 + no_users)})
users['name'] = users['id'].apply(lambda x: fake.name())
users['email'] = users['id'].apply(lambda x: fake.email())
users['password'] = users['id'].apply(lambda x: fake.password(length=10, 
                                                                special_chars=True, 
                                                                digits=True, 
                                                                upper_case=True, 
                                                                lower_case=True))
users['lastlogintimestamp'] = users['id'].apply(lambda x: fake.date_time_between(start_date='-1y', 
                                                                                    end_date='now'))
users_df = users.set_index(keys='id', drop = True)
users_df.to_sql('users', engine, if_exists='append')

# create pet_owners table
pet_owners = users[:no_petowners][['id','name']].rename(columns ={'id':'oid','name':'owner_name'})
pet_owners['description'] = pet_owners['oid'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                            variable_nb_words=True,
                                                                            ext_word_list=None))
pet_owners_df = pet_owners.set_index(keys='oid', drop = True)
pet_owners_df.to_sql('petowners', engine, if_exists='append')


# create care_takers table
care_takers = users[no_caretakers:][['id','name']].rename(columns={'id':'cid'})
care_takers['description'] = care_takers['cid'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                        variable_nb_words=True,
                                                                        ext_word_list=None))
care_takers['pettype'] = care_takers['cid'].apply(lambda x: fake.word(ext_word_list=['Dog','Cat','Rabbit']))
care_takers['petsize'] = care_takers['cid'].apply(lambda x: random.randint(1,6))
care_takers['numofpet'] = care_takers['cid'].apply(lambda x: random.randint(1,8))
care_takers['housingoptions'] = care_takers['cid'].apply(lambda x: random.randint(1,6))
care_takers['miscoptions'] = care_takers['cid'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                                variable_nb_words=True,
                                                                                ext_word_list=None))
care_takers_df = care_takers.set_index(keys='cid', drop = True)
care_takers_df.to_sql('caretaker', engine, if_exists='append')

def pet_breed(x):
    if x == 'Dog':
        return fake.word(ext_word_list=['Husky','Poodle','Corgi','Terrier','Shitzu'])
    else:
        return 'Others'

# create pets table
pets = pd.DataFrame({'petid': range(1, 1+no_pets)})
pets['oid'] = pet_owners['oid'].sample(len(pets), replace = True).values
pets['name'] = pets['oid'].apply(lambda x: fake.first_name())
pets[['weight','age']] = pets['oid'].apply(lambda x: pd.Series([random.randint(1,6),
                                                                random.randint(1,6)]))
pets['pettype'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Dog','Cat','Rabbit']))
pets['breed'] = pets['pettype'].apply(pet_breed)
pets['description'] = pets['oid'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                        variable_nb_words=True,
                                                                        ext_word_list=None))
pets['gender'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Male','Female']))
pets['medical_conditions'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Null','Chocolate','Teething']))
pets_df = pets.set_index(keys='petid', drop = True)
pets_df.to_sql('pets', engine, if_exists='append')

# create services table
services = pd.DataFrame({'serviceid':range(1, 1+no_services)})
services['cid'] = care_takers['cid'].sample(len(services), replace = True).values
services['rate'] = services['cid'].apply(lambda x: random.randint(10,50))
services['service'] = services['cid'].apply(lambda x: fake.word(ext_word_list=['Sitting','Visiting Vet','Washing','Walking']))
services['startdate'] = services['cid'].apply(lambda x: fake.date())
services['enddate'] = services['cid'].apply(lambda x: fake.date())
services_df = services.set_index(keys='serviceid', drop = True)
services_df.to_sql('services', engine, if_exists='append')

# create bid table
bids = pd.DataFrame({'bidid':range(1, 1+no_bids)}).set_index(keys='bidid')
bids['petid'] = pets_df.sample(len(bids), replace = True).index
bids['servicestartdate'] = bids['petid'].apply(lambda x: fake.date())
bids['serviceenddate'] = bids['petid'].apply(lambda x: fake.date())
bids['bidtimestamp'] =  bids['petid'].apply(lambda x: fake.date_time())
bids['bidamount'] = bids['petid'].apply(lambda x: random.randint(10,50))
bids['petownerid'] = bids['petid'].apply(lambda x: pets[pets['petid'] == x]['oid'].values[0])
bids['serviceid'] = services['serviceid'].sample(len(bids), replace = True).values
bids['caretakerid'] = bids['serviceid'].apply(lambda x: services[services['serviceid'] == x]['cid'].values[0])
bids['bidrequest'] = bids['petid'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                variable_nb_words=True,
                                                                ext_word_list=None))
bids['bidstatus'] = bids['petid'].apply(lambda x: fake.word(ext_word_list=['pending','accept','reject']))
bids.to_sql('bid', engine, if_exists='append')