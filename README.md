# Hoverboard

![Hoverboard logo](https://user-images.githubusercontent.com/2954281/42683571-55ba6be6-8696-11e8-8ff7-e9acd0db63e8.png)
[⚡ Live demo](https://hoverboard-master.web.app) | [🚀 Get Started](#getting-started)

[![Build status](https://github.com/gdg-x/hoverboard/actions/workflows/main.yaml/badge.svg)](https://github.com/gdg-x/hoverboard/actions/workflows/main.yaml)

## Overview

Project Hoverboard is the conference website template that helps you to set up a mobile-first conference website with blog, speaker and schedule management in a few minutes.

The template is created based on 7 years of [GDG Lviv](https://www.meetup.com/GDG-Lviv/) team experience of running conferences and feedback from more than 500 event organizers from all around the world who were using previous Hoverboard versions.

Our goal is to allow event organizers to set up a professional conference website with minimum resources. To get started you need only basic knowledge of web technologies and a free Firebase account.

## List Job Opportunities of the companies
We are currently passing through the panic time, in between the news of lay-off and recession are being spread over social medias, and so our this initiative is to “Connect Dots” of the community, by connecting Talents (who are always in search of the right opportunity) and the Companies (who are always looking for the bright talents).

We welcome companies from the community to share job opportunities at their companies.

Disclaimer: We are not responsible nor associated with anything in this initiative. We collect openings from the companies from the community and we list it out over here for the talents. You may check anything and everything before you apply, and only you and company are responsible while finalising the offer details.

**How you can submit Job Opportunities**
Please follow the given steps for listing out your company's job opportunities.

1. Fork the repository
2. Create a JSON object in the format given below
3. Add your Job openings JSON object [here](/public/data/job-openings-data.json)
4. Raise a PR for `develop` branch
5. Our contributors will review, merge and deploy!

```json
{
  "companyName": "GDG Ahmedabad",
  "location": "Ahmedabad",
  "bio": "GDG DevFest Ahmedabad brings together the world class experts in Android, Web and Cloud technologies to Ahmedabad for sessions, workshops and showcases.",
  "companyLogoUrl": "https://developers.google.com/static/profile/badges/events/community/devfest/2022/discover/badge.svg",
  "companyWebsite": "https://devfest.gdgahmedabad.com/",
  "companyCareerPage": "https://devfest.gdgahmedabad.com/",
  "linkedin": "https://www.linkedin.com/company/gdg-ahmedabad/",
  "hiringImageUrl": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/we-are-hiring-postcard-design-template-9d69ace4777878ef63cd65ffcdda1af3_screen.jpg",
  "openings": [
    {
      "title": "Angular Developers",
      "count": 2,
      "experience": "2-5 years"
    },
    {
      "title": "React Developers",
      "count": 1,
      "experience": "2-5 years"
    },
    {
      "title": "Flutter Developers",
      "count": 2,
      "experience": "1+ year"
    }
  ]
}
```
## List your profile for Meet The Talent
In a time of economic uncertainty, with widespread news of layoffs and a tightening job market, our 'Meet the Talent' feature is designed to create connections within the community. Here, we spotlight talented professionals actively seeking opportunities, giving companies access to a diverse pool of potential hires. This initiative is our way of 'connecting the dots' between companies on the lookout for skilled talent and candidates eager to make their mark.

We welcome candidates from the community to share your profile.

Disclaimer: "Meet the Talent" is a community-driven platform connecting job seekers with potential employers. We do not verify the information provided; candidates and companies are responsible for their own due diligence and any agreements made.

**How you can submit your profile for Meet The Talent**
Please follow the given steps for listing out your profile.

1. Fork the repository
2. Create a JSON object in the format given below
3. Add your Profile JSON object [here](/public/data/meet-the-talent.json)
4. Raise a PR for `develop` branch
5. Our contributors will review, merge and deploy!

```json
{
  "fullName": "John Deo",
  "location": "Ahmedabad, India",
  "bio": "Experienced software developer skilled in AWS, API integration, payment gateways (Stripe), Angular 10+, AngularJs, TypeScript, Vue.js, and JavaScript.",
  "email": "youremail@domain.com",
  "phone": "+91-9876543210",
  "imageUrl": "https://developers.google.com/static/profile/badges/events/community/devfest/2022/discover/badge.svg",
  "website": "https://xyz.com",
  "skills": ["Angular", "Android"],
  "links": [
    {
      "icon": "website",
      "link": "https://xyz.com",
      "name": "Portfolio"
    },
    {
      "icon": "github",
      "link": "https://github.com/johndeo",
      "name": "Github"
    },
    {
      "icon": "linkedin",
      "link": "https://www.linkedin.com/in/johndeo",
      "name": "LinkedIn"
    },
    {
      "icon": "twitter",
      "link": "https://x.com/johndeo",
      "name": "X/Twitter"
    }
  ]
}
```

## Features

| Feature                              | Description                                                                                                                  |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Fast and optimized**               | 91/100 PWA on [Lighthouse](https://www.webpagetest.org/lighthouse.php?test=180111_1P_027a041bc5102982f074014807320a86&run=3) |
| **Works offline**                    | shitty WiFi on the venue is not a problem anymore                                                                            |
| **Mobile-first**                     | layouts optimized for small screens, Hoverboard can be installed as a native app on your phone                               |
| **Push notifications**               | remind about sessions in My schedule, session feedback or target users with a custom message                                 |
| **SEO optimized**                    | index all content and get to the top in search results                                                                       |
| **Speakers and schedule management** | keep and update all information in the Firebase                                                                              |
| **My schedule**                      | let attendees save sessions they want to visit                                                                               |
| **Customizable theme**               | change colors to match your style                                                                                            |
| **Blog**                             | post announcements, updates and useful information                                                                           |

## Getting Started

🌛 Read the [set up guide](/docs/tutorials/00-set-up.md) or checkout the [full documentation](/docs/).

## Updating

Here is a git workflow for updating your fork (or downloaded copy) to the latest version:

```console
git remote add upstream https://github.com/gdg-x/hoverboard.git
git fetch upstream
git merge upstream/main
# resolve the merge conflicts in your editor
git add . -u
git commit -m 'Updated to the latest version'
```

## Documentation

The [Getting Started guide](#getting-started) is probably a good first point of call!

📖 [Full documentation](/docs/).

## Compatibility

✅ Compatible with **latest two** major versions of of browsers that support [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

## Technology Stack

- Polymer 3 (deprecated [#796](https://github.com/gdg-x/hoverboard/issues/796))
- LitElement
- Redux
- Firebase
- Service Worker
- CSS Grid

## Contributing

Awesome! Contributions of all kinds are greatly appreciated. To help smoothen the process we have a few non-exhaustive guidelines to follow which should get you going in no time. Checkout our [roadmap](https://github.com/gdg-x/hoverboard/blob/main/ROADMAP.md) and [open issues](https://github.com/gdg-x/hoverboard/issues).

### Good First Issue

Issues labeled [`good first issue`](https://github.com/gdg-x/hoverboard/labels/good%20first%20issue) are a great way to ease into development on this project.

### Help Wanted Label

Any other issue labeled [`help wanted`](https://github.com/gdg-x/hoverboard/labels/help%20wanted) is ready for a PR.

### Using GitHub Issues

- Feel free to use GitHub issues for questions, bug reports, and feature requests
- Use the search feature to check for an existing issue
- Include as much information as possible and provide any relevant resources (Eg. screenshots)
- For bug reports ensure you have a reproducible test case
- A pull request with a breaking test would be super preferable here but isn't required

### Submitting a Pull Request

- Squash commits
- Lint your code with eslint (config provided)
- Include relevant test updates/additions

## Code of Conduct

Read the full version [Code of Conduct](/.github/CODE_OF_CONDUCT.md).

## Contributors

**Maintainer:** [Abraham Williams](https://github.com/abraham)

**Authors:** [Oleh Zasadnyy](https://github.com/ozasadnyy) and [Sophie Huts](https://github.com/sophieH29).

This project exists thanks to all the [people who contribute](https://github.com/gdg-x/hoverboard/graphs/contributors). [[Contribute](/.github/CONTRIBUTING.md)].

[![List of contributors](https://opencollective.com/hoverboard/contributors.svg?width=890)](https://github.com/gdg-x/hoverboard/graphs/contributors)

## License

The project is published under the [MIT license](/LICENSE.md).
Feel free to clone and modify repo as you want, but don't forget to add a reference to authors :)

_GDG[x] is not endorsed and/or supported by Google, the corporation._
