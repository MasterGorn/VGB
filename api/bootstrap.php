<?php
/**
 * VGB API — bootstrap SQLite + helpers
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Auth-Token');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

define('VGB_API_ROOT', __DIR__);
define('VGB_DB_PATH', VGB_API_ROOT . '/data/vgb.sqlite');
define('VGB_ELO_DEFAULT', 1000);
define('VGB_ELO_K', 32);

function vgb_db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;

  $dir = dirname(VGB_DB_PATH);
  if (!is_dir($dir)) {
    mkdir($dir, 0775, true);
  }

  $pdo = new PDO('sqlite:' . VGB_DB_PATH);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->exec('PRAGMA foreign_keys = ON');

  $pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      elo INTEGER NOT NULL DEFAULT 1000,
      wins INTEGER NOT NULL DEFAULT 0,
      losses INTEGER NOT NULL DEFAULT 0,
      draws INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS tokens (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS match_queue (
      user_id INTEGER PRIMARY KEY,
      grid_size INTEGER NOT NULL DEFAULT 11,
      joined_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS matches (
      id TEXT PRIMARY KEY,
      player1_id INTEGER NOT NULL,
      player2_id INTEGER NOT NULL,
      grid_size INTEGER NOT NULL DEFAULT 11,
      status TEXT NOT NULL DEFAULT 'draft',
      current_seat INTEGER NOT NULL DEFAULT 0,
      state_json TEXT,
      winner_id INTEGER,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY(player1_id) REFERENCES users(id),
      FOREIGN KEY(player2_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL DEFAULT 'Mon deck',
      faction TEXT NOT NULL,
      slots_json TEXT NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_decks_user ON decks(user_id);
  ");

  return $pdo;
}

function vgb_json_input(): array {
  $raw = file_get_contents('php://input');
  if (!$raw) return $_POST ?: [];
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function vgb_ok(array $payload = [], int $code = 200): void {
  http_response_code($code);
  echo json_encode(array_merge(['ok' => true], $payload), JSON_UNESCAPED_UNICODE);
  exit;
}

function vgb_error(string $message, int $code = 400, array $extra = []): void {
  http_response_code($code);
  echo json_encode(array_merge(['ok' => false, 'error' => $message], $extra), JSON_UNESCAPED_UNICODE);
  exit;
}

function vgb_auth_user(): array {
  $headers = function_exists('getallheaders') ? getallheaders() : [];
  $token = '';
  foreach ($headers as $k => $v) {
    if (strcasecmp($k, 'Authorization') === 0) {
      $token = preg_replace('/^Bearer\s+/i', '', trim($v));
    }
    if (strcasecmp($k, 'X-Auth-Token') === 0) {
      $token = trim($v);
    }
  }
  if (!$token && isset($_GET['token'])) $token = trim($_GET['token']);
  if (!$token) vgb_error('Non authentifié', 401);

  $pdo = vgb_db();
  $stmt = $pdo->prepare('SELECT u.* FROM tokens t JOIN users u ON u.id = t.user_id WHERE t.token = ?');
  $stmt->execute([$token]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$user) vgb_error('Session invalide', 401);
  return $user;
}

function vgb_public_user(array $user): array {
  return [
    'id' => (int)$user['id'],
    'username' => $user['username'],
    'elo' => (int)$user['elo'],
    'wins' => (int)$user['wins'],
    'losses' => (int)$user['losses'],
    'draws' => (int)$user['draws'],
  ];
}

function vgb_new_token(): string {
  return bin2hex(random_bytes(24));
}

/** Elo classique : scores 1 / 0 / 0.5 */
function vgb_elo_update(int $ratingA, int $ratingB, float $scoreA): array {
  $expectedA = 1 / (1 + pow(10, ($ratingB - $ratingA) / 400));
  $expectedB = 1 - $expectedA;
  $newA = (int)round($ratingA + VGB_ELO_K * ($scoreA - $expectedA));
  $newB = (int)round($ratingB + VGB_ELO_K * ((1 - $scoreA) - $expectedB));
  return [$newA, $newB];
}
