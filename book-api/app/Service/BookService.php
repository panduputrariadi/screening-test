<?php

namespace App\Service;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class BookService
{
    public function getAllBook(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'page' => 'required|integer',
                'per_page' => 'required|integer',
                'search' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Page and per_page are required',
                    'data' => $validator->errors()
                ], Response::HTTP_BAD_REQUEST);
            }

            $books = Book::with(['author', 'category'])
                ->where('title', 'like', '%' . $request->search . '%')
                ->withCount(['rating_book as total_voters'])
                ->withAvg(['rating_book as avg_rating'], 'rating')
                // ->orderByDesc('avg_rating')
                ->paginate($request->per_page);
            $books->getCollection()->transform(function ($book) {
                $book->avg_rating = $book->avg_rating ? round((float) $book->avg_rating, 2) : 0;
                return $book;
            });
            return response()->json([
                'status' => true,
                'message' => 'success',
                'data' => [
                    'items' => $books->items(),
                    'meta' => [
                        'current_page' => $books->currentPage(),
                        'total' => $books->total(),
                        'per_page' => $books->perPage(),
                        'last_page' => $books->lastPage(),
                        'from' => $books->firstItem(),
                        'to' => $books->lastItem()
                    ]
                ]
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => []
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function dropdownBookByID(Request $request)
    {
        try {
            $books = Book::select(['id', 'title', 'author_id'])->limit(10);
            if($request->has('search')) {
                $books->where('author_id', 'like', '%' . $request->search . '%');
            }
            if($request->has('title')) {
                $books->where('title', 'like', '%' . $request->title . '%');
            }
            $books = $books->get();
            if($books) {
                return response()->json([
                    'status' => true,
                    'message' => 'Success',
                    'data' => $books
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Not found',
                    'data' => []
                ], Response::HTTP_NOT_FOUND);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => []
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
