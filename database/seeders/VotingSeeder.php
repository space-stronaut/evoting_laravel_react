<?php

namespace Database\Seeders;

use App\Models\Voting;
use Illuminate\Database\Seeder;

class VotingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Voting::create([
            'userId' => 1,
            'calon_id' => 2,
        ]);
    }
}
