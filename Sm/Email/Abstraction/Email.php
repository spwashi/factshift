<?php
/**
 * User: sam
 * Date: 7/16/15
 * Time: 7:06 PM
 */

namespace Sm\Email\Abstraction;

use Exception;
use Sm\Development\Log;
use Sm\Response\Http;

abstract class Email implements EmailInterface {
    public    $recipient                 = [];     #   Jane Recipient<jane@email.com>, Joe Recipient<joe@email.com>
    public    $cc                        = [];
    public    $bcc                       = [];
    public    $from                      = '';      #   Steve via Spwashi <sender@spwashi.com>
    public    $sender                    = '';      #   noreply@spwashi.com
    public    $reply_to                  = '';      #   Steve Doe <stevedoe@gmail.com>
    public    $content                   = '';      #   A string of the email's content
    public    $alt_text                  = '';      #   Because some clients can't produce HTML content
    public    $attachments               = [];     #   An array of paths to the attachments
    public    $subject                   = '';
    protected $headers                   = [];
    public    $mime_version              = null;
    public    $content_type              = 'text/plain';
    public    $message_type              = '';
    public    $charset                   = 'iso-8859-1';
    public    $is_smtp                   = false;
    public    $host                      = '';
    public    $hash;
    public    $content_transfer_encoding = '7bit';
    public    $date;
    public    $word_wrap                 = 70;
    public    $iCal;
    public    $send_method               = 'mail';
    public    $error                     = null;
    const EOL   = "\n";
    const CR_LF = "\r\n";#carriage return, line feed
    protected $entity_uid;
    protected $boundaries = [null, null, null, null];
    public    $message_id;
    protected $last_message_id;
    protected $priority;
    public    $confirm_reading_to;
    public    $MIMEHeader;
    public    $MIMEBody;
    public    $mail_header;
    #todo
    protected $sign_key_file;

    protected function setHash() {
        return $this->hash = md5(uniqid(time()));
    }
    protected function add_header_line($key, $value) {
        $line_end = static::EOL;
        return "{$key}: {$value}$line_end";
    }
    protected function add_text_line($value) {
        $line_end = static::EOL;
        return "{$value}$line_end";
    }
    public function addHeader($string) {
        $this->headers[] = $string;
    }
    public function addRecipient($email, $name = null, $type = null) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        $add = "{$name} <{$email}>";
        switch ($type):
            case 'cc':
                $this->cc[] = $add;
                break;
            case 'bcc':
                $this->bcc[] = $add;
                break;
            default:
                $this->recipient[] = $add;
        endswitch;
        return true;
    }
    public function setFrom($email, $name = null) {
        $this->from = "{$name} <{$email}>";
    }
    public function setSender($email, $name = null) {
        $this->sender = "{$name} <{$email}>";
    }

    protected function getMimeHeaders() {
        $result                = [];
        $is_multipart          = true;
        $boundary              = $this->boundaries[0];
        $content_type_boundary = "\tboundary=\"{$boundary}\"";

        switch ($this->message_type) :
            case 'inline':
                $result[] = 'Content-Type: multipart/related;';
                $result[] = $content_type_boundary;
                break;
            case 'attach':
            case 'inline_attach':
            case 'alt_attach':
            case 'alt_inline_attach':
                $result[] = 'Content-Type: multipart/mixed;';
                $result[] = $content_type_boundary;
                break;
            case 'alt':
            case 'alt_inline':
                $result[] = 'Content-Type: multipart/alternative;';
                $result[] = $content_type_boundary;
                break;
            default:        # Catches case 'plain': and case '':
                $content_type = $this->content_type;
                $charset      = $this->charset;
                $result[]     = "Content-Type:{$content_type};charset=\"{$charset}\"";
                $is_multipart = false;
                break;
        endswitch;

        $content_transfer_encoding = $this->content_transfer_encoding;
        if ($this->content_transfer_encoding != '7bit') {
            if ($is_multipart) {
                # RFC 2045 section 6.4 says multipart MIME parts may only use 7bit, 8bit or binary CTE
                if ($this->content_transfer_encoding == '8bit') {
                    $result[] = "Content-Transfer-Encoding:{$content_transfer_encoding};";
                }
                # The only remaining alternatives are quoted-printable and base64, which are both 7bit compatible
            } else {
                $result[] = "Content-Transfer-Encoding:{$content_transfer_encoding};";
            }
        }

        return implode(static::EOL, $result);
    }
    public static function rfcDate() {
        date_default_timezone_set(@date_default_timezone_get());
        return date('D, j M Y H:i:s O');
    }
    /**
     * Ensure consistent line endings in a string.
     * Changes every end of line from CR_LF, CR or LF to static::EOL.
     *
     * @param string $str String to fixEOL
     *
     * @return string
     */
    public function fixEOL($str) {
        // Normalise to \n
        $new_str = str_replace(["\r\n", "\r"], "\n", $str);
        // Now convert LE as needed
        if (static::EOL !== "\n") {
            $new_str = str_replace("\n", static::EOL, $new_str);
        }
        return $new_str;
    }
    /**
     * Find the last character boundary prior to $maxLength in a utf-8
     * quoted-printable encoded string.
     * Original written by Colin Brown.
     *
     * @param string  $encodedText utf-8 QP text
     * @param integer $maxLength   Find the last character boundary prior to this length
     *
     * @return integer
     */
    protected function utf8CharBoundary($encodedText, $maxLength) {
        $foundSplitPos = false;
        $lookBack      = 3;
        while (!$foundSplitPos) {
            $lastChunk      = substr($encodedText, $maxLength - $lookBack, $lookBack);
            $encodedCharPos = strpos($lastChunk, '=');
            if (false !== $encodedCharPos) {
                // Found start of encoded character byte within $lookBack block.
                // Check the encoded byte value (the 2 chars after the '=')
                $hex = substr($encodedText, $maxLength - $lookBack + $encodedCharPos + 1, 2);
                $dec = hexdec($hex);
                if ($dec < 128) {
                    // Single byte character.
                    // If the encoded char was found at pos 0, it will fit
                    // otherwise reduce maxLength to start of the encoded char
                    if ($encodedCharPos > 0) {
                        $maxLength = $maxLength - ($lookBack - $encodedCharPos);
                    }
                    $foundSplitPos = true;
                } elseif ($dec >= 192) {
                    // First byte of a multi byte character
                    // Reduce maxLength to split at start of character
                    $maxLength     = $maxLength - ($lookBack - $encodedCharPos);
                    $foundSplitPos = true;
                } elseif ($dec < 192) {
                    // Middle byte of a multi byte character, look further back
                    $lookBack += 3;
                }
            } else {
                // No encoded character found
                $foundSplitPos = true;
            }
        }
        return $maxLength;
    }
    /**
     * Word-wrap message.
     * For use with mailers that do not automatically perform wrapping
     * and for quoted-printable encoded messages.
     * Original written by philippe.
     *
     * @param string  $message The message to wrap
     * @param integer $length  The line length to wrap to
     * @param boolean $qp_mode Whether to run in Quoted-Printable mode
     *
     * @return string
     */
    protected function wrapText($message, $length, $qp_mode = false) {
        if ($qp_mode) {
            $soft_break = sprintf(' =%s', static::EOL);
        } else {
            $soft_break = static::EOL;
        }
        // since utf-8 encoding is used, we need to make sure we don't split multi-byte characters when we wrap
        $line_end_length = strlen(static::EOL);
        $crlflen         = strlen(self::CR_LF);

        $message = $this->fixEOL($message);
        //Remove a trailing line break
        if (substr($message, -$line_end_length) == static::EOL) {
            $message = substr($message, 0, -$line_end_length);
        }

        //Split message into lines
        $lines = explode(static::EOL, $message);
        //Message will be rebuilt in here
        $message = '';
        foreach ($lines as $line) {
            $words      = explode(' ', $line);
            $buf        = '';
            $first_word = true;
            foreach ($words as $word) {
                if ($qp_mode and (strlen($word) > $length)) {
                    $space_left = $length - strlen($buf) - $crlflen;
                    if (!$first_word) {
                        if ($space_left > 20) {
                            $len  = $space_left;
                            $len  = $this->utf8CharBoundary($word, $len);
                            $part = substr($word, 0, $len);
                            $word = substr($word, $len);
                            $buf .= ' ' . $part;
                            $message .= $buf . sprintf('=%s', self::CR_LF);
                        } else {
                            $message .= $buf . $soft_break;
                        }
                        $buf = '';
                    }
                    while (strlen($word) > 0) {
                        if ($length <= 0) {
                            break;
                        }
                        $len  = $length;
                        $len  = $this->utf8CharBoundary($word, $len);
                        $part = substr($word, 0, $len);
                        $word = substr($word, $len);
                        if (strlen($word) > 0) {
                            $message .= $part . sprintf('=%s', self::CR_LF);
                        } else {
                            $buf = $part;
                        }
                    }
                } else {
                    $buf_o = $buf;
                    if (!$first_word) {
                        $buf .= ' ';
                    }
                    $buf .= $word;

                    if (strlen($buf) > $length and $buf_o != '') {
                        $message .= $buf_o . $soft_break;
                        $buf = $word;
                    }
                }
                $first_word = false;
            }
            $message .= $buf . self::CR_LF;
        }

        return $message;
    }
    /**
     * Apply word wrapping to the message body.
     * Wraps the message body to the number of chars set in the WordWrap property.
     * You should only do this to plain-text bodies as wrapping HTML tags may break them.
     * This is called automatically by createBody(), so you don't need to call it yourself.
     *
     * @return void
     */
    protected function setWordWrap() {
        if ($this->word_wrap < 1) {
            return;
        }
        switch ($this->message_type) {
            case 'alt':
            case 'alt_inline':
            case 'alt_attach':
            case 'alt_inline_attach':
                $this->alt_text = $this->wrapText($this->alt_text, $this->word_wrap);
                break;
            default:
                $this->content = $this->wrapText($this->content, $this->word_wrap);
                break;
        }
    }
    protected static function hasLineLongerThanMax($str) {
        $max_line_len = 998;
        #add 2 to the max to include CR_LF line break for a 1000 total
        $max_len_p_2 = $max_line_len + 2;
        $match       = "/^(.{{$max_len_p_2},})/m";
        return (boolean)preg_match($match, $str);
    }
    /**
     * Encode a string in quoted-printable format.
     * According to RFC2045 section 6.7.
     *
     * @param string $string The text to encode
     *
     * @return string
     * @link   http://www.php.net/manual/en/function.quoted-printable-decode.php#89417 Adapted from this comment
     */
    public function encodeQP($string) {
        return $this->fixEOL(quoted_printable_encode($string));
    }
    /**
     * Encode a string in requested format.
     * Returns an empty string on failure.
     *
     * @param string $str      The text to encode
     * @param string $encoding The encoding to use; one of 'base64', '7bit', '8bit', 'binary', 'quoted-printable'
     *
     * @return string
     */
    public function encodeString($str, $encoding = '7bit') {
        $encoded = '';
        switch (strtolower($encoding)) {
            case 'base64':
                $encoded = chunk_split(base64_encode($str), 76, static::EOL);
                break;
            case '7bit':
            case '8bit':
                $encoded = $this->fixEOL($str);
                // Make sure it ends with a line break
                if (substr($encoded, -(strlen(static::EOL))) != static::EOL) {
                    $encoded .= static::EOL;
                }
                break;
            case 'binary':
                $encoded = $str;
                break;
            case 'quoted-printable':
                $encoded = $this->encodeQP($str);
                break;
            default:
                Log::init('encoding')->log_it();
                break;
        }
        return $encoded;
    }
    /**
     * Return the start of a message boundary.
     *
     * @param string $boundary
     * @param string $charSet
     * @param string $contentType
     * @param string $encoding
     *
     * @return string
     */
    protected function getBoundary($boundary, $charSet, $contentType = '', $encoding = '') {
        $result      = [];
        $charSet     = $charSet == '' ? $this->charset : $charSet;
        $contentType = $contentType == '' ? $this->content_type : $contentType;
        $encoding    = $encoding == '' ? $this->content_transfer_encoding : $encoding;

        $result[] = "--{$boundary}";
        $result[] = "Content-Type: {$contentType};charset={$charSet}";
        // RFC1341 part 5 says 7bit is assumed if not specified
        if ($encoding != '7bit') {
            $result[] = "Content-Transfer-Encoding: {$encoding}";
        }
        $result[] = static::EOL;
        return implode(static::EOL, $result);
    }
    /**
     * Return the end of a message boundary.
     *
     * @access protected
     *
     * @param string $boundary
     *
     * @return string
     */
    protected function endBoundary($boundary) {
        return static::EOL . '--' . $boundary . '--' . static::EOL;
    }
    /**
     * Get the server host.
     * Returns 'localhost.localdomain' if unknown.
     *
     * @access protected
     * @return string
     */
    protected function serverHost() {
        $result = 'localhost.localdomain';
        if (!empty($this->host)) {
            $result = $this->host;
        } elseif (isset($_SERVER) and array_key_exists('SERVER_NAME', $_SERVER) and !empty($_SERVER['SERVER_NAME'])) {
            $result = $_SERVER['SERVER_NAME'];
        } elseif (function_exists('gethost') && gethost() !== false) {
            $result = gethost();
        } elseif (php_uname('n') !== false) {
            $result = php_uname('n');
        }
        return $result;
    }
    /**
     * Check if an inline attachment is present.
     *
     * @access public
     * @return boolean
     */
    public function inlineImageExists() {
        foreach ($this->attachments as $attachment) {
            if ($attachment[6] == 'inline') {
                return true;
            }
        }
        return false;
    }
    /**
     * Check if an attachment (non-inline) is present.
     *
     * @return boolean
     */
    public function attachmentExists() {
        foreach ($this->attachments as $attachment) {
            if ($attachment[6] == 'attachment') {
                return true;
            }
        }
        return false;
    }
    /**
     * Check if this message has an alternative body set.
     *
     * @return boolean
     */
    public function alternativeExists() {
        return !empty($this->alt_text);
    }

    public function buildHeader() {
        $result     = [];
        $this->date = (isset($this->date)) ? $this->date : static::rfcDate();
        $result[]   = "Date: {$this->date}";
        $recipients = '';
        if (count($this->recipient) > 0) {
            $recipients = implode(', ', $this->recipient);
        } elseif (count($this->cc) > 0) {
            $recipients = 'undisclosed-recipients:;';
        }
        if ($this->send_method != 'mail')
            $result[] = 'To: ' . $recipients;
        $result[] = 'From: ' . $this->from;
        if (count($this->cc) > 0) {
            $result[] = 'Cc: ' . implode(', ', $this->cc);
        }
        if ($this->send_method == 'mail' && (count($this->bcc) > 0)) {
            $result[] = 'Bcc: ' . implode(', ', $this->bcc);
        }
        if ($this->reply_to != '') {
            $result[] = 'Reply-To: ' . $this->reply_to;
        }
        if ($this->send_method != 'mail') {
            $result[] = 'Subject: ' . $this->encodeHeader($this->secureHeader($this->subject));
        }

        if ($this->message_id != '') {
            $this->last_message_id = $this->message_id;
        } else {
            $this->last_message_id = sprintf('<%s@%s>', $this->hash, $this->serverHost());
        }

        $result[] = 'Message-ID: ' . $this->last_message_id;
        if (!is_null($this->priority)) {
            $result [] = 'X-Priority: ' . $this->priority;
        }
        foreach ($this->headers as $header) {
            $result[] = $header;
        }

        if ($this->confirm_reading_to != '') {
            $this->confirm_reading_to = trim($this->confirm_reading_to);
            $result[]                 = "Disposition-Notification-To: <{$this->confirm_reading_to}>";
        }
        $result[] = 'MIME-Version: 1.0;';
        $result[] = $this->getMimeHeaders();
        return implode(static::EOL, $result);
    }
    /**
     * Sets message type to HTML or plain.
     *
     * @param boolean $isHtml True for HTML mode.
     *
     * @return void
     */
    public function isHTML($isHtml = true) {
        if ($isHtml) {
            $this->content_type = 'text/html';
        } else {
            $this->content_type = 'text/plain';
        }
    }
    /**
     * Add an attachment from a path on the filesystem.
     * Returns false if the file could not be found or read.
     *
     * @param string $path        Path to the attachment.
     * @param string $name        Overrides the attachment name.
     * @param string $encoding    File encoding (see $Encoding).
     * @param string $type        File extension (MIME) type.
     * @param string $disposition Disposition to use
     *
     * @return boolean
     */
    public function addAttachment($path, $name = '', $encoding = 'base64', $type = '', $disposition = 'attachment') {
        try {
            if (!@is_file($path)) {
                $this->error = 'Could not attach file';
                return false;
            }

            // If a MIME type is not specified, try to work it out from the file name
            if ($type == '') {
                $qpos = strpos($path, '?');
                if (false !== $qpos) {
                    $path = substr($path, 0, $qpos);
                }
                $info = pathinfo($path);
                $type = Http::get_mime_from_extension((isset($info['extension']) ? ($info['extension']) : 'octet'));
            }

            $filename = basename($path);
            if ($name == '') {
                $name = $filename;
            }

            $this->attachments[] = [
                0 => $path,
                1 => $filename,
                2 => $name,
                3 => $encoding,
                4 => $type,
                5 => false, // isStringAttachment
                6 => $disposition,
                7 => 0
            ];
        } catch (\Exception $exc) {
            return false;
        }
        return true;
    }
    /**
     * Check if a string contains multi-byte characters.
     *
     * @param string $str multi-byte text to wrap encode
     *
     * @return boolean
     */
    public function hasMultiBytes($str) {
        if (function_exists('mb_strlen')) {
            return (strlen($str) > mb_strlen($str, $this->charset));
        } else { // Assume no multibytes (we can't handle without mbstring functions anyway)
            return false;
        }
    }
    /**
     * Encode and wrap long multibyte strings for mail headers
     * without breaking lines within a character.
     * Adapted from a function by paravoid
     *
     * @link   http://www.php.net/manual/en/function.mb-encode-mimeheader.php#60283
     *
     * @param string $str       multi-byte text to wrap encode
     * @param string $linebreak string to use as linefeed/end-of-line
     *
     * @return string
     */
    public function base64EncodeWrapMB($str, $linebreak = null) {
        $start     = '=?' . $this->charset . '?B?';
        $end       = '?=';
        $encoded   = '';
        $linebreak = !isset($linebreak) ? static::EOL : $linebreak;

        $mb_length = mb_strlen($str, $this->charset);
        // Each line must have length <= 75, including $start and $end
        $length = 75 - strlen($start) - strlen($end);
        // Average multi-byte ratio
        $ratio = $mb_length / strlen($str);
        // Base64 has a 4:3 ratio
        $avgLength = floor($length * $ratio * .75);

        for ($i = 0; $i < $mb_length; $i += $offset) {
            $lookBack = 0;
            do {
                $offset = $avgLength - $lookBack;
                $chunk  = mb_substr($str, $i, $offset, $this->charset);
                $chunk  = base64_encode($chunk);
                $lookBack++;
            } while (strlen($chunk) > $length);
            $encoded .= $chunk . $linebreak;
        }

        // Chomp the last linefeed
        $encoded = substr($encoded, 0, -strlen($linebreak));
        return $encoded;
    }
    /**
     * Encode a string using Q encoding.
     *
     * @link   http://tools.ietf.org/html/rfc2047
     *
     * @param string $str      the text to encode
     * @param string $position Where the text is going to be used, see the RFC for what that means
     *
     * @access public
     * @return string
     */
    public function encodeQ($str, $position = 'text') {
        // There should not be any EOL in the string
        $pattern = '';
        $encoded = str_replace(["\r", "\n"], '', $str);
        switch (strtolower($position)) {
            case 'phrase':
                // RFC 2047 section 5.3
                $pattern = '^A-Za-z0-9!*+\/ -';
                break;
            /** @noinspection PhpMissingBreakStatementInspection */
            case 'comment':
                // RFC 2047 section 5.2
                $pattern = '\(\)"';
            // intentional fall-through
            // for this reason we build the $pattern without including delimiters and []
            case 'text':
            default:
                // RFC 2047 section 5.1
                // Replace every high ascii, control, =, ? and _ characters
                $pattern = '\000-\011\013\014\016-\037\075\077\137\177-\377' . $pattern;
                break;
        }
        $matches = [];
        if (preg_match_all("/[{$pattern}]/", $encoded, $matches)) {
            // If the string contains an '=', make sure it's the first thing we replace
            // so as to avoid double-encoding
            $eq_key = array_search('=', $matches[0]);
            if (false !== $eq_key) {
                unset($matches[0][$eq_key]);
                array_unshift($matches[0], '=');
            }
            foreach (array_unique($matches[0]) as $char) {
                $encoded = str_replace($char, '=' . sprintf('%02X', ord($char)), $encoded);
            }
        }
        // Replace every spaces to _ (more readable than =20)
        return str_replace(' ', '_', $encoded);
    }
    /**
     * Encode a header string optimally.
     * Picks shortest of Q, B, quoted-printable or none.
     *
     * @param string $str
     * @param string $position
     *
     * @return string
     */
    public function encodeHeader($str, $position = 'text') {
        $match_count = 0;
        switch (strtolower($position)) {
            case 'phrase':
                if (!preg_match('/[\200-\377]/', $str)) {
                    // Can't use addslashes as we don't know the value of magic_quotes_sybase
                    $encoded = addcslashes($str, "\0..\37\177\\\"");
                    if (($str == $encoded) && !preg_match('/[^A-Za-z0-9!#$%&\'*+\/=?^_`{|}~ -]/', $str)) {
                        return ($encoded);
                    } else {
                        return ("\"$encoded\"");
                    }
                }
                $match_count = preg_match_all('/[^\040\041\043-\133\135-\176]/', $str, $matches);
                break;
            /** @noinspection PhpMissingBreakStatementInspection */
            case 'comment':
                $match_count = preg_match_all('/[()"]/', $str, $matches);
            // Intentional fall-through
            case 'text':
            default:
                $match_count += preg_match_all('/[\000-\010\013\014\016-\037\177-\377]/', $str, $matches);
                break;
        }

        //There are no chars that need encoding
        if ($match_count == 0) {
            return ($str);
        }

        $max_len = 75 - 7 - strlen($this->charset);
        // Try to select the encoding which should produce the shortest output
        if ($match_count > strlen($str) / 3) {
            // More than a third of the content will need encoding, so B encoding will be most efficient
            $encoding = 'B';
            if ($this->hasMultiBytes($str)) {
                // Use a custom function which correctly encodes and wraps long
                // multibyte strings without breaking lines within a character
                $encoded = $this->base64EncodeWrapMB($str, "\n");
            } else {
                $encoded = base64_encode($str);
                $max_len -= $max_len % 4;
                $encoded = trim(chunk_split($encoded, $max_len, "\n"));
            }
        } else {
            $encoding = 'Q';
            $encoded  = $this->encodeQ($str, $position);
            $encoded  = $this->wrapText($encoded, $max_len, true);
            $encoded  = str_replace('=' . self::CR_LF, "\n", trim($encoded));
        }

        $encoded = preg_replace('/^(.*)$/m', ' =?' . $this->charset . "?$encoding?\\1?=", $encoded);
        $encoded = trim(str_replace("\n", static::EOL, $encoded));

        return $encoded;
    }
    /**
     * Strip newlines to prevent header injection.
     *
     * @access public
     *
     * @param string $str
     *
     * @return string
     */
    public function secureHeader($str) {
        return trim(str_replace(["\r", "\n"], '', $str));
    }
    /**
     * Attach all file, string, and binary attachments to the message.
     * Returns an empty string on failure.
     *
     *
     * @param string $disposition_type
     * @param string $boundary
     *
     * @return string
     */
    protected function attachAll($disposition_type, $boundary) {
        // Return text of body
        $mime       = [];
        $unique_cid = [];
        $incl       = [];

        // Add all attachments
        foreach ($this->attachments as $attachment) {
            // Check if it is a valid disposition_filter
            if ($attachment[6] == $disposition_type) {
                // Check for string attachment
                $string  = '';
                $path    = '';
                $bString = $attachment[5];
                if ($bString) {
                    $string = $attachment[0];
                } else {
                    $path = $attachment[0];
                }

                $include_hash = md5(serialize($attachment));
                if (in_array($include_hash, $incl)) {
                    continue;
                }
                $incl[]      = $include_hash;
                $name        = $attachment[2];
                $encoding    = $attachment[3];
                $type        = $attachment[4];
                $disposition = $attachment[6];
                $cid         = $attachment[7];
                if ($disposition == 'inline' && isset($unique_cid[$cid])) {
                    continue;
                }
                $unique_cid[$cid] = true;

                $mime[] = sprintf('--%s%s', $boundary, static::EOL);
                $mime[] = sprintf(
                    'Content-Type: %s; name="%s"%s',
                    $type,
                    $this->encodeHeader($this->secureHeader($name)),
                    static::EOL
                );
                // RFC1341 part 5 says 7bit is assumed if not specified
                if ($encoding != '7bit') {
                    $mime[] = sprintf('Content-Transfer-Encoding: %s%s', $encoding, static::EOL);
                }

                if ($disposition == 'inline') {
                    $mime[] = sprintf('Content-ID: <%s>%s', $cid, static::EOL);
                }

                // If a filename contains any of these chars, it should be quoted,
                // but not otherwise: RFC2183 & RFC2045 5.1
                // Fixes a warning in IETF's msglint MIME checker
                // Allow for bypassing the Content-Disposition header totally
                if (!(empty($disposition))) {
                    $encoded_name = $this->encodeHeader($this->secureHeader($name));
                    if (preg_match('/[ \(\)<>@,;:\\"\/\[\]\?=]/', $encoded_name)) {
                        $mime[] = sprintf(
                            'Content-Disposition: %s; filename="%s"%s',
                            $disposition,
                            $encoded_name,
                            static::EOL . static::EOL
                        );
                    } else {
                        $mime[] = sprintf(
                            'Content-Disposition: %s; filename=%s%s',
                            $disposition,
                            $encoded_name,
                            static::EOL . static::EOL
                        );
                    }
                } else {
                    $mime[] = static::EOL;
                }

                // Encode as string attachment
                if ($bString) {
                    $mime[] = $enc_string = $this->encodeString($string, $encoding);
                    if ($enc_string == '') return '';

                    $mime[] = static::EOL . static::EOL;
                } else {
                    $mime[] = $enc_file = $this->encodeFile($path, $encoding);
                    if ($enc_file == '') return '';
                    $mime[] = static::EOL . static::EOL;
                }
            }
        }

        $mime[] = sprintf('--%s--%s', $boundary, static::EOL);

        return implode('', $mime);
    }
    /**
     * Encode a file attachment in requested format.
     * Returns an empty string on failure.
     *
     * @param string $path     The full path to the file
     * @param string $encoding The encoding to use; one of 'base64', '7bit', '8bit', 'binary', 'quoted-printable'
     *
     * @see    EncodeFile(encodeFile
     * @access protected
     * @return string
     */
    protected function encodeFile($path, $encoding = 'base64') {
        try {
            if (!is_readable($path)) {
                $this->error = 'Could not open file';
                return false;
            }
            //Doesn't exist in PHP 5.4, but we don't need to check because
            //get_magic_quotes_runtime always returns false in 5.4+
            //so it will never get here
            ini_set('magic_quotes_runtime', false);
            $file_buffer = file_get_contents($path);
            $file_buffer = $this->encodeString($file_buffer, $encoding);
            ini_set('magic_quotes_runtime', false);
            return $file_buffer;
        } catch (Exception $exc) {
            Log::init($exc->getMessage())->log_it();
            return '';
        }
    }
    public function buildContent() {
        $content          = [];
        $uniqueId         = $this->setHash();
        $this->boundaries = [
            0 => "b1_{$uniqueId}",
            1 => "b2_{$uniqueId}",
            2 => "b3_{$uniqueId}",
        ];
        $boundary_0       = $this->boundaries[0];
        $boundary_1       = $this->boundaries[1];
        $boundary_2       = $this->boundaries[2];
        if ($this->sign_key_file) $content[] = $this->getMimeHeaders();

        $this->setWordWrap();

        $encoding             = $this->content_transfer_encoding;
        $charset              = $this->charset;
        $alt_content_encoding = $this->content_transfer_encoding;

        #If lines are too long, change to quoted-printable transfer encoding
        if (static::hasLineLongerThanMax($this->content)) {
            $encoding = $this->content_transfer_encoding = 'quoted-printable';
        }

        #If lines are too long, change to quoted-printable transfer encoding
        if (static::hasLineLongerThanMax($this->alt_text)) {
            $alt_content_encoding = 'quoted-printable';
        }

        $EOL = static::EOL;
        #Use this as a preamble in all multipart message types
        switch ($this->message_type) {
            case 'inline':
                $content[] = $multipart_preamble;
                $content[] = $this->getBoundary($boundary_0, $charset, '', $encoding);
                $content[] = $this->encodeString($this->content, $encoding) . $EOL;
                $content[] = $this->attachAll('inline', $boundary_0);
                break;
            case 'attach':
                $content[] = $multipart_preamble;
                $content[] = $this->getBoundary($boundary_0, $charset, '', $encoding);
                $content[] = $this->encodeString($this->content, $encoding) . $EOL;
                $content[] = $this->attachAll('attachment', $boundary_0);
                break;
            case 'inline_attach':
                $content[] = $multipart_preamble;
                $content[] = "--{$boundary_0}";
                $content[] = "Content-Type: multipart/related;";
                $content[] = "\tboundary=\"{$boundary_1}\"{$EOL}";
                $content[] = $this->getBoundary($boundary_1, $charset, '', $encoding);
                $content[] = $this->encodeString($this->content, $encoding) . $EOL;
                $content[] = $this->attachAll('inline', $boundary_1);
                $content[] = $this->attachAll('attachment', $boundary_0);
                break;
            case 'alt':
                $content[] =
                    $this->getBoundary($boundary_0, $charset, 'text/plain', $alt_content_encoding) .
                    $this->encodeString($this->alt_text, $alt_content_encoding) . $EOL;
                $content[] =
                    $this->getBoundary($boundary_0, $charset, 'text/html', $encoding) .
                    $this->encodeString($this->content, $encoding) . $EOL;

                if (isset($this->iCal)) {
                    $content[] =
                        $this->getBoundary($boundary_0, '', 'text/calendar; method=REQUEST', '') .
                        $this->encodeString($this->iCal, $encoding) . $EOL;
                }
                $content[] = $this->endBoundary($boundary_0);
                break;
            case 'alt_inline':
                $content[] =
                    $this->getBoundary($boundary_0, $charset, 'text/plain', $alt_content_encoding) .
                    $this->encodeString($this->alt_text, $alt_content_encoding) . $EOL;
                $content[] = "--{$boundary_0}";
                $content[] = "Content-Type: multipart/related;";
                $content[] = "\tboundary=\"{$boundary_1}\"{$EOL}";
                $content[] =
                    $this->getBoundary($boundary_1, $charset, 'text/html', $encoding) .
                    $this->encodeString($this->content, $encoding) . $EOL;
                $content[] = $this->attachAll('inline', $boundary_1);
                $content[] = $this->endBoundary($boundary_0);
                break;
            case 'alt_attach':
                $content[] = "--{$boundary_0}";
                $content[] = "Content-Type: multipart/alternative;";
                $content[] = "\tboundary=\"{$boundary_1}\"{$EOL}";
                $content[] =
                    $this->getBoundary($boundary_1, $charset, 'text/plain', $alt_content_encoding) .
                    $this->encodeString($this->alt_text, $alt_content_encoding) . $EOL;
                $content[] =
                    $this->getBoundary($boundary_1, $charset, 'text/html', $encoding) .
                    $this->encodeString($this->content, $encoding) . $EOL;
                $content[] = $this->endBoundary($boundary_1);
                $content[] = $this->attachAll('attachment', $boundary_0);
                break;
            case 'alt_inline_attach':
                $content[] = "--{$boundary_0}";
                $content[] = "Content-Type: multipart/alternative;";
                $content[] = "\tboundary=\"{$boundary_1}\"{$EOL}";
                $content[] =
                    $this->getBoundary($boundary_1, $charset, 'text/plain', $alt_content_encoding) .
                    $this->encodeString($this->alt_text, $alt_content_encoding) . $EOL;
                $content[] = "--{$boundary_1}";
                $content[] = "Content-Type: multipart/related;";
                $content[] = "\tboundary=\"{$boundary_2}\"{$EOL}";
                $content[] =
                    $this->getBoundary($boundary_2, $charset, 'text/html', $encoding) .
                    $this->encodeString($this->content, $encoding) . $EOL;
                $content[] = $this->attachAll('inline', $boundary_2);
                $content[] = $this->endBoundary($boundary_1);
                $content[] = $this->attachAll('attachment', $boundary_0);
                break;
            default:
                // catch case 'plain' and case ''
                $content[] = $this->encodeString($this->content, $encoding);
                break;
        }
        $body = implode($EOL, $content);
        if (isset($this->sign_key_file) && $this->sign_key_file) {
            try {
                if (!defined('PKCS7_TEXT')) {
                    $this->error = 'Could not complete process';
                    return false;
                }
                // @TODO would be nice to use php://temp streams here, but need to wrap for PHP < 5.1
                $file = tempnam(sys_get_temp_dir(), 'mail');
                if (false === file_put_contents($file, $body)) {
                    $this->error = 'Could nott complete email process';
                    return false;
                }
                $signed = tempnam(sys_get_temp_dir(), 'signed');
                //Workaround for PHP bug https://bugs.php.net/bug.php?id=69197
                if (empty($this->sign_extracerts_file)) {
                    $sign = @openssl_pkcs7_sign(
                        $file,
                        $signed,
                        'file://' . realpath($this->sign_cert_file),
                        ['file://' . realpath($this->sign_key_file), $this->sign_key_pass],
                        null
                    );
                } else {
                    $sign = @openssl_pkcs7_sign(
                        $file,
                        $signed,
                        'file://' . realpath($this->sign_cert_file),
                        ['file://' . realpath($this->sign_key_file), $this->sign_key_pass],
                        null,
                        PKCS7_DETACHED,
                        $this->sign_extracerts_file
                    );
                }
                if ($sign) {
                    @unlink($file);
                    $body = file_get_contents($signed);
                    @unlink($signed);
                    //The message returned by openssl contains both headers and body, so need to split them up
                    $parts = explode("\n\n", $body, 2);
                    $this->MIMEHeader .= $parts[0] . static::EOL . static::EOL;
                    $body = $parts[1];
                } else {
                    @unlink($file);
                    @unlink($signed);
//					throw new \Exception('signing' . openssl_error_string());
                    $this->error = 'Could not complete email processs';
                    return false;
                }
            } catch (\Exception $exc) {
                $body = '';
            }
        }
        if (trim($body) == '') {
            $this->error = 'Could not create message body';
        }
        return $body;
    }
    /**
     * Set the message type.
     * PHPMailer only supports some preset message types,
     * not arbitrary MIME structures.
     *
     * @access protected
     * @return void
     */
    protected function setMessageType() {
        $type = [];
        if ($this->alternativeExists()) {
            $type[] = 'alt';
        }
        if ($this->inlineImageExists()) {
            $type[] = 'inline';
        }
        if ($this->attachmentExists()) {
            $type[] = 'attach';
        }
        $this->message_type = implode('_', $type);
        if ($this->message_type == '') {
            $this->message_type = 'plain';
        }
    }
    public function preSend() {
        try {
            if ((count($this->recipient) + count($this->cc) + count($this->bcc)) < 1) {
                throw new Exception;
            }
            if (!empty($this->alt_text)) {
                $this->content_type = 'multipart/alternative';
            }
            $this->setMessageType();
            $this->mail_header = '';
            // Create body before headers in case body makes changes to headers (e.g. altering transfer encoding)
            $this->MIMEHeader = '';
            $this->MIMEBody   = $this->buildContent();
            // createBody may have added some headers, so retain them
            $temp_headers     = $this->MIMEHeader;
            $this->MIMEHeader = $this->buildHeader();
            $this->MIMEHeader .= $temp_headers;

            if ($this->send_method == 'mail') {
                if (count($this->recipient) > 0) {
                    $recipients = implode(', ', $this->recipient);
                    $this->mail_header .= 'To: ' . $recipients . static::EOL;
                }
                $this->mail_header .= 'Subject: ' . $this->encodeHeader($this->secureHeader(trim($this->subject)));
            }
            return true;
        } catch (Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }
    public function send() {
        if (isset($this->error)) {
            return false;
        }
        if (!$this->preSend()) {
            return false;
        }
        return $this->postSend();
    }
    public function postSend() {
        return $this->mailSend($this->MIMEHeader, $this->MIMEBody);
    }
    /**
     * Send mail using the PHP mail() function.
     *
     * @param string $header The message headers
     * @param string $body   The message body
     *
     * @return bool
     * @link   http://www.php.net/manual/en/book.mail.php
     * @access protected
     */
    protected function mailSend($header, $body) {
        $toArr = [];

        $to = implode(', ', $this->recipient);

        if (empty($this->sender)) {
            $params = ' ';
        } else {
            $params = sprintf('-f%s', $this->sender);
        }

        if ($this->sender != '' and !ini_get('safe_mode')) {
            $old_from = ini_get('sendmail_from');
            ini_set('sendmail_from', $this->sender);
        }
        $result = false;
        if (isset($this->error)) {
            return false;
        }
        if (trim($this->subject) == '') {
            $this->error = 'No subject has been set.';
            return false;
        }
        $result = $this->mailPassthru($to, $this->subject, $body, $header, $params);
        if (isset($old_from)) {
            ini_set('sendmail_from', $old_from);
        }
        return (boolean)$result;
    }
    /**
     * Call mail() in a safe_mode-aware fashion.
     * Also, unless sendmail_path points to sendmail (or something that
     * claims to be sendmail), don't pass params (not a perfect fix,
     * but it will do)
     *
     * @param string $to      To
     * @param string $subject Subject
     * @param string $body    Message Body
     * @param string $header  Additional Header(s)
     * @param string $params  Params
     *
     * @access private
     * @return boolean
     */
    private function mailPassthru($to, $subject, $body, $header, $params) {

        //Check overloading of mail function to avoid double-encoding
        if (ini_get('mbstring.func_overload') & 1) {
            $subject = $this->secureHeader($subject);
        } else {
            $subject = $this->encodeHeader($this->secureHeader($subject));
        }
        if (ini_get('safe_mode')) {
            $result = @mail($to, $subject, $body, $header);
        } else {
            $result = @mail($to, $subject, $body, $header, $params);
        }
        return $result;
    }

    /**
     * Add an embedded (inline) attachment from a file.
     * This can include images, sounds, and just about any other document type.
     * These differ from 'regular' attachments in that they are intended to be
     * displayed inline with the message, not just attached for download.
     * This is used in HTML messages that embed the images
     * the HTML refers to using the $cid value.
     *
     * @param string $path        Path to the attachment.
     * @param string $cid         Content ID of the attachment; Use this to reference
     *                            the content when using an embedded image in HTML.
     * @param string $name        Overrides the attachment name.
     * @param string $encoding    File encoding (see $Encoding).
     * @param string $type        File MIME type.
     * @param string $disposition Disposition to use
     *
     * @return boolean True on successfully adding an attachment
     */
    public function addEmbeddedImage($path, $cid, $name = '', $encoding = 'base64', $type = '', $disposition = 'inline') {
        if (!@is_file($path)) {
            Log::init('file_access')->log_it();
            return false;
        }

        // If a MIME type is not specified, try to work it out from the file name
        if ($type == '') {
            $qpos = strpos($path, '?');
            if (false !== $qpos) {
                $path = substr($path, 0, $qpos);
            }
            $info = pathinfo($path);
            $type = Http::get_mime_from_extension((isset($info['extension']) ? ($info['extension']) : 'octet'));
        }

        $filename = basename($path);
        if ($name == '') {
            $name = $filename;
        }

        // Append to $attachment array
        $this->attachments[] = [
            0 => $path,
            1 => $filename,
            2 => $name,
            3 => $encoding,
            4 => $type,
            5 => false, // isStringAttachment
            6 => $disposition,
            7 => $cid
        ];
        return true;
    }
    /**
     * Add an embedded stringified attachment.
     * This can include images, sounds, and just about any other document type.
     * Be sure to set the $type to an image type for images:
     * JPEG images use 'image/jpeg', GIF uses 'image/gif', PNG uses 'image/png'.
     *
     * @param string $string      The attachment binary data.
     * @param string $cid         Content ID of the attachment; Use this to reference
     *                            the content when using an embedded image in HTML.
     * @param string $name
     * @param string $encoding    File encoding (see $Encoding).
     * @param string $type        MIME type.
     * @param string $disposition Disposition to use
     *
     * @return boolean True on successfully adding an attachment
     */
    public function addStringEmbeddedBinary(
        $string,
        $cid,
        $name = '',
        $encoding = 'base64',
        $type = '',
        $disposition = 'inline'
    ) {
        // If a MIME type is not specified, try to work it out from the name
        if ($type == '') {
            $qpos = strpos($name, '?');
            if (false !== $qpos) {
                $path = substr($name, 0, $qpos);
            }
            $info = pathinfo($name);
            $type = Http::get_mime_from_extension((isset($info['extension']) ? ($info['extension']) : 'octet'));
        }

        // Append to $attachment array
        $this->attachments[] = [
            0 => $string,
            1 => $name,
            2 => $name,
            3 => $encoding,
            4 => $type,
            5 => true, // isStringAttachment
            6 => $disposition,
            7 => $cid
        ];
        return true;
    }
}