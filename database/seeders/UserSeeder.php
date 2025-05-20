<?php

namespace Database\Seeders;

use App\Models\User;
use DB;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
 public function run()
    {
       $password = 'md5'.md5('admin'.'password');
        User::create([
            'name' => 'admin',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => $password,
            'activo' => true,
            'remember_token' => Str::random(10),
        ]);
    }
}
