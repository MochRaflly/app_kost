<?php
// Konfigurasi SMTP
$smtp_host = 'smtp.gmail.com';
$smtp_user = 'your_email@gmail.com'; // Ganti dengan email pengirim
$smtp_pass = 'your_app_password';   // Ganti dengan app password Gmail
$smtp_port = 587;
$smtp_secure = 'tls';
$from_name = 'Kos Rafly Residence';

require __DIR__ . '/core/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/core/PHPMailer-master/src/SMTP.php';
require __DIR__ . '/core/PHPMailer-master/src/Exception.php';
require_once __DIR__ . '/core/Database.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendReminder($to, $toName, $kamar, $jatuhTempo, $smtp) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $smtp['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtp['user'];
        $mail->Password = $smtp['pass'];
        $mail->SMTPSecure = $smtp['secure'];
        $mail->Port = $smtp['port'];
        $mail->setFrom($smtp['user'], $smtp['from_name']);
        $mail->addAddress($to, $toName);
        $mail->isHTML(true);
        $mail->Subject = 'Reminder Tagihan Kos - H-3 Jatuh Tempo';
        $mail->Body = "<h3>Reminder Pembayaran Tagihan Kos</h3>"
            ."<p>Yth. $toName,</p>"
            ."<p>Tagihan kamar <b>$kamar</b> akan jatuh tempo pada <b>$jatuhTempo</b>. Mohon segera lakukan pembayaran untuk menghindari denda keterlambatan.</p>"
            ."<p>Terima kasih.<br>Kos Rafly Residence</p>";
        $mail->send();
        return true;
    } catch (Exception $e) {
        file_put_contents(__DIR__.'/reminder_error.log', date('Y-m-d H:i:s')." - Gagal kirim ke $to: ".$mail->ErrorInfo."\n", FILE_APPEND);
        return false;
    }
}

// Ambil data tagihan H-3
$db = (new Database())->getConnection();
$sql = "SELECT p.nama, p.email, k.nomor AS kamar, t.id, t.bulan, DATE_ADD(CONCAT(t.bulan,'-01'), INTERVAL 0 MONTH) + INTERVAL 3 DAY AS jatuh_tempo
        FROM tb_tagihan t
        JOIN tb_kmr_penghuni kp ON t.id_kmr_penghuni = kp.id
        JOIN tb_penghuni p ON kp.id_penghuni = p.id
        JOIN tb_kamar k ON kp.id_kamar = k.id
        WHERE t.jml_tagihan > 0
        AND DATE(DATE_ADD(CONCAT(t.bulan,'-01'), INTERVAL 0 MONTH) + INTERVAL 3 DAY) = CURDATE() + INTERVAL 3 DAY";
$stmt = $db->prepare($sql);
$stmt->execute();
$tagihan = $stmt->fetchAll();

$smtp = [
    'host' => $smtp_host,
    'user' => $smtp_user,
    'pass' => $smtp_pass,
    'port' => $smtp_port,
    'secure' => $smtp_secure,
    'from_name' => $from_name
];

$total = 0;
foreach ($tagihan as $row) {
    if (sendReminder($row['email'], $row['nama'], $row['kamar'], $row['jatuh_tempo'], $smtp)) {
        $total++;
    }
}
echo "Sukses mengirim reminder ke $total penghuni.\n"; 