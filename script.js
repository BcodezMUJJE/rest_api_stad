const express = require('express'); //Import Express
const Joi = require('joi'); //Import Joi
const app = express(); //Create Express Application on the app variable
app.use(express.json()); //used the json file

//Give data the server
const customers = [
	{title: 'George', id: 1},
	{title: 'Josh', id: 2},
	{title: 'Tyler', id: 3},
	{title: 'Alice', id: 4},
	{title: 'Candice', id: 5},
]

//Read Request Handlers
//Display the message when the URL consis of '/'
app.get('/', (req, res) => {
	res.send('Welcome to Billz REST API!');
})

//Display the List Of Customers when URL consists of api customers
app.get('/api/customers', (req, res) => {
	res.send(customers);
});
//Display the Information Of Specific Customers when you mention the id.
app.get('/api/customers/:id', (req, res) => {
	const customer = customers.find(c => c.id === parseInt(req.params.id));
//If there is no valid customer ID, then display an error with the following message
	if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darked;"> Ooops... Can not find what your looking for!</h2>');
	res.send(customers);
});

//CREATE Request Handler
//CREATE New Customer Information
app.post('/api/customers', (req, res) => {

	const { error } = validateCustomer(req.body);
	if (error){
		res.status(400).send(error.details[0].message)
		return;
	}
	//Increment the customer id
	const customer = {
		id: customers.length + 1,
		title: req.body.title
	};
	customers.push(customers);
	res.send(customer);
});

//Update Request Handler
//Update Existing Customer Information
app.put('/api/customer/:id', (req, res) => {
	const customer = customers.find(c=> c.id === parseInt(req.params.id));
	if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darked;">Not Found!!</h2>');

	const { error } = validateCustomer(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	customer.title = req.body.title;
	res.send(customer);
});

//Delete Request Handler
//Delete Customer Details
app.delete('/api/customers/:id', (req, res) => {

	const customer = customers.find( c=> c.id === parseInt(req.params.id));
	if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darked;">Not Found!!</h2>');

	const index = customer.indexOf(customer);
	customer.splice(index,1);

	res.send(customer);
});

//Validate Information
function validateCustomer(customer) {

	const schema = {
		title: Joi.string().min(3).required()
	};
	return Joi.validate(customer, schema);
}

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
