<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Desa;
use App\Models\Tps;
use Illuminate\Http\Request;

class TpsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tps = Tps::join('desas', 'tps.desaId', '=', 'desas.id')
                ->select('tps.*', 'desas.nama AS namaDesa')    
                ->get();
        $desas = Desa::all();

        return response()->json([
            'tps' => $tps,
            'desas' => $desas
        ]);
    }

    public function search($id)
    {
        $query = $id;
        $tps = Tps::join('desas', 'tps.desaId', '=', 'desas.id')
        ->select('tps.*', 'desas.nama AS namaDesa')->where('tps.nama', 'like', '%'.$query.'%')->get();
    
        return response()->json([
            'tps' => $tps
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Tps::create($request->all());

        return response()->json([
            'status' => true
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
        Tps::find($id)->update($request->all());

        return response()->json([
            'status' => true
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
        Tps::find($id)->delete();

        return response()->json([
            'status' => true
        ]);
    }
}
