# Project Web Visual Assist

This project is a sandbox environment for experimenting with Claude AI, an advanced language model, to generate personalized website content. 
The goal is to explore the capabilities of AI in creating tailored and engaging content for websites based on user preferences and input.

### Prerequisites

- Anthropic account to have access to Claude API Key. Check out Anthropic API reference https://docs.anthropic.com/claude/reference/getting-started-with-the-api.

## Getting Started

### Create .env.local file

Add the following to your .env.local file
```bash
NEXT_PUBLIC_CLAUDE_API_KEY=replace-with-your-public-key
```

### Install dependencies

```bash
npm install
```

### Run the development server:

```bash
npm run dev
```
## Built With

* [Nextjs][nextjslink] - The web framework used
* [Material Tailwindcss][materialtailwindlink] - The tailwind css web framework used
* [Anthropic API][anthropiclink] - The AI used for content generation

## Authors

* **Namae Conde** - *Initial work* - [namaeconde][githublink]

[githublink]: https://github.com/namaeconde
[nextjslink]: https://nextjs.org/docs
[materialtailwindlink]: https://www.material-tailwind.com/docs/react/installation
[anthropiclink]: https://docs.anthropic.com/claude/reference/getting-started-with-the-api