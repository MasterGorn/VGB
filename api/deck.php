<?php
/**
 * Decks joueur — armée favorite par emplacements (rôles)
 * Actions: list | get | save | delete | setDefault
 *
 * slots = [ { role, pieceKey }, ... ] — 17 entrées (sans roi)
 * Quotas: pawn×9, knight×2, bishop×2, rook×2, queen×1, unique×1
 */
require_once __DIR__ . '/bootstrap.php';

define('VGB_ROLE_LIMITS', [
  'pawn' => 9,
  'knight' => 2,
  'bishop' => 2,
  'rook' => 2,
  'queen' => 1,
  'unique' => 1,
]);

function vgb_validate_deck_slots($slots): array {
  if (!is_array($slots)) {
    vgb_error('slots invalides');
  }
  $counts = array_fill_keys(array_keys(VGB_ROLE_LIMITS), 0);
  $clean = [];
  foreach ($slots as $slot) {
    if (!is_array($slot)) continue;
    $role = (string)($slot['role'] ?? '');
    $pieceKey = trim((string)($slot['pieceKey'] ?? $slot['nameKey'] ?? ''));
    if (!isset(VGB_ROLE_LIMITS[$role])) {
      vgb_error('Rôle inconnu: ' . $role);
    }
    if ($pieceKey === '' || strlen($pieceKey) > 64) {
      vgb_error('pieceKey manquant ou invalide');
    }
    if (!preg_match('/^[a-zA-Z0-9_\-&]+$/', $pieceKey)) {
      vgb_error('pieceKey invalide: ' . $pieceKey);
    }
    $counts[$role]++;
    $clean[] = ['role' => $role, 'pieceKey' => $pieceKey];
  }
  foreach (VGB_ROLE_LIMITS as $role => $limit) {
    if ($counts[$role] !== $limit) {
      vgb_error("Quota $role incorrect ({$counts[$role]}/$limit)");
    }
  }
  return $clean;
}

function vgb_public_deck(array $row): array {
  $slots = json_decode($row['slots_json'] ?? '[]', true);
  if (!is_array($slots)) $slots = [];
  return [
    'id' => (int)$row['id'],
    'name' => $row['name'],
    'faction' => $row['faction'],
    'slots' => $slots,
    'isDefault' => (int)$row['is_default'] === 1,
    'updatedAt' => $row['updated_at'],
    'createdAt' => $row['created_at'],
  ];
}

$input = vgb_json_input();
$action = $input['action'] ?? ($_GET['action'] ?? 'list');
$user = vgb_auth_user();
$pdo = vgb_db();
$userId = (int)$user['id'];

if ($action === 'list') {
  $stmt = $pdo->prepare('SELECT * FROM decks WHERE user_id = ? ORDER BY is_default DESC, updated_at DESC');
  $stmt->execute([$userId]);
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
  vgb_ok(['decks' => array_map('vgb_public_deck', $rows)]);
}

if ($action === 'get') {
  $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
  if ($id <= 0) {
    // deck par défaut ou le plus récent
    $stmt = $pdo->prepare('SELECT * FROM decks WHERE user_id = ? ORDER BY is_default DESC, updated_at DESC LIMIT 1');
    $stmt->execute([$userId]);
  } else {
    $stmt = $pdo->prepare('SELECT * FROM decks WHERE id = ? AND user_id = ?');
    $stmt->execute([$id, $userId]);
  }
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$row) vgb_error('Aucun deck', 404);
  vgb_ok(['deck' => vgb_public_deck($row)]);
}

if ($action === 'save') {
  $name = trim((string)($input['name'] ?? 'Mon deck'));
  if ($name === '') $name = 'Mon deck';
  if (strlen($name) > 40) vgb_error('Nom trop long (max 40)');
  $faction = trim((string)($input['faction'] ?? ''));
  $allowed = ['Nintendo', 'PlayStation', 'SEGA', 'Xbox'];
  if (!in_array($faction, $allowed, true)) {
    vgb_error('Faction invalide');
  }
  $slots = vgb_validate_deck_slots($input['slots'] ?? []);
  $isDefault = !empty($input['isDefault']) ? 1 : 0;
  $id = (int)($input['id'] ?? 0);
  $json = json_encode($slots, JSON_UNESCAPED_UNICODE);

  if ($isDefault) {
    $pdo->prepare('UPDATE decks SET is_default = 0 WHERE user_id = ?')->execute([$userId]);
  }

  if ($id > 0) {
    $stmt = $pdo->prepare('SELECT id FROM decks WHERE id = ? AND user_id = ?');
    $stmt->execute([$id, $userId]);
    if (!$stmt->fetch()) vgb_error('Deck introuvable', 404);
    $pdo->prepare(
      'UPDATE decks SET name = ?, faction = ?, slots_json = ?, is_default = ?, updated_at = datetime(\'now\') WHERE id = ? AND user_id = ?'
    )->execute([$name, $faction, $json, $isDefault, $id, $userId]);
  } else {
    $stmtCount = $pdo->prepare('SELECT COUNT(*) FROM decks WHERE user_id = ?');
    $stmtCount->execute([$userId]);
    $count = (int)$stmtCount->fetchColumn();
    if ($count >= 5) vgb_error('Maximum 5 decks par compte');

    if ($count === 0) $isDefault = 1;

    $pdo->prepare(
      'INSERT INTO decks (user_id, name, faction, slots_json, is_default) VALUES (?, ?, ?, ?, ?)'
    )->execute([$userId, $name, $faction, $json, $isDefault]);
    $id = (int)$pdo->lastInsertId();
  }

  $stmt = $pdo->prepare('SELECT * FROM decks WHERE id = ?');
  $stmt->execute([$id]);
  vgb_ok(['deck' => vgb_public_deck($stmt->fetch(PDO::FETCH_ASSOC))]);
}

if ($action === 'setDefault') {
  $id = (int)($input['id'] ?? 0);
  if ($id <= 0) vgb_error('id requis');
  $stmt = $pdo->prepare('SELECT id FROM decks WHERE id = ? AND user_id = ?');
  $stmt->execute([$id, $userId]);
  if (!$stmt->fetch()) vgb_error('Deck introuvable', 404);
  $pdo->prepare('UPDATE decks SET is_default = 0 WHERE user_id = ?')->execute([$userId]);
  $pdo->prepare('UPDATE decks SET is_default = 1, updated_at = datetime(\'now\') WHERE id = ?')->execute([$id]);
  vgb_ok();
}

if ($action === 'delete') {
  $id = (int)($input['id'] ?? 0);
  if ($id <= 0) vgb_error('id requis');
  $stmt = $pdo->prepare('DELETE FROM decks WHERE id = ? AND user_id = ?');
  $stmt->execute([$id, $userId]);
  if ($stmt->rowCount() === 0) vgb_error('Deck introuvable', 404);
  vgb_ok();
}

vgb_error('Action inconnue. Utilisez list, get, save, delete ou setDefault.');
