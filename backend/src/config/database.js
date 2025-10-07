// Database configuration (placeholder for future MongoDB/PostgreSQL setup)
export const databaseConfig = {
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/jobwisecv',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
};

export default databaseConfig;
