<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Ronald Abel Hermansyah',
            'email' => 'admin@gmail.com',
            'password' => bcrypt(123456),
            'noHp' => '089501860576',
            'roles' => 'admin'
        ]);
    }
}
