<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rating;

class RatingSeeder extends Seeder
{
    public function run(): void
    {
        $total = 500000;
        $chunk = 5000;

        for ($i = 0; $i < $total; $i += $chunk) {
            Rating::factory()->count($chunk)->create();
        }
    }
}
