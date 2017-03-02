//all available cuisine from the whole dataset and sort them in alphabetical order



db.getCollection('restaurants').distinct("cuisine").sort()



//all available cuisine from the restaurants that are located on Cross Bay Boulevard and whose address uses zip code 11414


db.getCollection('restaurants').find({"address.street": "Cross Bay Boulevard", "address.zipcode": "11414"})


//name and address of the Steak House owned by Willie (Hint: You may want to use regular expression).


db.getCollection('restaurants').find({name: {$regex: "Willie"}})


//name of all restaurants which contain the word Pizza in the cuisine but DO NOT contain the word Pizza or Pizzeria in the restaurant name


db.getCollection('restaurants').find(
{cuisine: {$regex: "Pizza"},
$and: [
{name: {$not: /Pizza/} },
{name: {$not: /Pizzeria/} }
]})


//List out the name of all straight A (i.e. the restaurant has only received A grade ever) restaurants which contain the word Pizza in the cuisine and are located in the Queens borough


db.getCollection('restaurants').find(
{$and: [
	{'grades.grade': {$not: /B/}},
	{'grades.grade': {$not: /Z/}},
	{'grades.grade': {$not: /C/}},
	{'grades.grade': {$not: /P/}},
	{'grades.grade': {$not: /Not Yet Graded/}},
	{cuisine: "Pizza"},
	{borough: "Queens"}
]})


//Find the number of restaurants listed Hamburgers as their main cuisine.


db.getCollection('restaurants').find({cuisine: "Hamburgers"}).count()


// how many restaurants listed Hamburgers as their main cuisine in the Manhattan borough


db.getCollection('restaurants').find({cuisine: "Hamburgers", borough: "Manhattan"}).count()


//Let's have something nice and get rid of the McDonald's in the results. Find how many restaurants listed Hamburgers as their main cuisine in Manhattan and exclude all Mcdonald's (Note: In the data set, McDonald's was presented in inconsistent ways, e.g. McDonald's and McDonald'S. So please use the regular expression /McDonald/ in your query)


db.getCollection('restaurants').find(
{$and: [
	{cuisine: "Hamburgers"},
	{borough: "Manhattan"},
	{name: {$not: /Mcdonald/}},
	{name: {$not: /Burger King/}}
]})


//There are still plenty of choices. Maybe you should just pick one closer to your home. Find out the list of distinct street based on the results of Question 4

db.getCollection('restaurants').distinct("address.street",
{$and: [
	{cuisine: "Hamburgers"},
	{borough: "Manhattan"},
	{name: {$not: /Mcdonald/}},
	{name: {$not: /Burger King/}}
]})

//Alright, you are just a block away from Pearl Street. Find the name of the Hamburger restaurant (i.e. your query should return the name of the restaurant only) on Pearl Street. Your query should now yield exactly one restaurant. What is it? (Submit the query and also the name of the restaurant as a comment)

db.getCollection('restaurants').find({"address.street": "Pearl Street", cuisine: "Hamburgers"})


//Find the name of the restaurants which listed Japanese as their main cuisine and have exactly 9 grades.

db.getCollection('restaurants').find({cuisine: "Japanese", "grades.grade": {$size: 9}})

