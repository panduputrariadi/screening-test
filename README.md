# 📚 Book & Author Rating Platform

A full-stack application for browsing authors, exploring books, and giving ratings.  
Backend built with **Laravel 12** (`book-api`) and frontend built with **Next.js** (`book-store`).

---

## ✨ Features

### 🔍 Public Features
- **Read Authors** — sortable by voter count.
- **Read Books** — with pagination, per-page filter, and search.
- **Search & Filter** — search by author name or book title.
- **Pagination** — consistent across authors and books.

### 📝 Authenticated Features
- **Insert Rating** — user can rate a book (supports float values).
- **Store Data** — ratings save:
  - `author_id`
  - `book_id`
  - `rating`
- **No Duplicate Ratings** — one rating per user per book.

---

## 🛠 Tech Stack

**Backend (`book-api`)**
- Laravel 12
- MySQL
- Sanctum / JWT Authentication

**Frontend (`book-store`)**
- Next.js
- React Query
- Shadcn UI
- Tailwind CSS

---

## 📦 Installation Guide

### 1️⃣ Prerequisites
Pastikan sebelum memulai:
- [Composer](https://getcomposer.org/download/) terinstall
- [Node.js](https://nodejs.org/) terinstall (disarankan versi LTS)
- [MySQL](https://dev.mysql.com/downloads/) berjalan di local

---

### 2️⃣ Clone Repository
```bash
git clone https://github.com/your-repo.git
cd your-repo
