<?php

namespace App\Service;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class AuthorService
{
    public function getAllAuthor(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'page' => 'required|integer',
                'per_page' => 'required|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Page and per_page are required',
                    'data' => $validator->errors()
                ], Response::HTTP_BAD_REQUEST);
            }

            $per_page = $request->input('per_page', 10);
            $page = $request->input('page', 1);

            $authors = Author::with(['books', 'rating_author_given'])
                ->withCount('rating_author_given')->paginate($per_page, ['*'], 'page', $page);

            return response()->json([
                'status' => true,
                'message' => 'Success',
                'data' => [
                    'items' => $authors->items(),
                    'meta' => [
                        'current_page' => $authors->currentPage(),
                        'total' => $authors->total(),
                        'per_page' => $authors->perPage(),
                        'last_page' => $authors->lastPage(),
                        'from' => $authors->firstItem(),
                        'to' => $authors->lastItem(),
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
}
