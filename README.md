# 📚 Book & Author Rating Platform

A full-stack application for exploring authors, browsing books, and adding ratings.  
Built with **Laravel 12** for the backend (`book-api`) and **Next.js** for the frontend (`book-store`).

---

## ✨ Features

### 🔍 Public Features
- **Read Authors** — sortable by number of voters.
- **Read Books** — with pagination, per-page filter, and search.
- **Search & Filter** — search by author name, book title, or both.
- **Pagination** — all read endpoints include page size and current page control.

### 📝 Authenticated Features
- **Insert Rating** — users can rate books, storing:
  - `author_id`
  - `book_id`
  - `rating`
- **Prevent Duplicate Ratings** — one rating per user per book.

---

## 🛠 Tech Stack
**Backend (`book-api`)**
- Laravel 12
- MySQL (or any database supported by Laravel)
- Sanctum/JWT authentication

**Frontend (`book-store`)**
- Next.js
- React Query
- Shadcn UI
- Tailwind CSS

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo.git
cd your-repo
