# Frontend Assignment: Chip Input Component

The assignment involves the creation of an Angular2+ component that implements the functionality of a chip input.

## Chip Input

A chip input is a form control that can be used to select and remove multiple items from a list of suggestions using auto-complete functionality. The following animation is an example for a chip input.

![React Chip Layout](https://github.com/gregchamberlain/react-chips/raw/master/assets/example.gif)

## User Story

When a user enters text in the input field, a list of suggestions is shown, that can be chosed by the user. The suggestions can be navigated using the keyboard or the mouse, a click or enter press selects the currently highlighted item. The selected item is added as a chip into the input field. This process can be repeated indefinitely.

## Constraints

The component should be implemented as an Angular2+ form control, which means it should behave like a regular form control, including ngModel and reactive form functionality, therefore it must implement the `ControlValueAccessor` interface. Further, the component should receive the list of possible items (suggestions) as an `Input`. The output value of the form control should be a list of the selected items. The component also should have a `value` field, that always holds the current
form control value.

## How to work on the assessment

*   Clone this repository
*   Start working on the assignment
*   Please do periodic commits with meaningful commit messages
*   Once you are done push your final results
*   If you don't want to create a public repository please invite (@phelmig, @erzaehlsalex, @flore2003) to your working repository
*   Please include a brief description how to run your solution
*   If you have any questions contact us (jobs@rocketloop.de)

Please note that we don't accept solutions without periodic commits or if we are unable to execute the solution.

