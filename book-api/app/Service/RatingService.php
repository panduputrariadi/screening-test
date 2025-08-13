<?php

namespace App\Service;

use App\Models\Author;
use App\Models\Book;
use App\Models\Rating;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RatingService
{
    public function giveRating(Request $request)
    {
        try {
            // Validasi data request
            $validated = $request->validate([
                'author_id' => 'required|integer|exists:authors,id',
                'book_id'   => 'required|integer|exists:books,id',
                'rating'    => 'required|numeric|min:0|max:10'
            ]);

            // Cek author
            $author = Author::find($validated['author_id']);
            if (!$author) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Author not found',
                    'data'    => []
                ], Response::HTTP_NOT_FOUND);
            }

            // // Cek book milik author tersebut
            $book = Book::where('id', $validated['book_id'])
                        ->where('author_id', $validated['author_id'])
                        ->first();

            if (!$book) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Book not found for this author',
                    'data'    => []
                ], Response::HTTP_NOT_FOUND);
            }

            // Simpan rating
            $rating = Rating::create([
                'author_id' => $validated['author_id'],
                'book_id'   => $validated['book_id'],
                'rating'    => $validated['rating']
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Rating saved successfully',
                'data'    => $rating
            ], Response::HTTP_CREATED);

        } catch (\Throwable $th) {
            return response()->json([
                'status'  => false,
                'message' => $th->getMessage(),
                'data'    => []
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
