require('dotenv').config();
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');
app.use(fileUpload());
const Post = require('./models/M-post');

app.post('/upload', async (req, res) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
  });

  const s3 = new AWS.S3();
  const fileContent = Buffer.from(req.files.data.data, 'binary');

  const params = {
    Bucket: 'catcollector-with-toys-and-pics1',
    Key: req.files.data.name,
    Body: fileContent,
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    try {
      await Post.create({ image: data.Location });
    } catch (error) {
      console.log(`Error uploading image ${error}`);
    }
    res.send({
      response_code: 200,
      response_message: 'Success',
      response_data: data,
    });
  });
});

app.get('/images', async (req, res) => {
  try {
    const images = await Post.find({});
    if (images) {
      res.status(200).json({ images });
    }
  } catch (error) {
    console.log(`Error retrieving images from DB: ${error}`);
    res.status(500);
  }
});

app.listen(5000, () => console.log('listening on port 5000'));
