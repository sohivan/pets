from faker import Faker
import random
import pandas as pd
from sqlalchemy import create_engine
import pandas.io.sql as psql

engine = create_engine('postgresql://postgres@localhost:5432/postgres')

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

sql = """
        DROP TABLE if exists users cascade;
        DROP TABLE if exists PetOwners cascade;
        DROP TABLE if exists Pets cascade;
        DROP TABLE if exists Homes cascade;
        DROP TABLE if exists Bid cascade;
        DROP TABLE if exists History cascade;
        DROP TABLE if exists CareTaker cascade;
        DROP TABLE if exists Services cascade;
        DROP TABLE if exists admins cascade;"""

engine.connect().execute(sql)
users_df.to_sql('users', engine, if_exists='replace')

# create pet_owners table
pet_owners = users[:no_petowners][['id','name']].rename(columns ={'id':'oid',
                                                                    'name':'onwer_name'})
pet_owners['desription'] = pet_owners['oid'].apply(lambda x: fake.sentence(nb_words=5, 
                                                                            variable_nb_words=True,
                                                                            ext_word_list=None))
pet_owners.to_sql('PetOwners', engine, if_exists='replace')


# # create care_takers table
# care_takers = users[no_caretakers:][['id','name']].rename(columns={'id':'cid'})
# care_takers['description'] = care_takers['cid'].apply(lambda x: fake.sentence(nb_words=5, 
#                                                                         variable_nb_words=True,
#                                                                         ext_word_list=None))
# care_takers['PetType'] = care_takers['cid'].apply(lambda x: fake.word(ext_word_list=['Dog','Cat','Rabbit']))
# care_takers['PetSize'] = care_takers['cid'].apply(lambda x: random.randint(1,6))
# care_takers['NumOfPet'] = care_takers['cid'].apply(lambda x: random.randint(1,8))
# care_takers['housingOptions'] = care_takers['cid'].apply(lambda x: random.randint(1,6))
# care_takers['miscOptions'] = care_takers['cid'].apply(lambda x: fake.sentence(nb_words=5, 
#                                                                                 variable_nb_words=True,
#                                                                                 ext_word_list=None))

# def pet_breed(x):
#     if x == 'Dog':
#         return fake.word(ext_word_list=['Husky','Poodle','Corgi','Terrier','Shitzu'])
#     else:
#         return 'Others'

# # create pets table
# pets = pd.DataFrame({'pid': range(1, 1+no_pets)})
# pets['oid'] = pet_owners['oid'].sample(len(pets), replace = True).index
# pets['name'] = pets['oid'].apply(lambda x: fake.first_name())
# pets[['weight','age']] = pets['oid'].apply(lambda x: pd.Series([random.randint(1,6),
#                                                                 random.randint(1,6)]))
# pets['PetType'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Dog','Cat','Rabbit']))
# pets['breed'] = pets['PetType'].apply(pet_breed)
# pets['description'] = pets['oid'].apply(lambda x: fake.sentence(nb_words=5, 
#                                                                         variable_nb_words=True,
#                                                                         ext_word_list=None))
# pets['gender'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Male','Female']))
# pets['medical_conditions'] = pets['oid'].apply(lambda x: fake.word(ext_word_list=['Null','Chocolate','Teething']))

# # create services table
# services = pd.DataFrame({'serviceid':range(1, 1+no_services)})
# services['cid'] = care_takers['cid'].sample(len(services), replace = True).index
# services['Rate'] = services['cid'].apply(lambda x: random.randint(10,50))
# # services['Service'] = services['cid'].apply(lambda x: )

# bids = pd.DataFrame({'bid_id':range(1, 1+no_bids)})
# # print(pets.sample(len(bids), replace= True))
# # bids.assign(pets.index.sample(len(bids), replace= True))
# # bids[['ServiceID','CareTakerID']] = services.sample(len(bids), replace= True).index

# # print(bids.head(20))

# # for i in range(50):
# # 	print('(\'{}\', \'{}\', {}, \'{}\', {}, {}, {}, {}, {}, \'{}\'),'.format(
# # 		fake.date_between(start_date="-30d", end_date="today"),
# # 		fake.date_between(start_date="today", end_date="+30d"),
# # 		fake.credit_card_security_code(card_type=None),
# # 		fake.date_time_between(start_date="-60d", end_date="-30d"),
# # 		random.randint(1,100),
# # 		random.randint(1000,9999),
# # 		random.randint(100,999),
# # 		random.randint(100,999),
# # 		random.randint(1,99),
# # 		fake.sentence(nb_words=6, variable_nb_words=True, ext_word_list=None)))