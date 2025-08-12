<?php

namespace App\Http\Controllers;

use App\Service\AuthorService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthorController extends Controller
{
    protected $authorService;

    public function __construct(AuthorService $authorService)
    {
        $this->authorService = $authorService;
    }

    public function index(Request $request)
    {
        $action = $request->input('action');

        switch ($action) {
            case 'all':
                return $this->authorService->getAllAuthor($request);
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
