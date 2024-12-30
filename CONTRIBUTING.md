# Contribution Guide

We welcome contributions to ! Whether it's bug reports, feature suggestions, code contributions, or documentation improvements, your input is valuable to us.

Please follow this guide to ensure smooth collaboration.

# **Getting Started**

## Fork the Repository

1. Go to the main repository: [https://github.com/username/repository-name](https://github.com/username/repository-name).
2. Click the **Fork** button at the top-right corner.
3. Clone your forked repository:
   ```bash bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
   ```

## Set Up the Environment

Ensure you have all prerequisites installed and for detailed setup guide refer to \[README.md]\(clone [https://github.com/your-username/resourcle/readme.md](https://github.com/your-username/resourcle/readme.md)) .

## Create a New Branch

Before making changes, create a new branch:

```Text bash
git checkout -b feature/your-feature-name
```

Use a meaningful branch name, such as **fix/bug-name** or **feature/new-component**.

***

# How to Contribute

### Reporting Bugs

* Existing Issues: Before opening a new issue, check if it has already been reported.
* Open a New Issue:
* Go to the Issues tab.
* Provide a clear title and description of the issue.
* Include steps to reproduce, screenshots, and logs (if applicable).

### Suggesting Features

* Open a Feature Request:
* Use the Feature Request template (if available) or create a new issue.
* Clearly describe the problem and your proposed solution.
* Explain why this feature would benefit the project.

<br />

**Submitting Code Changes**

Follow the Code Style, Ensure your code adheres to the project's linting and formatting rules.

Run:

```Text bash
npm run lint
npm run format
```

***

**use clear and descriptive commit messages.**\
Format your commit messages as:

```Text bash
feat: add new feature description\
fix: resolve issue with X
docs: update documentation for X
```

**Push your branch to your forked repository:**

```
git push origin feature/your-feature-name
```

**Create a Pull Request (PR):**

* Go to the main repository and click New Pull Request.
* Select your branch and submit the PR.
* Provide a detailed description of your changes.

***

## Review Process

1. Once you create a PR, a maintainer will review it.
2. Be ready to address comments or make adjustments if requested.
3. After approval, the PR will be merged by a maintainer.

***

## Local Development

If you're contributing frequently, you may want to use the **apps/** folder with Turborepo for faster local development.

### Steps:

1. Start all apps

```
npm run dev
```

2. Work on the required app (e.g.,Server or Frontend) by navigating to its folder under **apps/**.

***

## Contact Us

If you need help at any point:

* Open a Discussion: Use the Discussions tab.
* Email Us: [contact@your-email.com](mailto:contact@your-email.com)
  <br />

***

We look forward to your contributions. Thank you for helping us improve !