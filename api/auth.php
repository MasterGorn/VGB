<?php
require_once __DIR__ . '/bootstrap.php';

$input = vgb_json_input();
$action = $input['action'] ?? ($_GET['action'] ?? '');

if ($action === 'register') {
  $username = trim((string)($input['username'] ?? ''));
  $password = (string)($input['password'] ?? '');
  $email = strtolower(trim((string)($input['email'] ?? '')));
  if (strlen($username) < 3 || strlen($username) > 24) {
    vgb_error('Pseudo entre 3 et 24 caractères');
  }
  if (!preg_match('/^[a-zA-Z0-9_\-]+$/', $username)) {
    vgb_error('Pseudo: lettres, chiffres, _ et - uniquement');
  }
  if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    vgb_error('Email valide requis');
  }
  if (strlen($password) < 6) {
    vgb_error('Mot de passe trop court (min. 6)');
  }

  $pdo = vgb_db();
  try {
    $stmt = $pdo->prepare('INSERT INTO users (username, password_hash, elo, email) VALUES (?, ?, ?, ?)');
    $stmt->execute([$username, password_hash($password, PASSWORD_DEFAULT), VGB_ELO_DEFAULT, $email]);
  } catch (PDOException $e) {
    if (stripos($e->getMessage(), 'email') !== false) {
      vgb_error('Cet email est déjà utilisé', 409);
    }
    vgb_error('Ce pseudo est déjà pris', 409);
  }

  $userId = (int)$pdo->lastInsertId();
  $token = vgb_new_token();
  $pdo->prepare('INSERT INTO tokens (token, user_id) VALUES (?, ?)')->execute([$token, $userId]);
  $user = $pdo->query('SELECT * FROM users WHERE id = ' . $userId)->fetch(PDO::FETCH_ASSOC);
  vgb_ok(['token' => $token, 'user' => vgb_public_user($user)]);
}

if ($action === 'login') {
  $username = trim((string)($input['username'] ?? ''));
  $password = (string)($input['password'] ?? '');
  $pdo = vgb_db();
  $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE');
  $stmt->execute([$username]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$user || !password_verify($password, $user['password_hash'])) {
    vgb_error('Identifiants incorrects', 401);
  }
  $token = vgb_new_token();
  $pdo->prepare('INSERT INTO tokens (token, user_id) VALUES (?, ?)')->execute([$token, $user['id']]);
  vgb_ok(['token' => $token, 'user' => vgb_public_user($user)]);
}

if ($action === 'me') {
  $user = vgb_auth_user();
  vgb_ok(['user' => vgb_public_user($user)]);
}

if ($action === 'logout') {
  $user = vgb_auth_user();
  $headers = function_exists('getallheaders') ? getallheaders() : [];
  $token = '';
  foreach ($headers as $k => $v) {
    if (strcasecmp($k, 'Authorization') === 0) $token = preg_replace('/^Bearer\s+/i', '', trim($v));
    if (strcasecmp($k, 'X-Auth-Token') === 0) $token = trim($v);
  }
  if ($token) {
    vgb_db()->prepare('DELETE FROM tokens WHERE token = ?')->execute([$token]);
  }
  vgb_ok();
}

vgb_error('Action inconnue. Utilisez register, login, me ou logout.');
