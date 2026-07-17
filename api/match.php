<?php
require_once __DIR__ . '/bootstrap.php';

$input = vgb_json_input();
$action = $input['action'] ?? ($_GET['action'] ?? '');
$user = vgb_auth_user();
$pdo = vgb_db();

function vgb_match_payload(PDO $pdo, array $match, int $userId): array {
  $seat = ((int)$match['player1_id'] === $userId) ? 0 : 1;
  $oppId = $seat === 0 ? (int)$match['player2_id'] : (int)$match['player1_id'];
  $opp = $pdo->query('SELECT * FROM users WHERE id = ' . $oppId)->fetch(PDO::FETCH_ASSOC);
  $me = $pdo->query('SELECT * FROM users WHERE id = ' . $userId)->fetch(PDO::FETCH_ASSOC);
  return [
    'matchId' => $match['id'],
    'seat' => $seat,
    'gridSize' => (int)$match['grid_size'],
    'status' => $match['status'],
    'currentSeat' => (int)$match['current_seat'],
    'state' => $match['state_json'] ? json_decode($match['state_json'], true) : null,
    'winnerId' => $match['winner_id'] !== null ? (int)$match['winner_id'] : null,
    'you' => vgb_public_user($me),
    'opponent' => $opp ? vgb_public_user($opp) : null,
    'updatedAt' => $match['updated_at'],
  ];
}

if ($action === 'enqueue') {
  $grid = 9; // Plateau unique 9×9

  // Déjà dans une partie active ?
  $stmt = $pdo->prepare("SELECT * FROM matches WHERE status IN ('draft','playing') AND (player1_id = ? OR player2_id = ?) ORDER BY created_at DESC LIMIT 1");
  $stmt->execute([$user['id'], $user['id']]);
  $existing = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($existing) {
    vgb_ok(['matched' => true, 'match' => vgb_match_payload($pdo, $existing, (int)$user['id'])]);
  }

  // Chercher un adversaire en file (autre joueur, même taille de plateau)
  $stmt = $pdo->prepare('SELECT * FROM match_queue WHERE user_id != ? AND grid_size = ? ORDER BY joined_at ASC LIMIT 1');
  $stmt->execute([$user['id'], $grid]);
  $waiting = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($waiting) {
    $pdo->prepare('DELETE FROM match_queue WHERE user_id IN (?, ?)')->execute([(int)$waiting['user_id'], (int)$user['id']]);
    $matchId = bin2hex(random_bytes(8));
    $p1 = (int)$waiting['user_id'];
    $p2 = (int)$user['id'];
    $pdo->prepare('INSERT INTO matches (id, player1_id, player2_id, grid_size, status, state_json) VALUES (?, ?, ?, ?, ?, ?)')
      ->execute([$matchId, $p1, $p2, $grid, 'draft', json_encode(['version' => 0, 'armies' => [null, null], 'factions' => [null, null], 'names' => [null, null]])]);
    $match = $pdo->query("SELECT * FROM matches WHERE id = " . $pdo->quote($matchId))->fetch(PDO::FETCH_ASSOC);
    vgb_ok(['matched' => true, 'match' => vgb_match_payload($pdo, $match, (int)$user['id'])]);
  }

  $pdo->prepare('INSERT INTO match_queue (user_id, grid_size) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET grid_size = excluded.grid_size, joined_at = datetime("now")')
    ->execute([(int)$user['id'], $grid]);
  vgb_ok(['matched' => false, 'queued' => true, 'gridSize' => $grid]);
}

if ($action === 'cancel') {
  $pdo->prepare('DELETE FROM match_queue WHERE user_id = ?')->execute([(int)$user['id']]);
  vgb_ok(['cancelled' => true]);
}

if ($action === 'status') {
  $stmt = $pdo->prepare("SELECT * FROM matches WHERE status IN ('draft','playing','finished') AND (player1_id = ? OR player2_id = ?) ORDER BY created_at DESC LIMIT 1");
  $stmt->execute([$user['id'], $user['id']]);
  $match = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($match && in_array($match['status'], ['draft', 'playing'], true)) {
    vgb_ok(['matched' => true, 'match' => vgb_match_payload($pdo, $match, (int)$user['id'])]);
  }
  $q = $pdo->prepare('SELECT * FROM match_queue WHERE user_id = ?');
  $q->execute([(int)$user['id']]);
  $queued = (bool)$q->fetch();
  vgb_ok(['matched' => false, 'queued' => $queued]);
}

vgb_error('Action inconnue. Utilisez enqueue, cancel ou status.');
