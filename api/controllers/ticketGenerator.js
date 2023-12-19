const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const qrCode = require('qrcode');

async function generateTicket(req, res) {
  const { experienceName, date, numberOfPersons, customerName } = req.body;

  // Generate a unique booking ID (you might want to use a better method in a real application)
  const bookingId = generateBookingId();

  // Generate a QR code for the booking ID
  const qrCodeData = `Booking ID: ${bookingId}`;
  const qrCodeFilePath = `qrcode_${bookingId}.png`;
  await generateQRCode(qrCodeData, qrCodeFilePath);

  // Create a canvas for the ticket
  const canvas = createCanvas(500, 300);
  const ctx = canvas.getContext('2d');

  // Draw ticket details on the canvas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 500, 300);

  ctx.fillStyle = '#000000';
  ctx.font = '20px Arial';
  ctx.fillText(`Booking ID: ${bookingId}`, 20, 40);
  ctx.fillText(`Movie: ${experienceName}`, 20, 80);
  ctx.fillText(`Date: ${date}`, 20, 120);
  ctx.fillText(`Persons: ${numberOfPersons}`, 20, 160);
  ctx.fillText(`Customer: ${customerName}`, 20, 200);

  // Load the QR code image and draw it on the canvas
  const qrCodeImage = await loadImage(qrCodeFilePath);
  ctx.drawImage(qrCodeImage, 300, 40, 150, 150);

  // Save the canvas to an image file
  const ticketFilePath = `ticket_${bookingId}.png`;
  const out = fs.createWriteStream(ticketFilePath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);

  out.on('finish', () => {
    // Send the image file in the response
    res.download(ticketFilePath, (err) => {
      if (err) {
        res.status(500).send('Error generating ticket');
      } else {
        // Clean up: delete the generated image files
        fs.unlinkSync(ticketFilePath);
        fs.unlinkSync(qrCodeFilePath);
      }
    });
  });
}

// Helper function to generate a unique booking ID
function generateBookingId() {
  return Math.random().toString(36).substring(2, 10);
}

// Helper function to generate a QR code
async function generateQRCode(data, filePath) {
  await qrCode.toFile(filePath, data);
}

module.exports = { generateTicket };
