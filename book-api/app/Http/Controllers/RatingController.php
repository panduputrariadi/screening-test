<?php

namespace App\Http\Controllers;

use App\Service\RatingService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RatingController extends Controller
{
    protected $ratingService;

    public function __construct(RatingService $ratingService)
    {
        $this->ratingService = $ratingService;
    }

    public function store(Request $request)
    {
        $action = $request->input('action');

        switch ($action) {
            case 'give':
                return $this->ratingService->giveRating($request);
                break;
            default:
                return response()->json([
                    'status'  => false,
                    'message' => 'Invalid action',
                    'data'    => []
                ], Response::HTTP_BAD_REQUEST);
        }
    }
}
