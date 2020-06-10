const express = require('express'); // importando o express
const mongoose = require('mongoose'); // Importando o mongoose
const cors = require('cors');
const routes = require('./routes');

const app = express(); 

mongoose.connect('mongodb+srv://julia:julia@cluster0-iemjp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()); // Express agora consegue entender requisições cujo corpo é json
app.use(routes);

app.listen(3333); // define qual porta será ligada

