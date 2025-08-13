<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;
use Illuminate\Support\Facades\DB;


class BookSeeder extends Seeder
{
    public function run(): void
    {
        DB::disableQueryLog();

        $total = 100000;
        $chunk = 5000;

        for ($i = 0; $i < $total; $i += $chunk) {
            $data = Book::factory()
                ->count($chunk)
                ->make()
                ->toArray();

            Book::insert($data); 
        }
    }
}
