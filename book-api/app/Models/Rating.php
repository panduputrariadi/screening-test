<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Book;
use App\Models\Author;

class Rating extends Model
{
    use HasFactory;
    protected $table = 'ratings';

    protected $fillable = [
        'book_id',
        'author_id',
        'rating',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
