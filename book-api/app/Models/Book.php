<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Author;
use App\Models\BookCategory;
use App\Models\Rating;

class Book extends Model
{
    use HasFactory;
    protected $table = 'books';

    protected $fillable = [
        'title',
        'description',
        'author_id',
        'category_id',
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(BookCategory::class);
    }

    public function rating_book()
    {
        return $this->hasMany(Rating::class, 'book_id');
    }
}
