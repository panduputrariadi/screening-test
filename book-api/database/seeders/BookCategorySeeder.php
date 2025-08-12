<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BookCategory;

class BookCategorySeeder extends Seeder
{
    public function run(): void
    {
        BookCategory::factory()->count(3000)->create();
    }
}
