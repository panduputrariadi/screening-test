<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rating;
use Illuminate\Support\Facades\DB;

class RatingSeeder extends Seeder
{
    public function run(): void
    {
        DB::disableQueryLog();
        $total = 500000;
        $chunk = 5000;

        for ($i = 0; $i < $total; $i += $chunk) {
            $data = Rating::factory()
                ->count($chunk)
                ->make()
                ->toArray();

            Rating::insert($data);
        }
    }
}
