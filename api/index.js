const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

// Para Vercel (Serverless)
module.exports = async (req, res) => {
  try {
    await conn.sync({ alter: true });
    server(req, res);
  } catch (error) {
    console.error('Database sync error:', error);
    // Enviar headers CORS incluso en caso de error
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.status(500).json({
      error: 'Database connection failed',
      details: error.message
    });
  }
};

// Para Local
if (require.main === module) {
  conn.sync({ alter: true }).then(() => {
    server.listen(PORT, () => {
      console.log(`listening at Port ${PORT}`); // eslint-disable-line no-console
    });
  });
}
