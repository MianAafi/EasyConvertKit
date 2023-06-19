<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class fileDelete extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:file-delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'del file every day';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        File::deleteDirectory(storage_path('app/public/allFiles/'));
        Log::info("cron job run");
        $this->info("del");
        
      
    }
}
