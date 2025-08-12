<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\BookCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'title' => fake()->name(),
            'description' => fake()->name(),
            'author_id' => Author::inRandomOrder()->first()->id ?? Author::factory(),
            'category_id' => BookCategory::inRandomOrder()->first()->id ?? BookCategory::factory(),
        ];
    }
}
