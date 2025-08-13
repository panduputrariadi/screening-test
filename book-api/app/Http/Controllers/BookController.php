<?php

namespace App\Http\Controllers;

use App\Service\BookService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    public function index(Request $request)
    {
        $action = $request->input('action');
        switch ($action) {
            case 'all':
                return $this->bookService->getAllBook($request);
                break;
            case 'dropdown-id':
                return $this->bookService->dropdownBookByID($request);
                break;
            default:
                return response()->json([
                    'status' => false,
                    'message' => 'Action not found',
                    'data' => []
                ])
                    ->setStatusCode(Response::HTTP_NOT_FOUND);
                break;
        }
    }
}
