const express = require('express');
const routes = require('./routes/worldcup');
const cors = require('cors');
const app = express();


app.use(express.json({
  type: "*/*"
}))

app.use(cors());

// app.use(
//   express.urlencoded({
//     extended: true
//   })
// )

app.use('/', routes);

// app.listen(port, ()=>{
//   console.log(`Server running on port: http://localhost:${port}`)
// })

const listener = app.listen(process.env.PORT || 3001, () =>{
  console.log('Your app is listening on port ' + listener.address().port)
})