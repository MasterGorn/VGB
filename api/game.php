<?php
require_once __DIR__ . '/bootstrap.php';

$input = vgb_json_input();
$action = $input['action'] ?? ($_GET['action'] ?? '');
$user = vgb_auth_user();
$pdo = vgb_db();
$matchId = (string)($input['matchId'] ?? $_GET['matchId'] ?? '');

if (!$matchId) vgb_error('matchId requis');

$stmt = $pdo->prepare('SELECT * FROM matches WHERE id = ?');
$stmt->execute([$matchId]);
$match = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$match) vgb_error('Partie introuvable', 404);

$userId = (int)$user['id'];
if ($userId !== (int)$match['player1_id'] && $userId !== (int)$match['player2_id']) {
  vgb_error('Accès refusé', 403);
}

$seat = ($userId === (int)$match['player1_id']) ? 0 : 1;
$state = $match['state_json'] ? json_decode($match['state_json'], true) : [];
if (!is_array($state)) $state = [];

function vgb_save_match(PDO $pdo, string $matchId, array $fields): array {
  $sets = [];
  $vals = [];
  foreach ($fields as $k => $v) {
    $sets[] = "$k = ?";
    $vals[] = $v;
  }
  $sets[] = "updated_at = datetime('now')";
  $vals[] = $matchId;
  $pdo->prepare('UPDATE matches SET ' . implode(', ', $sets) . ' WHERE id = ?')->execute($vals);
  $stmt = $pdo->prepare('SELECT * FROM matches WHERE id = ?');
  $stmt->execute([$matchId]);
  return $stmt->fetch(PDO::FETCH_ASSOC);
}

if ($action === 'get') {
  $oppId = $seat === 0 ? (int)$match['player2_id'] : (int)$match['player1_id'];
  $opp = $pdo->query('SELECT * FROM users WHERE id = ' . $oppId)->fetch(PDO::FETCH_ASSOC);
  vgb_ok([
    'matchId' => $match['id'],
    'seat' => $seat,
    'status' => $match['status'],
    'gridSize' => (int)$match['grid_size'],
    'currentSeat' => (int)$match['current_seat'],
    'state' => $state,
    'winnerId' => $match['winner_id'] !== null ? (int)$match['winner_id'] : null,
    'opponent' => $opp ? vgb_public_user($opp) : null,
    'updatedAt' => $match['updated_at'],
  ]);
}

if ($action === 'setDraft') {
  if ($match['status'] !== 'draft') vgb_error('Draft terminé');
  $faction = $input['faction'] ?? 'Nintendo';
  $army = $input['army'] ?? [];
  $name = trim((string)($input['name'] ?? $user['username']));
  if (!is_array($army)) vgb_error('Armée invalide');

  if (!isset($state['armies'])) $state['armies'] = [null, null];
  if (!isset($state['factions'])) $state['factions'] = [null, null];
  if (!isset($state['names'])) $state['names'] = [null, null];

  $state['armies'][$seat] = $army;
  $state['factions'][$seat] = $faction;
  $state['names'][$seat] = $name;
  $state['version'] = ((int)($state['version'] ?? 0)) + 1;

  $bothReady = $state['armies'][0] !== null && $state['armies'][1] !== null;
  $status = $bothReady ? 'playing' : 'draft';
  if ($bothReady) {
    $state['started'] = true;
  }

  $match = vgb_save_match($pdo, $matchId, [
    'state_json' => json_encode($state, JSON_UNESCAPED_UNICODE),
    'status' => $status,
  ]);

  vgb_ok([
    'status' => $status,
    'state' => $state,
    'bothReady' => $bothReady,
  ]);
}

if ($action === 'pushState') {
  if ($match['status'] !== 'playing') vgb_error('Partie non active');
  $newState = $input['state'] ?? null;
  $currentSeat = isset($input['currentSeat']) ? (int)$input['currentSeat'] : (int)$match['current_seat'];
  if (!is_array($newState)) vgb_error('state invalide');

  // Le joueur dont c'est le siège peut pousser (ou n'importe qui en cas de rattrapage version)
  $incomingVersion = (int)($newState['version'] ?? 0);
  $localVersion = (int)($state['version'] ?? 0);
  if ($incomingVersion <= $localVersion) {
    vgb_ok(['ignored' => true, 'state' => $state, 'currentSeat' => (int)$match['current_seat']]);
  }

  $match = vgb_save_match($pdo, $matchId, [
    'state_json' => json_encode($newState, JSON_UNESCAPED_UNICODE),
    'current_seat' => $currentSeat,
  ]);

  vgb_ok(['state' => $newState, 'currentSeat' => $currentSeat]);
}

if ($action === 'finish') {
  if ($match['status'] === 'finished') {
    vgb_ok(['alreadyFinished' => true]);
  }
  $winnerSeat = $input['winnerSeat'] ?? null; // 0, 1 ou null (draw)
  $p1 = (int)$match['player1_id'];
  $p2 = (int)$match['player2_id'];
  $u1 = $pdo->query("SELECT * FROM users WHERE id = $p1")->fetch(PDO::FETCH_ASSOC);
  $u2 = $pdo->query("SELECT * FROM users WHERE id = $p2")->fetch(PDO::FETCH_ASSOC);

  $score1 = 0.5;
  $winnerId = null;
  if ($winnerSeat === 0 || $winnerSeat === '0') {
    $score1 = 1;
    $winnerId = $p1;
  } elseif ($winnerSeat === 1 || $winnerSeat === '1') {
    $score1 = 0;
    $winnerId = $p2;
  }

  [$elo1, $elo2] = vgb_elo_update((int)$u1['elo'], (int)$u2['elo'], $score1);

  if ($score1 === 1.0) {
    $pdo->prepare('UPDATE users SET elo = ?, wins = wins + 1 WHERE id = ?')->execute([$elo1, $p1]);
    $pdo->prepare('UPDATE users SET elo = ?, losses = losses + 1 WHERE id = ?')->execute([$elo2, $p2]);
  } elseif ($score1 === 0.0) {
    $pdo->prepare('UPDATE users SET elo = ?, losses = losses + 1 WHERE id = ?')->execute([$elo1, $p1]);
    $pdo->prepare('UPDATE users SET elo = ?, wins = wins + 1 WHERE id = ?')->execute([$elo2, $p2]);
  } else {
    $pdo->prepare('UPDATE users SET elo = ?, draws = draws + 1 WHERE id = ?')->execute([$elo1, $p1]);
    $pdo->prepare('UPDATE users SET elo = ?, draws = draws + 1 WHERE id = ?')->execute([$elo2, $p2]);
  }

  $state['finished'] = true;
  $state['winnerSeat'] = $winnerSeat;
  $state['elo'] = ['player1' => $elo1, 'player2' => $elo2];
  $state['version'] = ((int)($state['version'] ?? 0)) + 1;

  vgb_save_match($pdo, $matchId, [
    'status' => 'finished',
    'winner_id' => $winnerId,
    'state_json' => json_encode($state, JSON_UNESCAPED_UNICODE),
  ]);

  vgb_ok([
    'elo' => [
      'player1' => ['id' => $p1, 'elo' => $elo1],
      'player2' => ['id' => $p2, 'elo' => $elo2],
    ],
    'winnerId' => $winnerId,
  ]);
}

vgb_error('Action inconnue. Utilisez get, setDraft, pushState ou finish.');
