#### Issues
- /mock-api
  - add step to run `npm build` before `npm run start`

#### Notes
##### Create new client feature
Further Improvements
- Accessibility can be further improved.
  - Should be able to move to next step on `Enter` key press given that the `Continue` button is enabled.
  - Should be able to submit the form on `Enter` key press given that the submit button is enabled.
- Validation can be further improved.
  - Might be better to use a tested library like [zod](https://zod.dev/)
- Form handling can be further improved.
  - Either create a `useForm` hook to facilitate handling of form values and submission.
  - or use a tested library like [react-hook-form](https://react-hook-form.com/)
##### Search client feature
- Can probably add autocomplete feature
- Can further enhance search algo to fuzzy search and search content can include the other fields as well.
##### UI enhancements
- UI responsiveness could be better
- Override default styles of mui components to match the design
