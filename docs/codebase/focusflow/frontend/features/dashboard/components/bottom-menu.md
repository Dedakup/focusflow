# Bottom menu

This component includes the following functionality and components:

* **Player Component**: Displays the player in the bottom left corner. (Consider allowing the player to be placed in the main element outside the bottom menu, as it doesn't adhere to its rules.)
* **Right Bottom section**: Displays three components in the bottom right corner: music selector, sound control panel, and background selector. These components are hidden after 1.5 seconds.
* **Backlight Effect**: Shows a backlight effect from the bottom of the page when the right section is active.
* **State Management**: Does not transfer information directly to child elements. All state communication should be handled through Redux.
* **Logic Separation**: Does not implement the logic of child components directly. Instead, child elements should use custom hooks for their functionality.
