from faker import Faker
import random
import pandas as pd

# initialising the faker module
fake = Faker()

# specify the number of users, petowners, pets, caretakers and services
# number of users >= petowners + caretakers
# number of pets >= petowners (one petowner to many pets)
# number of services >= caretakers (one caretakers to many services)
no_users = 100
no_petowners = 60
no_pets = 70
no_caretakers = 40
no_services = 60
no_bids = 200

# creating users table
users = pd.DataFrame({'uid': range(1, 1 + no_users)})
users['name'] = users['uid'].apply(lambda x: fake.name())
users['email'] = users['uid'].apply(lambda x: fake.email())
users['password'] = users['uid'].apply(lambda x: fake.password(length=10, 
                                                                special_chars=True, 
                                                                digits=True, 
                                                                upper_case=True, 
                                                                lower_case=True))
users['lastlogintimestamp'] = users['uid'].apply(lambda x: fake.date_time_between(start_date='-1y', 
                                                                                    end_date='now'))

# create pet_owners table
pet_owners = users[:no_petowners][['uid','name']]
pet_owners['desription'] = pet_owners.apply(lambda x: fake.sentence(nb_words=5, 
                                                                    variable_nb_words=True,
                                                                    ext_word_list=None))


care_takers = users[no_caretakers:][['uid','name']]

pets = pd.DataFrame({'pid': range(1, 1+no_pets)})
pets['oid'] = pet_owners.sample(len(pets), replace = True).index

services = pd.DataFrame({'sid':range(1, 1+no_services)})
services['cid'] = care_takers.sample(len(services), replace = True).index

bids = pd.DataFrame({'bid_id':range(1, 1+no_bids)})
# print(pets.sample(len(bids), replace= True))
# bids.assign(pets.index.sample(len(bids), replace= True))
# bids[['ServiceID','CareTakerID']] = services.sample(len(bids), replace= True).index

# print(bids.head(20))

# for i in range(50):
# 	print('(\'{}\', \'{}\', {}, \'{}\', {}, {}, {}, {}, {}, \'{}\'),'.format(
# 		fake.date_between(start_date="-30d", end_date="today"),
# 		fake.date_between(start_date="today", end_date="+30d"),
# 		fake.credit_card_security_code(card_type=None),
# 		fake.date_time_between(start_date="-60d", end_date="-30d"),
# 		random.randint(1,100),
# 		random.randint(1000,9999),
# 		random.randint(100,999),
# 		random.randint(100,999),
# 		random.randint(1,99),
# 		fake.sentence(nb_words=6, variable_nb_words=True, ext_word_list=None)))