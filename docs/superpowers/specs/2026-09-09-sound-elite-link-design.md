# Sound Elite Theatres Testimonial Link

## Goal

Make the existing “Sound Elite Theatres” testimonial attribution a clear, polished link to the client website.

## Placement

Keep the link inside the existing testimonial citation in `components/sections/Shift.tsx`. Do not add another mention elsewhere on the page.

## Interaction

- Link to `https://soundelitetheatres.com/`.
- Open the destination in a new tab.
- Use `rel="noopener noreferrer"` for the external link.
- Keep the entire name and arrow inside one clickable target.

## Visual Treatment

- Preserve the attribution’s existing serif typography and muted color.
- Underline “Sound Elite Theatres” with a small offset from the text.
- Add a northeast arrow, `↗`, immediately after the name.
- On hover, strengthen the link color and move the arrow slightly up and right.
- Add a visible `:focus-visible` outline for keyboard users.
- Respect reduced-motion preferences by disabling arrow movement.

## Responsive Behavior

The attribution may wrap naturally on narrow screens. The arrow stays attached to the linked name and remains readable at the existing citation font size.

## Verification

- Confirm the rendered link has the correct destination, new-tab behavior, and safe `rel` value.
- Run the project’s relevant automated checks and production build.
- Inspect the testimonial treatment at desktop and mobile widths.
