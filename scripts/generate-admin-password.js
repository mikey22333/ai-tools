const bcrypt = require('bcryptjs')

// Change this to your desired password
const password = 'admin123'

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error:', err)
  } else {
    console.log('Password:', password)
    console.log('Hashed password:', hash)
    console.log('\nCopy the hashed password to your admin login API route.')
  }
})
