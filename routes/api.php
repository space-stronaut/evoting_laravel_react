<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\MeController;
use App\Http\Controllers\Api\KecamatanController;
use App\Http\Controllers\Api\CalonController;
use App\Http\Controllers\Api\DesaController;
use App\Http\Controllers\Api\TpsController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VotingController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = User::find(Auth::user()->id);

    return response()->json([
        'user' => $user
    ]);
});

Route::middleware('auth:sanctum')->get('/me', MeController::class);

Route::middleware('auth:sanctum')->get('/logout', LogoutController::class);

Route::post('/login', LoginController::class)->name('login');
Route::get('/logout', LogoutController::class);
Route::resource('/kecamatan', KecamatanController::class);
Route::resource('calon', CalonController::class);
Route::post('/calon/{id}', [CalonController::class, 'update']);
Route::resource('desa', DesaController::class);
Route::get('/desa/search/{id}', [DesaController::class, 'search']);
Route::get('/calon/search/{id}', [CalonController::class, 'search']);
Route::get('/kecamatan/search/{id}', [KecamatanController::class, 'search']);
Route::resource('tps', TpsController::class);
Route::delete('/tps/{id}', [TpsController::class, 'destroy']);
Route::get('/tps/search/{id}', [TpsController::class, 'search']);
Route::resource('user', UserController::class);
Route::get('/user/search/{id}', [UserController::class, 'search']);
Route::resource('voting', VotingController::class);