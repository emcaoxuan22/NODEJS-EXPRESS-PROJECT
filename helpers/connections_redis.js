
const Redis = require('ioredis');

// Tạo một đối tượng kết nối tới Redis
const redis = new Redis({
  host: 'localhost', // Địa chỉ IP hoặc tên máy chủ Redis
  port: 6379,        // Cổng mặc định của Redis
});

// Kiểm tra kết nối
redis.ping().then(() => {
  console.log('Connected to Redis');
}).catch((error) => {
  console.error('Error connecting to Redis:', error);
});

module.exports = redis