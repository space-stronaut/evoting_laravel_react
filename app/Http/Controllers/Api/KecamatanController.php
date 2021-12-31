<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kecamatan;
use Illuminate\Http\Request;

class KecamatanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kecamatans = Kecamatan::all();

        return response()->json([
            'kecamatans' => $kecamatans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate([
            'namaKecamatan' => ['required']
        ]);

        Kecamatan::create([
            'namaKecamatan' => $request->namaKecamatan
        ]);

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Kecamatan::find($id)->update([
            'namaKecamatan' => $request->namaKecamatan
        ]);

        return response()->json([
            'status' => true
        ],200);
    }

    public function search($id)
    {
        $query = $id;

        $kecamatans = Kecamatan::where('namaKecamatan', 'like', '%'.$query.'%')->get();

        return response()->json([
            'kecamatans' => $kecamatans
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Kecamatan::find($id)->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
