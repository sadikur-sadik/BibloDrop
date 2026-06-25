# BiblioDrop

## Description: 
This is my first industry level project, where I handled both backend and frontend. This project is about reading books. So, it is a perfect book for avit readers. It this app, there are several roles- Admin, Librarian, Reader. They each have distinct features and interfaces. Readers can borrow books, submit review on it, while the Librarians most books and delivers it to the readers. On the other hand, the admin watchover all the operations.

## Role Based Functionality:
### Admin:
- Dashboard: The dashboard will show the total revenue, reviews, and user related information such as number of users, how many books are delivered etc.Visual Representation of data by rechart.
- Approvals: They can approve the librarians to post books, promote or demote an user's role. They can even publish or unpublish books
- Transaction History: They can see the transaction history
### Librarian:
- Dashboard: The dashboard will show only the revenue, reviews, and user related information of how many books are delivered etc of their books.Visual Representation of data by rechart.
- Add books: Librarians, who are given approval, can add books with necessary information
- Inventory Management: Librarian can update, publish/unpublish, or delete their books.
- Manage Deliveries: Librarian can give live information to the readers about the book they bought. Librarian can - give info of dispatching and successfully delivered.
### Reader:
- Dashboard: Readers can see information about their spending, how many books they have read (delivered) etc.Visual Representation of data by rechart.
- Delivery History: Readers can see live update of their requested books
- My Reading List: Readers can see the books they have completed so far (delivered books only).
- My Reviews : Readers can see every interactions they made. They can also edit or delete the interactions.

## Features:
- Browse books section to display all published books.
- Pagination, Filter, Sort, Search from backend. And these operations can be copied too.
- In the details section of a book, people who only never borrowed the book or someone who is not owner of the book.
- Only the people who borrowed the book can pass a review.
- Banner with carousel.
- Stats, Top librarian static sections.
- Categories section. Clicking these will take users to browse page with specific filter applied.
- Footer, Navbar , Theme toggle, editing profile, contact authority etc. also available.

## Technologies:

### FrontEnd:
- HTML5
- CSS3
- JS (ES6)
- Next js
- MongoDB
- Better Auth
- Stripe (Payment integration)
- ReChart
- Hero UI
- React Toastify
### BackEnd:
- Node.js
- Express.js
- MONGODB
- CORS
- DOTENV
- JWT authorization