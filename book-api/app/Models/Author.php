<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Book;
use App\Models\Rating;

class Author extends Model
{
    use HasFactory;
    protected $table = 'authors';

    protected $fillable = [
        'name',
    ];

    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function rating_author_given()
    {
        return $this->hasMany(Rating::class, 'author_id');
    }

    public function total_rating_author()
    {
        return $this->hasManyThrough(Rating::class, Book::class, 'author_id', 'book_id');
    }
}
