

1. App.js: Routes for login, signup, home, and view blog. Includes Header for navigation.

2. auth.jsx: Contains functions for user registration (doCreateUserWithEmailAndPassword), login (loginWithEmailAndPassword, loginWithGoogle), and logout (logOut).

3. login.jsx: Redirects to home if logged in, allows email/password and Google login, shows error messages on failure.

4. signup.jsx: Redirects to home if logged in, checks password match, displays registration form, includes a login link.

5. header.jsx: Displays login/register links if not logged in, shows welcome message and logout button if logged in.

6. home.jsx: Split layout (40% for Add Blog, 60% for Blog List). Displays a blog form and list.

7. addBlogForm.jsx: Displays a form for adding/editing blogs with title, description (WYSIWYG), and image upload. Handles submission and updates.

8. blogList.jsx: Fetches and displays blogs. Includes actions for view, edit, delete, pagination, and a modal for editing.

9. ViewBlog.jsx: Displays full blog content. Handles blog retrieval and renders with inline styles. Includes a back button.

10. blogSlice.jsx: Redux slice for managing blogs, includes async actions (fetch, update), and reducers to manage state (e.g., currentBlog).

11. store.jsx: Configures Redux store with blogReducer, making blog data available across the app.

12. AuthContext.jsx: Provides authentication state (currentUser, userLoggedIn, loading) via context.

13. useAuth Hook: Custom hook for accessing auth state in components.

14. AuthContextProvider: Manages auth state, subscribes to Firebase’s onAuthStateChanged, and controls loading state.

15. Context Provider: Passes auth values to app, ensures children render only after auth state is initialized.

16. Firebase Integration: Handles Firebase Authentication for login and registration.

17. Error Handling: Displays error messages for login and signup failures.

18. Conditional Routing: Protects routes by checking login state before allowing access.

19. State Management: Uses Redux for blog state and AuthContext for authentication.

20. Responsive UI: Bootstrap and inline styles for layout and responsiveness.

This setup provides a structured app with authentication, blog management, and responsive UI components.