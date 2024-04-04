<?php

namespace App\Triats;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Events\Verified;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

trait HasEmailVerification
{

    function createEmailVerificationToken()
    {
        $token = bin2hex(random_bytes(50 / 2));

        $expiresAt = Carbon::now()->addMinutes(60);

        DB::table('email_verification_tokens')->insert([
            'user_id' => $this->id,
            'email' =>  $this->email,
            'token' =>   $token,
            'expires_at' => $expiresAt,
            'created_at' => Carbon::now()
        ]);

        return  $token;
    }

    function  emailVerificationTokens()
    {
        return  DB::table('email_verification_tokens')
            ->where('user_id', $this->id);
    }

    public function sendEmailVerificationNotification()
    {
        if ($this->hasVerifiedEmail()) return;
        if ($this->notify(new EmailVerificationNotification())) return true;
    }

    public function verifyEmail(string $token)
    {
        if ($this->hasVerifiedEmail()) {
            return 'email-already-verified';
        }


        $email = $this->email;

        $record = DB::table('email_verification_tokens')
            ->where('email', $email)
            ->where('token', $token)
            ->whereNull('last_used_at')
            ->latest()
            ->first();

        if ($record && Carbon::parse($record->expires_at)->isFuture()) {
            if ($this->markEmailAsVerified()) {
                event(new Verified($this));
                DB::table('email_verification_tokens')
                    ->where('id', $record->id)
                    ->update(['last_used_at' => Carbon::now()]);
                return 'verification-successful';
            }
        }

        return $record ? 'token-has-expired' : 'token-is-invalid';
    }
}


class EmailVerificationNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject('Verify Email Address')
            ->line('Please click the button below to verify your email address.')
            ->action('Verify Email Address', $verificationUrl)
            ->line('Make sure you\'re logged in on the device to verify the email')
            ->line('If you did not create an account, no further action is required.');
    }

    protected function verificationUrl($notifiable)
    {

        $email = $notifiable->getEmailForVerification();


        $token = $notifiable->createEmailVerificationToken();

        return config('app.frontend_url') . "/verify-email/{$email}/{$token}";
    }



    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
