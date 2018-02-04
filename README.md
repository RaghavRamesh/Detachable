# Detachable
This utility allows you to cancel the handling of an asynchronous/delayed callback, even after the invocation of the asynchronous function.

### How it works
The utility accepts a handler/a list of handlers, and returns a thin wrapper around the original handler(s). If desired, these wrapped handlers can be detached by the handler creator, before they are dispatched. 

Notes: 
- In JavaScript, handlers (callbacks) cannot be prevented from executing. This utility merely prevents the original handlers from executing when the detachable handlers dispatch.
- The simpler alternative would be to use a flag that can be set by the handler creator to indicate that the handlers should prevent their default behaviour (if desired). Depending on the state of this flag, the handlers can perform their default behaviour or otherwise. The value provided by this utility class is that it aids in establishing a more elegant convention that improvescode readability. 

### Acknowledgements
- Developed under the guidance of Ian Loh, Product Team Lead at G Element 
