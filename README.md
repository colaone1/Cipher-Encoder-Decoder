# Rolling Caesar Cipher Encoder/Decoder

A modern implementation of the Caesar Cipher with an enhanced rolling key feature for improved security. This web application allows users to encrypt and decrypt messages using a customizable two-key system.

## Features

- **Enhanced Security**: Uses a rolling key system that changes the encryption pattern for each letter
- **User-Friendly Interface**: Clean, intuitive design with real-time feedback
- **Accessibility**: Fully accessible with keyboard navigation and screen reader support
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Support**: Light and dark mode options
- **Additional Features**:
  - Real-time character counting
  - One-click copy to clipboard
  - Clear form functionality
  - Help section with usage instructions

## How It Works

The Rolling Caesar Cipher uses two keys:
1. **Base Key**: Determines the initial shift amount (0-25)
2. **Increment Key**: Determines how much to increase the shift for each subsequent letter (0-25)

### Example
With base key = 1 and increment key = 1:
- First letter moves 1 place
- Second letter moves 2 places
- Third letter moves 3 places
- And so on...

So "hello" becomes "igpmo":
- h → i (1 place)
- e → g (2 places)
- l → p (3 places)
- l → m (4 places)
- o → o (5 places)

## How to Use

1. **Enter Your Message**:
   - Type your message in the "Enter your message" textarea
   - Maximum 1000 characters allowed

2. **Set Your Keys**:
   - Enter a base key (0-25)
   - Enter an increment key (0-25)

3. **Choose Operation**:
   - Select "Encode" to encrypt your message
   - Select "Decode" to decrypt a message

4. **View Results**:
   - Your encrypted/decrypted message appears in the output box
   - Use the "Copy" button to copy the result to your clipboard
   - Use the "Clear" button to reset all fields

## Technical Details

- **Languages Used**: HTML5, CSS3, JavaScript (ES6+)
- **No External Dependencies**: Built with vanilla JavaScript
- **Browser Support**: Works in all modern browsers
- **Accessibility**: WCAG 2.1 compliant
- **Responsive Design**: Mobile-first approach

## Security Notes

While this implementation is more secure than a traditional Caesar Cipher, it is still considered a basic encryption method and should not be used for sensitive information. It serves as an educational tool to understand basic encryption concepts.

## Installation

No installation required! Simply:
1. Clone this repository
2. Open `index.html` in your web browser
3. Start encrypting and decrypting messages

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by the original Caesar Cipher used by Julius Caesar
- Built as an educational tool to demonstrate basic encryption concepts
