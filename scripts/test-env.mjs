import https from 'node:https';
import sharp from 'sharp';

console.log('Sharp version:', sharp.versions.sharp);

https.get('https://images.unsplash.com', (res) => {
  console.log('Unsplash status:', res.statusCode);
  process.exit(0);
}).on('error', (err) => {
  console.log('Network error:', err.message);
  process.exit(0);
});
