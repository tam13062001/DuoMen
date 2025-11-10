<?php
require_once ABSPATH . WPINC . '/PHPMailer/PHPMailer.php';
require_once ABSPATH . WPINC . '/PHPMailer/SMTP.php';
require_once ABSPATH . WPINC . '/PHPMailer/Exception.php';
class SMTP_Mailer {
    public PHPMailer\PHPMailer\PHPMailer $mail;

    function __construct() {
        $this->mail = new PHPMailer\PHPMailer\PHPMailer(true);;
        $this->mail->CharSet = 'UTF-8';
    }

    public function load(array $config) {
        $port = (int) $config['port'];
//        $this->mail->SMTPDebug = 2;
        $this->mail->isSMTP();
        $this->mail->Host = $config['host'];
        $this->mail->Port = $port;
        $this->mail->SMTPAuth = $config['auth'] ?? true;
        $this->mail->Username = $config['username'];
        $this->mail->Password = $config['password'];
        $this->mail->SMTPSecure = $config['secure'];

    }

    public function send(array $payload) {
        $subject = $payload['subject'] ?? '';
        $body = $payload['body'] ?? '';
        $receiver = $payload['receiver'] ?? '';

        $this->mail->setFrom($this->mail->Username);
        $this->mail->addAddress($receiver);
        $this->mail->isHTML(false);
        $this->mail->Subject = $subject;
        $this->mail->Body = $body;
        $this->mail->send();
        return true;
    }
}