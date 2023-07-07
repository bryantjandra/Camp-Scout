const cities = require("./cities")
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const {places, descriptors} = require("./seedHelpers.js");
const axios = require("axios")

mongoose.connect('mongodb://127.0.0.1:27017/camp-scout',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
})

const sample = (array) => array[Math.floor(Math.random()*array.length)]
async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'pdAIMOq7qNaRK67COaGMo_iHaZ6B15oDCyc3WGX8_HU',
          collections: 1114848,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }
  const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 20; i++) {
      // setup
      const placeSeed = Math.floor(Math.random() * places.length)
      const descriptorsSeed = Math.floor(Math.random() * descriptors.length)
      const citySeed = Math.floor(Math.random() * cities.length)
      const price = Math.floor(Math.random() * 20) + 10;
   
      // seed data into campground
      const camp = new Campground({
        author:"64a59e5293b36226bb354bfd",
        location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
        title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
        imageUrl: [
          {
            url: 'https://res.cloudinary.com/ds665bpgo/image/upload/v1688738169/CampScout/ltmempqamcjf5e3xeuw7.png',
            filename: 'CampScout/ltmempqamcjf5e3xeuw7',
          },
          {
            url: 'https://res.cloudinary.com/ds665bpgo/image/upload/v1688738207/CampScout/wtvinuufb1pct0ws7gsf.png',
            filename: 'CampScout/wtvinuufb1pct0ws7gsf',
          },
          {
            url: 'https://res.cloudinary.com/ds665bpgo/image/upload/v1688738191/CampScout/sax1ydsvopndhkf3fwuz.png',
            filename: 'CampScout/sax1ydsvopndhkf3fwuz',
          }
        ],
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
          price
      })
   
      await camp.save()
    }
  }
seedDB().then(()=>{
    mongoose.connection.close();
})