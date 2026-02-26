<STYLE>
      @font-face {
    font-family: "New Kansas";
    src: url("assets/fonts/New-Kansas-Semi-Bold.otf") format("opentype");
    font-weight: 600;
    font-style: normal;
  }
@font-face {
    font-family: "Sofia Pro";
    src: url("assets/fonts/Sofia-Pro-Light.woff") format("woff");
    font-weight: 300;
    font-style: normal;
  }
</STYLE>
## Table of Contents

- [User Stories](#user-stories)
- [Supporting Documentation](#supporting-documentation)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Colour Palette](#color-palette)
- [Typography](#typography)
- [Design Tokens and System Consistency](#tokens)


## user stories

## As the site owner  _(must have)_
I want the site to feel exciting, dynamic, and visually striking,
so that users immediately sense the adventurous nature of the extreme hiking and camping tours on offer.

## Description
The site should present high‑quality images and clear descriptions of each tour. The design must be clean, crisp, and uncluttered, with a consistent theme across all pages. It must work seamlessly on both mobile and desktop devices. Contact details should be easy to find and accessible from any page.

## Acceptance Criteria
* 	The homepage establishes the overall theme and visual identity of the site.
* 	A fixed navbar provides consistent navigation across all pages.
* 	The layout is fully responsive across a range of breakpoints (mobile, tablet, desktop, large desktop).
* 	The homepage clearly links to all other key pages (e.g., Tours, About, Contact).
* 	Tour pages include:
* 	A hero image or gallery
* 	A short, engaging description
* 	Clear calls to action
* 	Contact details are visible or easily accessible from the navbar/footer

## As the owner _(must have)_
I want the site to comply with recognised accessibility standards
so that all users, regardless of ability or device, can access and use the site effectively.

## Description
The site should meet the requirements of WCAG 2.1 Level AA, ensuring that content is perceivable, operable, understandable, and robust. This includes providing sufficient colour contrast, supporting keyboard-only navigation, ensuring compatibility with screen readers, and maintaining a consistent, predictable design across all pages. Accessibility must be considered from the start of development, not retrofitted later.

## Acceptance Criteria
* 	The site must use a consistent colour theme across all pages.
* 	The site must offer both light and dark themes.
* 	The colour palette must meet WCAG 2.1 AA contrast ratios:
* 	Minimum 4.5:1 for normal text
* 	Minimum 3:1 for large text
* 	All interactive elements (links, buttons, menus, cards) must be fully operable using keyboard input alone.
* 	Screen reader support must be ensured through:
* 	Semantic HTML structure
* 	Meaningful alt text for images
* 	ARIA labels where appropriate
* 	Focus states must be visible, clear, and consistent.
* 	Text must be resizable up to 200% without breaking layout or hiding content.
* 	Navigation must be predictable and consistent across the site.
* 	No content should flash more than three times per second (to avoid seizure risk)

## As a first‑time visitor _(must have)_
I want a website that is simple to navigate with clearly visible links
so that I can quickly understand where to go and how to find key information.

## Description
The site must provide intuitive navigation for new users. A well‑positioned, consistent navbar should guide visitors through the main sections of the site, and contact information must be easy to locate without searching or guessing.

## Acceptance Criteria
* 	A consistent navbar appears on all pages.
* 	The navbar contains clear, descriptive labels for each major section.
* 	Contact details are accessible via a dedicated Contact page.
* 	The Contact page is linked from the navbar and/or footer.
* 	Navigation items remain visible and usable across all screen sizes.
* 	The homepage provides clear signposts to the main areas of the site.

## As a regular user _(must have)_
I want to feel confident recommending the site to others,
and I want the option to sign up for a newsletter
so that I can stay informed about new tours and updates.

## Description
The site should feel well‑maintained, trustworthy, and professional. Users must be able to sign up for the company newsletter easily from any page. A dedicated newsletter form should collect user details and provide clear confirmation when the sign‑up is successful.

## Acceptance Criteria
* 	The footer contains a clear link to the newsletter sign‑up form.
* 	A dedicated newsletter sign‑up form exists on its own page.
* 	The form includes fields for at least name and email.
* 	Submitting the form displays a clear success message.
* 	The form is accessible from all pages via the footer or navbar.
* 	The form uses validation to prevent incomplete or invalid submissions.

## As a customer _(must have)_
I want to be able to leave feedback
so that I can share my experience and help improve the service.

## Description
The site must include a dedicated feedback form where customers can submit comments, suggestions, or concerns. The form should be simple, accessible, and provide confirmation once feedback has been submitted.

## Acceptance Criteria
* 	A dedicated feedback form page exists.
* 	The form includes fields for name, email, and feedback message.
* 	The form validates required fields before submission.
* 	A clear success message is shown after the form is submitted.
* 	The feedback page is accessible from the main navigation or footer.

## As an owner _(should have)_
As the site owner, I want the site to display our holidays so that visitors can quickly understand what tours we offer.

## Description
The site should present each holiday/tour using visually engaging cards that highlight key information and encourage users to explore further.

## Acceptance Criteria
* Cards are created to visually represent each tour, including title, image, short description, and key details.
* A carousel or grid layout allows users to browse multiple tour cards smoothly.
* Cards are responsive and display correctly on mobile, tablet, and desktop.
* Clicking a card takes the user to the full tour details page.

## As a customer _(could have)_
As a customer, I would like extra information about the locations so that I can better understand the environment, risks, and conditions before booking.

## Description
The site can integrate external APIs to provide additional real‑time or contextual information about each destination, such as weather, terrain, safety alerts, or travel logistics.

## Acceptance Criteria
* An API interface is implemented to fetch location‑specific information.
* Relevant data (e.g., weather, elevation, hazards, travel info) is displayed clearly on the tour details page.
* If an API fails or returns no data, the site displays a graceful fallback message.
* API data updates automatically without requiring manual content changes.

### Supporting Documentation

[Wire Frames](docs/wireframe.pdf)

## Tech Stack

- HTML5
- CSS3
- JavaScript
- GitHub Pages (deployment)
- GitHub Project (user stories)
- Copilot (website text articles)
- Balsamiq (wireframes)
- Code Institute (forms return status)
- w3.org (validators)

## Folder Structure

```text

└── 📁familyfarm
    └── 📁assets
        └── 📁css
            └── style.css
        └── 📁favicon
        └── 📁fonts
        └── 📁gallery
        └── 📁images
        └── 📁svg
    └── 📁docs
        ├── Changelog.md
        ├── Design.md
        └── wireframe.pdf
    └── 📁screenshots
    └── 📁docs
        └── testing.md
    └── 📁testing
    ├── .gitignore
    ├── about.html
    ├── activities.html
    └── shopandcafe.html
```
<a id="color-palette"></a>
## Colour Palette

The project uses a paired dark an
d light colour system designed to feel warm, earthy, and consistent across the site. The dark theme is built around deep browns and ember‑orange accents, giving it a grounded, rustic tone that fits the overall aesthetic. Soft cream tones and muted variants provide contrast for text, surfaces, and subtle UI elements. The light theme mirrors the same structure but shifts into gentle lilacs and warm browns, keeping the identity intact while offering a brighter, more open feel. Both palettes are structured so backgrounds, surfaces, accents, and muted tones map cleanly between modes, ensuring predictable contrast and a cohesive visual rhythm throughout the interface.

### Dark Theme

<div style="display:flex; gap:10px;">
  <div style="width:60px; height:60px; background:#563127; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#fff9eb; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#ff743c; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#6b3d31; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:rgba(255, 249, 235, 0.7); border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#ff8656; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#e05f2c; border-radius:6px;"></div>
</div>

### Light Theme

<div style="display:flex; gap:10px;">
  <div style="width:60px; height:60px; background:#d9cae4; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#563127; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#e98ad8; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#e8dff0; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:rgba(86, 49, 39, 0.6); border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#f29be0; border-radius:6px;"></div>
  <div style="width:60px; height:60px; background:#d374c4; border-radius:6px;"></div>
</div>

## Typography

The typography system pairs a bold, characterful display face with a clean, modern body font to create a balance between personality and readability. Headings carry the visual identity and set the tone, while body text stays neutral and highly legible, giving the layout a clear hierarchy and a consistent rhythm across the site.

### Headings — New Kansas

A strong, expressive serif used for titles and section headers to give the design warmth and personality.

<p style="font-family:'New Kansas'; font-size:24px;">
The quick brown fox jumps over the lazy dog.
</p>

### Body Text — Sofia Pro

A clean, versatile sans‑serif chosen for clarity and comfort, ideal for longer passages and general UI text.

<p style="font-family:'Sofia Pro'; font-size:24px;">
  The quick brown fox jumps over the lazy dog.
</p>

<a id="tokens"></a>
## Design Tokens and System Consistency

A token set gives your project a single source of truth for every reusable value, so colours, spacing, typography, and component behaviour all stay consistent no matter where they’re used. Instead of scattering hex codes, font weights, or layout numbers across different files, each value is defined once and referenced everywhere, which makes the system predictable and easy to maintain. When you update a token, the entire interface updates with it, keeping the design coherent as the project grows. Tokens also make dark and light themes straightforward, because each theme simply swaps out its own set of values while the components continue to reference the same names. This approach turns the design into a structured system rather than a collection of ad‑hoc choices, and it ensures that every part of the site speaks the same visual language.