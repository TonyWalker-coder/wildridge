## Table of Contents

- [User Story Validation](#userstoryvalidation)
- [Functional Testing](#walkthrough)
- [Lighthouse](#lighthouse)
- [Validators](#css)
- [ESlint](#lint)
- [Browser support](#browser-support)
- [Mobil phone support](#mobile)
- [Bugs / Design Features](#bugs)
- [Post-testing](#posttest)
- [ESLint Configuration and Validation Output](#figurex)
- [Weather Error Handling](#api)
- [Automated and Manual Testing](#automatedtesting)
- [Latest lighthouse screenshots and evaluation](#light)

## **Documentation Note**

To improve readability and reduce repetition, some evidence in this document is presented using composite images containing multiple screenshots. All images have been reviewed for accuracy; however, minor visual discrepancies may occasionally occur during the image compilation process. No Firefly-generated content is used within the deployed website itself.

## User Story Validation

## Homepage

### Acceptance Criteria
* 	The homepage establishes the overall theme and visual identity of the site.
* 	A fixed navbar provides consistent navigation across all pages.
* 	The layout is fully responsive across a range of breakpoints (mobile, tablet, desktop, large desktop).
* 	The homepage links to the packages page.
* 	A hero image or gallery
* 	A short, engaging description
* 	Clear calls to action
* 	Contact details are visible or easily accessible from the navbar/footer

<img  width=800px height=100% src="../screenshots/homepage1-1.png">

The homepage has the required hero and site description.

<img  width=800px height=100% src="../screenshots/homepage1-2.png">

The homepage has a fixed navigation bar.

<img  width=800px height=100% src="../screenshots/homepage1-3.png">

Contact details can be accessed via the navigation bar.

<img  width=800px height=100% src="../screenshots/homepage1-4.png">

The navigation bar has a link to the packages.html.

<img  width=200px height=100% src="../screenshots/homepage1-5.png">

The homepage remains responsive with the use of clamp.

<a id="w2"></a>

<img  width=800px height=100% src="../screenshots/homepage1-6.png">

404.html page has a clear link back to the homepage.

<a id="w1"></a>

<img  width=800px height=100% src="../screenshots/homepage1-7.png">

The navigation `fetch` has error handling for a failed promise and a clear user message.

<img  width=800px height=100% src="../screenshots/homepage1-8.png">

The site has a light/dark theme toggle.

<img  width=800px height=100% src="../screenshots/homepage1-9.png">

The home page is keyboard accessible.

## Accessibility

### Acceptance Criteria
* 	The site must use a consistent colour theme across all pages.
* 	The site must offer both light and dark themes.
* 	The colour palette must meet WCAG 2.1 AA contrast ratios:
* 	Minimum 4.5:1 for normal text
* 	Minimum 3:1 for large text
* 	All interactive elements (links, buttons, menus, cards) must be fully ope rable using keyboard input alone.
* 	Screen reader support must be ensured through:
* 	Semantic HTML structure
* 	Meaningful alt text for images
* 	ARIA labels where appropriate
* 	Focus states must be visible, clear, and consistent.
* 	Navigation must be predictable and consistent across the site.
* 	No content should flash more than three times per second (to avoid seizure risk)

<img  width=800px height=100% src="../screenshots/colour.png">

The site has a consistent colour theme throughout.

<img  width=800px height=100% src="../screenshots/lightanddark.png">

The site has a light and dark theme

<img  width=300px height=100% src="../screenshots/acces-index.png"><img  width=300px height=100% src="../screenshots/acces-packages.png"><img  width=300px height=100% src="../screenshots/acces-skiing.png">

The pages pass Lighthouse accessibility testing.

*Note:* It is not possible to distinguish between the light and dark themes from Lighthouse result screenshots because the reports are identical. Therefore, only one screenshot has been included in the interest of readability.

*Note:* hiking.html, skiing.html, driving.html and climbing.html differ only in their content. As the underlying structure, accessibility implementation and Lighthouse results are effectively identical, only one representative screenshot has been included in the interest of readability.

<img  width=800px height=100% src="../screenshots/tab.png">

| Test                                     | Expected Result                                                    | Actual Result |
| ---------------------------------------- | ------------------------------------------------------------------ | ------------- |
| Press `Tab` repeatedly from page load    | Focus moves through links, buttons and controls in a logical order | Passed        |
| Press `Enter` on navigation links        | Selected page opens                                                | Passed        |
| Press `Enter` on weather controls        | Weather modal opens and displays requested forecast                | Passed        |
| Press `Enter` on the **Book Now** button | Booking form modal opens                                           | Passed        |
| Press `Tab` within an open modal         | User can navigate all modal controls using the keyboard            | Passed        |
| Press `Enter` on modal close button      | Modal closes successfully                                          | Passed        |
| Press `Esc` while a modal is open        | Modal closes successfully                                          | Passed        |
| Continue tabbing through page controls   | No keyboard traps encountered                                      | Passed        |


### Keyboard Access

During keyboard navigation testing, it was identified that the home-page logo link could receive keyboard focus but did not display a sufficiently visible focus indicator. A :focus-visible style was added to provide a clear visual outline for keyboard users without affecting mouse interaction.

Bug found and fixed: See [Keyboard Access](#Keyboardaccess).

## Navigation and contact

## Acceptance Criteria
* 	A consistent navbar appears on all pages.
* 	The navbar contains clear, descriptive labels for each major section.
* 	Contact details are accessible via the navigation bar.
* 	Navigation items remain visible and usable across all screen sizes.
* 	The homepage provides clear signposts to the main areas of the site.


<img  width=300px height=100% src="../screenshots/nav1.png"><img  width=100px height=100% src="../screenshots/nav2.png">

The navigation bar is available across all screen size with contacts and the link to the packages.html.

## Newsletter

### Acceptance Criteria
* 	A dedicated newsletter sign‑up feature should be available via a button and modal.
* 	The feature should includes fields for at least name and email.
* 	Submitting the data displays a clear success message.
* 	The feature uses validation to prevent incomplete or invalid submissions.

<img  width=300px height=100% src="../screenshots/news1.png"><img  width=300px height=100% src="../screenshots/news2.png">

The news letter feature presents in a modal requesting the required fields with validation, on compilation a success message is generated.

*Limitation: As this project has no back-end functionality, newsletter subscriptions are not processed and the confirmation message is provided for demonstration purposes only.

## Feedback

### Acceptance Criteria
* 	A dedicated feedback function must exists.
* 	Use a dedicated button and modal for this.
* 	The feature will take the form of a modal and includes fields for name, email, and feedback message.
* 	The feature validates required fields before submission.
* 	A clear success message is shown after the data is submitted.

<img  width=300px height=100% src="../screenshots/feed1.png"><img  width=300px height=100% src="../screenshots/feed2.png">

The news feedback feature presents in a modal allowing free text input, on compilation a success message is generated.

*Limitation: As this project has no back-end functionality, feedback submission is not processed and the confirmation message is provided for demonstration purposes only.

## Packages

### Acceptance Criteria
* Cards are created to visually represent each tour, including title, image, short description, and key details.
* Cards are responsive and display correctly on mobile, tablet, and desktop.
* Clicking a card takes the user to the full tour details page.

<img  width=300px height=100% src="../screenshots/package1.png">

The tour cards have a descriptive image banner with a tour title and description, each card has its own navigation button to that tours page.

<img  width=500px height=100% src="../screenshots/package2.png">

Each tour card links to its own dedicated page.

<img  width=500px height=100% src="../screenshots/package3.png"><img  width=300px height=100% src="../screenshots/package4.png"><img  width=200px height=100% src="../screenshots/package5.png">

The packages.html is grid based with 3 break points to provide a responsive layout from desktop to mobile.

## API information

## Acceptance Criteria
* An API interface is implemented to fetch location‑specific weather information.
* Relevant data is displayed clearly on the tour details page by way of a modal.

<img  width=500px height=100% src="../screenshots/api.png">

The site use a weather based API to give locla weather information relation to the specific tour location.

<a id="walkthrough"></a>

## Functional Testing
 
A complete walkthrough of the application was performed to verify that all interactive elements behave as expected. Each page was navigated and all user-facing controls were tested.

| Test                                                     | Expected Result                                                    | Actual Result | Screenshot |
| -------------------------------------------------------- | ------------------------------------------------------------------ | ------------- | ---------- |
| Opening the sites homepage with a corrupted or missing navigation bar| The page will display a message to the user explain the problem | Passed | [Link](#w1)|
| Press `Tab` repeatedly from page load    | Focus moves through links, buttons and controls in a logical order | Passed        |        |
| Press `Enter` on clickable elements      | The selected action is performed                                   | Passed        |        |
| Mouse hover over the site logo       | **Home Page** is displayed | Passed        |        |
| Clicking the site logo       | The user is returned to the homepage | Passed        |        |
| Clicking on `Contact us` (toggle)     | The contact panel will open close to display contact information | Passed        |        |
| Click social media links| The relevant social media homepage will open in its own tab | Passed        |        |
| Clicking on `Colour Theme Icon` 🌙 (toggle)     | The site will display either a light or dark theme | Passed        |        |
| Random clicking out side clickable elements | no effect on site | Passed        |        |
| https://tonywalker-coder.github.io/wildridge/invalidpage.html *example* | Dedicated 404.html with link will display                            | Passed        | [Link](#w2) |
| Check console| No errors                                          | Passed        |        |
| Click on packages| Packages.html will open for the user                                         | Passed        |        |
| Press `Tab` repeatedly from page load    | Focus moves through links, buttons and controls in a logical order | Passed        |        |
| Press `Enter` on clickable elements      | The selected action is performed                                   | Passed        |        |
| Click `Dare to dive!`  | The page will change to driving.html | Passed        |        |
| Click `Dare to ski!`  | The page will change to skiing.html | Passed        |        |
| Click `Dare to climb!`  | The page will change to climbing.html | Passed        |        |
| Click `Dare to hike!`  | The page will change to hiking.html | Passed        |        |
| Clicking on `Colour Theme Icon` 🌙 (toggle)     | The site will display either a light or dark theme | Passed        |        |
| Click `Feedback`  | The feedback modal will open | Passed        |        |
| Click outside the modal (at any time)  | Modal will close | Passed        |        |
| Click `X` (at any time) | Modal will close | Passed        |        |
| Press `ESC` (at any time) | Modal will close | Passed        |        |
| Click `Submit` with no data | *Please fill* error will appear| Passed        |        |
| Click `Submit` with no name | The modal will close and a success message will appear | Passed        |        |
| Click `close`, or outside the modal, or `X` or `ESC`| The modal will close the success message | Passed        |        |
| Click `News letter`  | The News Letter modal will open | Passed        |        |
| Click outside the modal, or `X` or `ESC` (at any time) | The modal will close | Passed        |        |
| Click `Submit` with no data | *Please fill* error will appear for both field| Passed        |        |
| Click `Submit` with valid data | The modal will close and a success message will appear | Passed        |        |
| Click `close`, outside the modal, `X` or `ESC`| The success message modal will close| Passed        |        |
| Random clicking out side clickable elements | no effect on site | Passed        |        |
| Check console| No errors                                          | Passed        |        |
| Clicking on `Colour Theme Icon` 🌙 (toggle) driving.html     | The site will display either a light or dark theme | Passed        |        |
| Clicking on `Colle Sommeiller` | Google maps will open in its own tab for that location | Passed        |        |
| Clicking on any of the seven links | An image modal will open for each link | Passed        |        |
| Click outside the modal, `X` or `ESC` (at any time) | The image modal will close| Passed        |        |
| Clicking on `Book Now` | The booking modal will open | Passed        |        |
| Click outside the modal, or `X` or `ESC` (at any time) | The booking modal will close| Passed        |        |
| Click `Submit` with no name, email or date | *Please fill* error will appear for each field| Passed        |        |
| Click `Submit` with valid data | The success message will be displayed| Passed        |        |
| Click `close`, outside the modal, `X` or `ESC`| The success message modal will close| Passed        |        |
| Clicking `Today`, `3-Day` or `7-Day` with no network or similar error | The *weather unavailable* message will display| Passed        |        |
| Click outside the modal, `X` or `ESC` | The message modal will close| Passed        |        |
| Clicking `Today`, `3-Day` or `7-Day` | A *please wait* message will appear before loading to prevent repeated clicking| Passed        |        |
| After Loading | The weather modal for that time period will open| Passed        |        |
| Click outside the modal, `X` or `ESC` | The weather modal will close| Passed        |        |
| Random clicking out side clickable elements | no effect on site | Passed        |        |
| Check console| No errors                                          | Passed        |        |
| Clicking on `Colour Theme Icon` 🌙 (toggle) skiing.html     | The site will display either a light or dark theme | Passed        |        |
| Clicking on `La Grave` | Google maps will open in its own tab for that location | Passed        |        |
| Clicking on any of the four links | An image modal will open for each link | Passed        |        |
| Clicking on `Book Now` | The booking modal will open | Passed        |        |
| Clicking `Today`, `3-Day` or `7-Day` | A *please wait* message will appear before loading to prevent repeated clicking| Passed        |        |
| After Loading | The weather modal for that time period will open| Passed        |        |
| Random clicking out side clickable elements | no effect on site | Passed        |        |
| Check console| No errors                                          | Passed        |        |
| Clicking on `Colour Theme Icon` 🌙 (toggle) climbing.html     | The site will display either a light or dark theme | Passed        |        |
| Clicking on `The Troll Wall ` | Google maps will open in its own tab for that location | Passed        |        |
| Clicking on any of the three links | An image modal will open for each link | Passed        |        |
| Clicking on `Book Now` | The booking modal will open | Passed        |        |
| Clicking `Today`, `3-Day` or `7-Day` | A *please wait* message will appear before loading to prevent repeated clicking| Passed        |        |
| After Loading | The weather modal for that time period will open| Passed        |        |
| Random clicking out side clickable elements | no effect on site | Passed        |        |
| Check console| No errors                                          | Passed        |        |
| Clicking on `Colour Theme Icon` 🌙 (toggle) hiking.html     | The site will display either a light or dark theme | Passed        |        |
| Clicking on `The GR20` | Google maps will open in its own tab for that location | Passed        |        |
| Clicking on any of the six links | An image modal will open for each link | Passed        |        |
| Clicking on `Book Now` | The booking modal will open | Passed        |        |
| Clicking `Today`, `3-Day` or `7-Day` | A *please wait* message will appear before loading to prevent repeated clicking| Passed        |        |
| After Loading | The weather modal for that time period will open| Passed        |        |
| Random clicking out side clickable elements | no effect on site | Passed        |        |
| Check console| No errors                                          | Passed        |        |

**Notes**

- The navbar is an injected component and was therefore fully tested on the homepage only, as its functionality remains consistent across all pages.

- The custom 404 page was tested from the homepage only, as this was sufficient to verify its functionality.

- Shared functionality was fully tested on driving.html only, as the same implementation is used on the skiing, hiking and climbing pages.
    - This included weather API timeout handling,
    - modal closing behaviour, 
    - and the booking modal.
- Links to these features were still tested on each page to confirm accessibility and correct navigation.

Screenshots for all of these test can already be found in the user stories validation section so I did not overload this test with proven screenshots.



## Testing
<a id="lighthouse"></a>

## Lighthouse testing

![Lighthouse testing](../screenshots/lighthouse.png)

<a id="css"></a>

## CSS validator

![CSS testing](../screenshots/css.png)

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

![index](../screenshots/index.png)
*index.html*

![packages](../screenshots/packages.png)
*packages.html*

![driving error](../screenshots/error.png)

<p style=color:red;>The validator is correct there can not be a space in a URL unless it is encoded %20</p>

<p style=color:green;>FIX renaming the file is the cleanest option</p>

![driving](../screenshots/driving.png)
*driving.html*

![skiing](../screenshots/skiing.png)
*skiing.html*

![climbing](../screenshots/climbing.png)
*climbing.html*

![hiking](../screenshots/hiking.png)
*hiking.html*

<a id="lint"></a>

### ESlint

JavaScript linting was performed using ESLint throughout development. ESLint was chosen because it supports modern JavaScript standards, including current syntax, modules. As an installed Visual Studio Code extension, ESLint provided continuous real-time feedback while coding, highlighting errors and potential issues directly within the editor.

In addition to in-editor checking, project-wide linting was performed from the command line using:

`eslint .`

This command allowed all JavaScript files within the project directory to be checked before submission, providing a final sanity check to help identify any remaining errors, warnings, or code quality issues. Using both the Visual Studio Code integration and command-line linting ensured that code quality was monitored continuously throughout development and verified prior to handover.

![](../screenshots/eslint.png)


## Browser support

### Edge
![](../screenshots/edge.png)

### Chrome
![](../screenshots/crome.png)

### Firefox
![](../screenshots/firefox.png)

<a id="mobile"></a>

## Mobil phone support
<img  width=200px height=100% src="../screenshots/mobile1.jpg"><img  width=200px height=100% src="../screenshots/mobile2.jpg"><img  width=200px height=100% src="../screenshots/mobile3.jpg"><img  width=200px height=100% src="../screenshots/mobile4.jpg"><img  width=200px height=100% src="../screenshots/mobile5.jpg">

<img  width=200px height=100% src="../screenshots/mobile6.jpg"><img  width=200px height=100% src="../screenshots/mobile7.jpg"><img  width=200px height=100% src="../screenshots/mobile8.jpg"><img  width=200px height=100% src="../screenshots/mobile9.jpg"><img  width=200px height=100% src="../screenshots/mobile10.jpg">

Note: This document already contains extensive evidence of desktop testing. To avoid unnecessary duplication, this section focuses solely on mobile screenshots, demonstrating the site's behaviour at the smallest supported breakpoint.


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

### Home Page Contrast

The original home‑page text had insufficient contrast, which reduced readability and created a weaker user experience, especially for users viewing the site on brighter screens or with accessibility needs.

### Fix

I added a darker semi‑transparent overlay behind the key text headings.
This improves the contrast significantly while still preserving the existing colour scheme and overall visual style. The result is clearer, more accessible text without altering the design identity of the page.

### Modal Image Flicker When Switching Gallery Images

Issue Description
When opening the image modal and clicking between different gallery images, the previously displayed image remained briefly visible before the new image appeared. This caused a noticeable flicker and created a poor user experience, especially when switching rapidly between images.

Cause of the Issue
The modal was already visible when the JavaScript updated the <img> element’s src attribute. Browsers continue to display the old bitmap until the new image has finished loading. Because the new image loads asynchronously, the old image becomes visible for a fraction of a second, resulting in the flicker.

Steps to Reproduce
Open the modal by clicking any .img-link.

Click another .img-link while the modal is still open.

Observe that the previous image flashes briefly before the new one loads.

### Fix

To prevent the flicker, the solution was to hide the current image, preload the new image, and only swap the src once the new image has fully loaded. A fade‑in transition was added to ensure a smooth visual change.

### Redundant development code

Redundant development code in packages.html & index.html has left the theme toggle inside a `<div>` meaning it does not comply with WCAG 2.1.

### Fix

Wrapped the function in a `<button>`like the rest of the site.

### Multiple close modals used through out script.js

Due to my inexperience when initially implementing modals, script.js accumulated multiple modal close handlers. This created the potential for several event listeners to respond to the same action, as well as situations where code could attempt to close a modal that no longer exists, potentially resulting in unhandled errors.

### Fix

All modals now use a shared action class and a single unified event handler, which calls the closeModal() function. Additional validation has been added to ensure the event originated from a valid modal element before attempting to close it, preventing null reference errors.

As part of this all redundant modal close functions and duplicate event listeners have been removed, resulting in more predictable modal behaviour.

### Multiple console errors

The original mouseover and mouseleave implementation generated numerous console errors. Events triggered by unrelated elements, such as `<a>` tags and `<button>` elements, were being processed by the handler, resulting in invalid or null event references and unnecessary error logging.

### Fix

The functionality was rewritten and moved into the navbar fetch process, allowing the event listeners to be attached directly to the intended elements once they navbar loaded. This has removed invalid event triggers being processed, eliminating the console errors.

### 7timer.info weather API free service unavailable

After submitting the project 7timer discontinued its free tier meaning the weather API failed.

### Fix

Due to the amount of time that was taken to make the original API service function correctly Microsoft Copilot was used to source and implement a new weather API and rewrite the original function.

### Weather API unavailable service hang

When the Weather API service is unavailable, the application remained stuck on the "Please Wait" prompt. This left the user without any indication that the request had failed or that the service was unreachable.

### Fix

The application now uses the previously unused status response to detect when a connection to the Weather API cannot be established. When this condition is encountered, the "Please Wait" prompt is automatically removed and an informational modal is displayed to notify the user that the service is unavailable.

The fix was tested by disconnecting the network before initiating the weather request, confirming that the application now handles the failure with user feedback.

### Navigation Resource Fallback

A fallback was added to the navigation loader to handle situations where the shared navbar.html cannot be retrieved. The application now checks the HTTP response before rendering the navigation and displays a user-friendly message if it is unavailable, preventing a server 404 error on the page.

*note this is only available via the homepage as the site would not function without the navigation

### 404.html

Added a 404.html with link back to homepage.

<a id="Keyboardaccess"></a>

### Keyboard access

During keyboard navigation testing, it was identified that the home-page logo link could receive keyboard focus but did not display a sufficiently visible focus indicator. A :focus-visible style was added to provide a clear visual outline for keyboard users without affecting mouse interaction.

<a id="posttest"></a>

## Post-testing

Post-testing note: As some testing activities resulted in minor code changes and bug fixes, all validators, including HTML validation, CSS validation and ESLint, were run again across the project to verify that no new issues or code violations were introduced.

<a id="figurex"></a>

## Figure X: ESLint Configuration and Validation Output

The ESLint rules no-unused-vars and no-undef have been enabled to ensure that unused variables and undefined references are reported during development. Browser globals such as document, window, fetch, localStorage, and jQuery ($) are explicitly configured to prevent false-positive linting errors. The ESLint configuration also includes Node.js globals for the configuration file itself.

The terminal output shows the command:
`npx eslint .`
executing successfully with no output returned, which is the expected result when ESLint detects zero errors and zero warnings. This confirms that all JavaScript files pass the configured linting rules and that the previously identified unused variable issue has been resolved.

<img  width=700px height=100% src="../screenshots/figurex.png">

<a id="api"></a>

## Weather Error Handling

The weather feature uses a third-party weather service. Where forecast data cannot be retrieved, users are provided with a clear and actionable error message:

"Unable to retrieve forecast data at this time. Please check your internet connection and try again."

As the application has no visibility of the specific cause of failure (for example, network interruption, API downtime, rate limiting, or service availability issues), it is not possible to provide more precise guidance without potentially misleading the user. The message therefore offers the most appropriate user action while clearly communicating that forecast data could not be retrieved.

## Weather Forecast Amendments

The weather feature was updated following the replacement of the original weather service with the Open-Meteo API. The reported issues relating to wind speed units and forecast time labels have been addressed. Wind speed is now displayed in km/h, matching the units returned by the API, and forecast timestamps have been clarified to avoid misleading users.

The current implementation continues to present forecast information as an hourly forecast. A complete redesign of the forecast logic to provide dedicated daily forecast views would require a more substantial refactor of the weather component and is outside the scope of the current resubmission. The existing implementation remains fully functional and provides accurate forecast data obtained from the Open-Meteo service.

<a id="automatedtesting"></a>

## Automated and Manual Testing

Testing for this project was carried out using both automated and manual methods.

Automated testing was used to validate code quality and standards. This included HTML validation through the W3C Validator, CSS validation through the W3C CSS Validator, JavaScript linting with ESLint, and accessibility and performance testing using Lighthouse. These tools automatically analyse the code and report any errors, warnings, or areas for improvement.

Manual testing was used to verify the functionality and usability of the application. Each page, navigation link, package card, contact method, weather feature, modal, and user interaction was tested individually. Manual testing was also carried out across different screen sizes and browsers to confirm that the website behaved as expected for end users.

Both approaches were used throughout development, with automated testing helping to identify technical issues and manual testing confirming that features worked correctly from a user's perspective.



## Live Site Console Check

Following deployment, the live GitHub Pages site was tested using browser Developer Tools. No JavaScript errors, warnings, or missing resources were detected in the console. A favicon was added to remove the previously reported 404 resource request and verify a clean console output on the deployed site.

## Additional user navigational information

The decision was made not to introduce additional page headings across the Driving, Climbing, Skiing, and Hiking package pages, as testing showed they added unnecessary visual clutter and detracted from the overall layout. Instead, the booking button was enhanced with a dynamic, package-specific title that updates according to the selected package within the dropdown menu, providing users with clear contextual feedback before booking. Each package page contains dedicated content and imagery relevant to the activity being presented, ensuring that users are already provided with sufficient context and visual cues without the need for additional headings. This approach maintains a cleaner interface, preserves the visual design, and supports usability by keeping the user's focus on the available packages and booking action.


<a id="light"></a>

## Latest lighthouse screenshots and evaluation

The screenshots below represent the final Lighthouse assessment results for the completed website. Five pages achieved scores of 99+ one page achieved a Performance score of 94 all pages have scores of 100 in Accessibility, Best Practices, and SEO. The remaining recommendations relate primarily to minor performance optimisations, such as image delivery and network-related efficiencies, rather than usability, accessibility, or functionality concerns. Given the consistently high results achieved across the site, I am satisfied that the project meets a strong standard of performance and user experience. Further optimisation was considered; however, the potential gains were minimal and unlikely to provide a meaningful improvement for end users. Therefore, the project was considered complete at this stage, with priority given to maintaining code quality, usability, accessibility, and an effective visual design.

<img  width=400px height=100% src="../screenshots/light-index.png"><img  width=400px height=100% src="../screenshots/light-packages.png"><img  width=400px height=100% src="../screenshots/light-driving.png">

<img  width=400px height=100% src="../screenshots/light-skiing.png"><img  width=400px height=100% src="../screenshots/light-climbing.png"><img  width=400px height=100% src="../screenshots/light-hiking.png">