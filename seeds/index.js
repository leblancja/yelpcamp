const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const name = `${sample(descriptors)} ${sample(places)}`;
        const camp = new Campground({
            author: '65cd941d7406de60c9666164',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: name,
            images: [{
                url: 'https://images.unsplash.com/photo-1490805981889-3fdd44cec18a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODMyNTF8fHx8fHx8MTcwODI5NjQxNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
                filename: `YelpCamp/${name}1`
            },
            {
                url: 'https://images.unsplash.com/photo-1445888985293-8e1b904061c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODMyNTF8fHx8fHx8MTcwODI5NjM5Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
                filename: `YelpCamp/${name}2`
            },
            {
                url: 'https://images.unsplash.com/photo-1483917841983-f83104f9ffa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODMyNTF8fHx8fHx8MTcwODI5NjM2Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
                filename: `YelpCamp/${name}3`
            }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe doloribus quos dolor ad animi, repellat vitae labore, quod nesciunt sed ab blanditiis ipsum ducimus ullam aliquid laudantium inventore a vero illum sapiente accusamus libero voluptatibus ipsam fugiat. Blanditiis, sit amet magni vel ipsa alias enim, dignissimos minus, officia fugiat voluptates.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude 
                ] 
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})