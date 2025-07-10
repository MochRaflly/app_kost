<?php
class SMSGateway {
    private $userkey = 'your_userkey'; // Ganti dengan userkey dari provider SMS
    private $passkey = 'your_passkey'; // Ganti dengan passkey dari provider SMS
    private $url = 'https://reguler.zenziva.net/apps/smsapi.php'; // Contoh Zenziva

    public function sendSMS($to, $message) {
        $params = [
            'userkey' => $this->userkey,
            'passkey' => $this->passkey,
            'nohp' => $to,
            'pesan' => $message
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);
        if ($err) {
            file_put_contents(__DIR__.'/../sms_error.log', date('Y-m-d H:i:s')." - Gagal kirim ke $to: $err\n", FILE_APPEND);
            return false;
        }
        // Bisa tambahkan parsing response jika perlu
        return true;
    }
} 