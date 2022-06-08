import eel
import string
import random

# Doesn't work in replit for some reason, but works perfectly in PyCharm. I have not tried VSCode or any other editor/IDE 
# list of all characters
characters = list(string.digits + string.ascii_letters + string.punctuation)
# list of all uppercase letters
uppercase = list(string.ascii_uppercase)
# list of all lowercase letters
lowercase = list(string.ascii_lowercase)
# list of all numbers
numbers = list(string.digits)
# list of all symbols
symbols = list(string.punctuation)

# expose the function so it can be used in web/app.js
@eel.expose
def generate_password(length, upper, lower, number, symbol):
    # length = int(input("Enter password length: "))
    # turn the length value into an int. The data will come from JS as a string so must be converted
    length = int(length)
  # create empty password array/list, and empty seqs
    password = list()
    seqs = list()
  # upper, lower, number and symbol values from JS will be boolean
  # so, if the user has ticked the 'uppercase' checkbox, merge the 
  # seqs list with the uppercase list. Keep doing this if values are true
    if upper:
        seqs = seqs + uppercase
    if lower:
        seqs = seqs + lowercase
    if number:
        seqs = seqs + numbers
    if symbol:
        seqs = seqs + symbols
    # shuffle the seqs list so that it won't be all numbers, then all letters etc
    random.shuffle(seqs)
    # use the length variable to loop
    for i in range(length):
        # on each loop iteration, randomly select 1 character from the seqs list
        password.append(random.choice(seqs))
    #     THE FOLLOWING WORKS, BUT WOULD BE FAR TOO MANY ELIFs FOR ALL THE POSSIBILITIES
    # if upper and lower and number and symbol:
    #     random.shuffle(characters)
    #     for i in range(length):
    #         password.append(random.choice(characters))
    #
    # elif upper and lower and number and not symbol:
    #     seqs = [uppercase, lowercase, numbers]
    #     for j in range(length):
    #         password.append(random.choice(random.choices(seqs, weights=map(len, seqs))[0]))
    #
    # elif upper and lower and not number and not symbol:
    #     seqs = [uppercase, lowercase]
    #     for k in range(length):
    #         password.append(random.choice(random.choices(seqs, weights=map(len, seqs))[0]))
    # for good measure, shuffle the password
    random.shuffle(password)
  # return the password as a list. Then in JS, we will join it together
    return password

# start the HTML doc
eel.init('web')
eel.start('index.html')
