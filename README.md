# mdcrafter

**mdcrafter** is a lightweight and customizable Node.js server for rendering Markdown files into beautiful, web-ready pages. Whether you're a developer or a content creator, mdcrafter makes it easy to serve and display your Markdown documents with style.

## Features
- **Markdown Rendering**: Converts `.md` files into HTML on the fly.
- **Lightweight**: Minimal dependencies, fast and efficient.
- **Customizable**: Easily tweak the rendering and styling to suit your needs.
- **Live Reload**: Automatically updates the content when Markdown files are changed (optional).

## Getting Started

### Prerequisites
- Node.js (version 16 or later)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mdcrafter.git
   cd mdcrafter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Usage
1. Place your Markdown files in the `content` directory.
2. Access the files through the browser (e.g., `http://localhost:3000/myfile.md`).

### Customization
- Edit the `config.json` file to change server settings (port, default directory, etc.).
- Customize the HTML template or CSS styles in the `templates` folder to change the appearance.

## Contributing
Contributions are welcome! Feel free to submit a pull request or report issues.

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Built with ❤️ using Node.js and Markdown.
- Inspired by the simplicity of crafting content for the web.

---

Happy crafting with **mdcrafter**!

