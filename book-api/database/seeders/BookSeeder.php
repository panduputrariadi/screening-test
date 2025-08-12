<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $total = 100000;
        $chunk = 5000;

        for ($i = 0; $i < $total; $i += $chunk) {
            Book::factory()->count($chunk)->create();
        }
    }
}
