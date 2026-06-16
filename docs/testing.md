## Table of Contents

- [Testing](#testing)
- [Lighthouse](#lighthouse)
- [Validators](#css)
- [ESlint vs JSlint](#lint)
- [Colour palette](#colours)
- [Visual check](#visual-check)
- [Link Check](#link-check)
- [Browser support](#browser-support)
- [Bugs / Design Features](#bugs)


## Testing
<a id="lighthouse"></a>

## Lighthouse testing

![Lighthouse testing](screenshots/lighthouse.png)

<a id="css"></a>

## CSS validator

![CSS testing](screenshots/css.png)

<h2 style=color:red;>Errors</h1>

### use of scrollbar-gutter
Browsers with full support for *scrollbar-gutter* can allocate a persistent gutter in the scroll container’s inline direction, ensuring that layout metrics remain stable even when overflow transitions from non‑scrolling to scrolling states. Engines that lack support simply ignore the declaration, falling back to their default scrollbar behavior without affecting the computed box model. Because the property is non-destructive and gracefully degrades, it functions as a safe progressive enhancement for maintaining predictable layout geometry across heterogeneous rendering environments.
*<p style=color:green;>
conclusion not an error</p>*

### use of layer
The validator reports *@layer* as an unrecognized at‑rule because it predates support for Cascade Layers and therefore cannot parse modern CSS constructs. Despite the warning, *@layer* is fully valid according to the current CSS specification and is implemented in all major browser engines. Since unsupported at‑rules are safely ignored by legacy parsers without affecting the cascade or computed styles, retaining *@layer* ensures proper layering semantics in compliant browsers while maintaining backward compatibility. The errors reflect validator limitations, not a defect in the stylesheet
*<p style=color:green;>
conclusion not an error</p>*

### warnings 125

*CSS variables*
CSS custom properties resolve at runtime, not at parse time, so static validators can’t determine whether a variable exists or what value it will ultimately produce. The warnings come from that limitation, not from any issue in the code. We use CSS variables because they centralise design tokens, enable theming, reduce duplication, and keep the system scalable — all while degrading safely in browsers that don’t support them.

*webkit*
WebKit-prefixed properties exist to support browsers that still rely on legacy engine behaviour, most notably Safari on macOS and iOS. These prefixes enable features that were originally experimental or implemented before the relevant CSS specifications were finalised. Although modern browsers increasingly use the unprefixed versions, Safari continues to require certain *-webkit-* declarations for full functionality, especially for visual effects like *backdrop-filter*. The warnings simply reflect that prefixed properties fall outside the formal CSS grammar, not that they are incorrect or unsafe to use.

## Markup validator

![index](screenshots/index.png)
*index.html*

![packages](screenshots/packages.png)
*packages.html*

![driving error](screenshots/error.png)

<p style=color:red;>The validator is correct there can not be a space in a URL unless it is encoded %20</p>

<p style=color:green;>FIX renaming the file is the cleanest option</p>

![driving](screenshots/driving.png)
*driving.html*

![skiing](screenshots/skiing.png)
*skiing.html*

![climbing](screenshots/climbing.png)
*climbing.html*

![hiking](screenshots/hiking.png)
*hiking.html*

<a id="lint"></a>

### ESlint vs JSlint

ESLint is a far more modern and flexible tool than JSLint, giving developers real control over their code quality instead of forcing rigid, outdated rules. It supports custom configurations, plugins, and environments, which means you can tailor it to your project rather than rewriting your project to satisfy the tool. ESLint understands modern JavaScript features, integrates cleanly with editors, and provides clear, actionable feedback instead of the blunt, inflexible warnings JSLint is known for. In short, ESLint fits naturally into a professional workflow, while JSLint feels like a relic from an earlier era of JavaScript.

*screen shots*

### VC extension
![](screenshots/script.png)

### web version
![](screenshots/eslint.png)

<a id="colours"></a>

## Colour palette

### Dark theme

- text / background : 9.23:1
- text / surface : 7.16:1
- heading / background : 5.73:1 * suitable for headings
- heading / surface : 4.45:1 * poor but not likely to be used 

### Light theme

- text / background : 7.4 : 1
- text / surface : 5.48 : 1
- heading / background : 8.13:1
- heading / surface : 6.02:1

### Alert colours

- success : 6.91 : 1
- warning : 5.81 : 1
- error : 7.52 : 1

## Visual Check

| page| dark theme | light theme
|------|---|---|
| index | ✓ | ✓ |
| contact | ✓ | ✓ |
| product | ✓ | ✓ |
| feedback modal | ✓ | ✓ |
| newsletter modal | ✓ | ✓ |
| driving | ✓ | ✓ |
| skiing | ✓ | ✓ |
| climbing | ✓ | ✓ |
| hiking | ✓ | ✓ |
| image modal | ✓ | ✓ |
| booking modal | ✓ | ✓ |
| weather modal | ✓ | ✓ |
| success modal | ✓ | ✓ |

## Link Check

| page| links & buttons 
|------|---|
| logo| ✓ |
| contact | ✓ |
| social media| ✓ |
| theme | ✓ |
| product | ✓ |
| feedback modal | ✓ |
| newsletter modal | ✓ |
| driving | ✓ |
| skiing | ✓ |
| climbing | ✓ |
| hiking | ✓ |
| image modal | ✓ |
| booking modal | ✓ |
| weather modal | ✓ |
| success modal | ✓ |

## Browser support

### Edge
![](screenshots/edge.png)

### Chrome
![](screenshots/crome.png)

### Firefox
![](screenshots/firefox.png)

<a id="bugs"></a>

## Bugs / Design Features

### Initial load behaviour of the navigation component

The navigation bar is loaded dynamically on each page. During the first visit, the browser must fetch and parse the external component before rendering it, which introduces a brief one‑time delay. After this initial request, the component is cached by the browser, and all subsequent page loads display the navigation immediately.
This behaviour is an intentional design choice. Centralising the navigation logic ensures the codebase remains DRY, reduces duplication across pages, and simplifies long‑term maintenance. The minor first‑load delay is an expected consequence of this architecture and is not indicative of a performance issue.

### Modal Testing Note

A faint blue focus flash may still appear when clicking rapidly around the modal. This is caused by the browser briefly focusing underlying interactive elements before the modal fully intercepts the event.
I have implemented the standard mitigations (focus redirection to the modal, outline removal, and backdrop coverage), which significantly reduce the frequency of the artefact. The behaviour is cosmetic, intermittent, and does not affect functionality.
Decision: Leaving as-is. Revisit only if the modal gains additional interactive controls (zoom, navigation, captions) or if the artefact becomes more prominent after future UI changes.

### Switching between Modals

During visual testing I noted a brief transitional flash between the form modal closing and the success modal opening. The behaviour appears to be part of the standard modal transition sequence and does not indicate a functional issue.

### Delays in loading weather Modal

Because the weather modal relies on an external API, the response time can vary depending on network conditions. During slower fetches, users may click repeatedly because there’s no immediate visual feedback, which can lead to unnecessary or duplicate requests.

#### FIX

To prevent this and make the interaction feel more responsive, a “please wait” indicator was added. This provides instant confirmation that the request is in progress and helps guide the user while the data loads.

### CTA Buttons

During visual testing, I noticed that the booking, feedback, and newsletter buttons were obstructing the view on smaller screens.

#### FIX

To resolve this, I introduced a targeted media query at a 400px breakpoint, allowing the floating button to lift higher on compact displays. This ensures the UI remains clear, accessible, and visually balanced across all device sizes.