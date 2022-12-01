import express, { Request, Response } from 'express';
import axios from 'axios'
import { draw } from './chart';

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/yield-chart/:id', async (request: Request, response: Response) => {
try{
  const data = await axios.get(`https://yields.llama.fi/chart/${request.params.id}`)
  const lastDay = new Date(Date.now() - 30*24*3600e3)
  const dataset = data.data.data.filter(({timestamp}:any)=>new Date(timestamp) > lastDay)
  const firstAPy = dataset[0].apy
  const lastApy = dataset[dataset.length-1].apy
  const image = await draw({
    type: 'line' as any,
    data: {
      datasets: [{
        data: dataset.map(({ apy, timestamp }: any) => ({ x: timestamp, y: apy })),
        borderColor: lastApy > firstAPy? "#90ee90":"#ff6961",
      }],
    },
    options: {
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false
        },
      },
      elements: {
        point: {
          radius: 0
        }
      }
    },
  }, {
    height: 30,
    width: 90,
  })
  response.set("Content-Disposition", "inline;");
  response.set("Cache-Control", "max-age=3600");
  response.contentType('image/png');
  response.send(image);
} catch(e){
  response.sendStatus(400);
}
});


app.use(express.urlencoded({ extended: true }));

app.use('/', (request: Request, response: Response) => {
  response.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
